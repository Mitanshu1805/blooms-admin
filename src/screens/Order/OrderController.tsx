import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeletePopup } from "../../components";
import { DeleteOrder, OrderList } from "./OrderApis";
import OrderComponent from "./OrderComponent";

function OrderController() {
  const navigation = useNavigate();
  const [orderListData, setOrderListData] = useState<any>([]);
  const [selectedPage, setSelectedPage] = useState(1);
  const [size, setSize] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [openDeleteOrderPop, setOpenDeleteOrderPop] = useState(false);
  const [deleteItem, setDeleteItem] = useState<any>("");
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    fetchData();
  }, [size, selectedPage, searchInput]);

  const fetchData = async () => {
    const rolesDataResponse: any = await OrderList(
      size,
      selectedPage,
      searchInput,
      setIsLoading
    );
    setOrderListData(rolesDataResponse?.data);
  };

  const DeleteOrderApi = async () => {
    const response = await DeleteOrder(deleteItem, setIsLoading);
    if (response?.status === 200) {
      fetchData();
      toggleDeletePopup();
    }
  };

  const toggleDeletePopup = () => {
    setOpenDeleteOrderPop(!openDeleteOrderPop);
  };

  const onDeleteHandler = (value: any) => {
    setDeleteItem(value);
    toggleDeletePopup();
  };

  const DeleteSubmitHandler = () => {
    DeleteOrderApi();
  };

  const handleChangeSearch = (e: any) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  return (
    <div>
      <OrderComponent
        userListData={orderListData}
        isLoading={isLoading}
        onDeleteHandler={onDeleteHandler}
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
        size={size}
        setSize={setSize}
        searchInput={searchInput}
        handleChangeSearch={handleChangeSearch}
        navigation={navigation}
      />
      {openDeleteOrderPop ? (
        <DeletePopup
          isLoading={isLoading}
          category={"Order"}
          name={deleteItem?.oid}
          DeleteSubmitHandler={DeleteSubmitHandler}
          CancelDeleteSubmitHandler={toggleDeletePopup}
        />
      ) : null}
    </div>
  );
}

export default OrderController;
