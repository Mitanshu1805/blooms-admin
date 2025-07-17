import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeletePopup } from "../../components";
import { ClientList, DeleteClient, updateClientStatus } from "./ClientApis";
import ClientComponent from "./ClientComponent";

function ClientController() {
  const navigation = useNavigate();
  const [clientListData, setClientListData] = useState<any>([]);
  const [selectedPage, setSelectedPage] = useState(1);
  const [size, setSize] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [openDeleteClientPop, setOpenDeleteClientPop] = useState(false);
  const [deleteItem, setDeleteItem] = useState<any>("");
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    fetchData();
  }, [size, selectedPage, searchInput]);

  const fetchData = async () => {
    const rolesDataResponse: any = await ClientList(
      size,
      selectedPage,
      searchInput,
      setIsLoading
    );
    setClientListData(rolesDataResponse?.data);
  };
  const DeleteOrderApi = async () => {
    const response = await DeleteClient(deleteItem, setIsLoading);
    if (response?.status === 200) {
      fetchData();
      toggleDeletePopup();
    }
  };

  const handleSwitchChange = async (value: any) => {
    const response = await updateClientStatus(value, setIsLoading);
    if (response?.status === 200) {
      fetchData();
    }
  };

  const toggleDeletePopup = () => {
    setOpenDeleteClientPop(!openDeleteClientPop);
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
      <ClientComponent
        userListData={clientListData}
        isLoading={isLoading}
        onDeleteHandler={onDeleteHandler}
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
        size={size}
        setSize={setSize}
        searchInput={searchInput}
        handleChangeSearch={handleChangeSearch}
        navigation={navigation}
        handleSwitchChange={handleSwitchChange}
      />
      {openDeleteClientPop ? (
        <DeletePopup
          isLoading={isLoading}
          category={"Client"}
          name={deleteItem?.phone_number}
          DeleteSubmitHandler={DeleteSubmitHandler}
          CancelDeleteSubmitHandler={toggleDeletePopup}
        />
      ) : null}
    </div>
  );
}

export default ClientController;
