import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeletePopup } from "../../components";
import {
  BlockClient,
  ClientBlockList,
  ClientList,
  DeleteClient,
  UnblockClient,
  updateClientStatus,
} from "./ClientApis";
import ClientComponent from "./ClientComponent";
import { ClientBlock } from "../../components";
import ClientBlockHistory from "../../components/Screen/ClientComponent/ClientBlockHistory";

function ClientController() {
  const blockClientInitialValues = {
    client_id: "",
    reason: "",
    time_period: "",
  };
  const navigation = useNavigate();
  const [clientListData, setClientListData] = useState<any>([]);
  const [selectedPage, setSelectedPage] = useState(1);
  const [size, setSize] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [openDeleteClientPop, setOpenDeleteClientPop] = useState(false);
  const [deleteItem, setDeleteItem] = useState<any>("");
  const [searchInput, setSearchInput] = useState("");
  const [openBlockForm, setOpenBlockForm] = useState(false);
  const [blockClientData, setBlockClientData] = useState(
    blockClientInitialValues
  );
  const [openHistoryModal, setOpenHistoryModal] = useState(false);
  const [historyData, setHistoryData] = useState<any[]>([]);

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
    console.log(rolesDataResponse?.data);

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

  const onBlockHandler = (client: any) => {
    console.log("Block handler called", client);
    setOpenBlockForm(!openBlockForm);
    setBlockClientData({
      client_id: client?.client_id,
      reason: "",
      time_period: "",
    });
  };

  const toggleUserPopup = () => {
    setOpenBlockForm(!openBlockForm);
  };

  const handleChangeSearch = (e: any) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const UserBlockFormSubmitHandler = () => {
    BlockApi();
    // now call your API here with `payload`
  };

  const onUnblockHandler = (client: any) => {
    console.log("Unblock handler called for:", client?.client_id);
    // call Unblock API here (similar to BlockApi)
    UnblockApi(client);
  };

  const UnblockApi = async (client: any) => {
    // const UnblockItem = {
    //   client_id: client?.client_id,
    // };

    // console.log("Final payload to send:", UnblockItem);
    const response = await UnblockClient(client?.client_id, setIsLoading);
    if (response?.status === 200) {
      fetchData();
      // toggleEditUserPopup();
    }
  };

  const BlockApi = async () => {
    const blockItem = {
      reason: blockClientData.reason,
      time_period: blockClientData.time_period,
      client_id: blockClientData?.client_id,
    };

    console.log("Final payload to send:", blockItem);
    const response = await BlockClient(blockItem, setIsLoading);
    if (response?.status === 200) {
      fetchData();
      // toggleEditUserPopup();
    }
  };
  const onHistoryHandler = (client: any) => {
    console.log("View block history of:", client);
    BlockHistoryApi(client);
    // you can open modal here or fetch history API
  };

  const BlockHistoryApi = async (client: any) => {
    const response = await ClientBlockList(client?.client_id, setIsLoading);
    console.log(response);

    if (response?.status === 200) {
      setHistoryData(response?.data || []); // assuming API returns data.data[]
      setOpenHistoryModal(true);
    }
  };

  return (
    <div>
      <ClientComponent
        userListData={clientListData}
        isLoading={isLoading}
        onDeleteHandler={onDeleteHandler}
        onBlockHandler={onBlockHandler}
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
        size={size}
        setSize={setSize}
        searchInput={searchInput}
        handleChangeSearch={handleChangeSearch}
        navigation={navigation}
        handleSwitchChange={handleSwitchChange}
        onUnblockHandler={onUnblockHandler}
        onHistoryHandler={onHistoryHandler}
      />

      {openBlockForm ? (
        <ClientBlock
          blockClientData={blockClientData}
          setBlockClientData={setBlockClientData}
          UserBlockFormSubmitHandler={UserBlockFormSubmitHandler}
          toggleUserPopup={toggleUserPopup}
        />
      ) : null}

      {openHistoryModal && (
        <ClientBlockHistory
          show={openHistoryModal}
          onClose={() => setOpenHistoryModal(false)}
          historyData={historyData}
        />
      )}

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
