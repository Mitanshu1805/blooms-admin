import { useEffect, useState } from "react";
import { AddNotification, DeletePopup } from "../../components";
import { ValidateName } from "../../helpers/Validators";
import {
  AddNotificationA,
  DeleteNotification,
  NotificationList,
} from "./Notification";
import NotificationComponent from "./NotificationComponent";

function NotificationController() {
  const initialValue = {
    title: "",
    context: "",
  };
  const [notificationData, setNotificationData] = useState(initialValue);
  const [errors, setErrors] = useState(initialValue);
  const [notificationListData, setNotificationListData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openNotificationForm, setOpenNotificationForm] = useState(false);
  const [openDeleteCrewPop, setOpenDeleteCrewPop] = useState(false);
  const [deleteItem, setDeleteItem] = useState<any>("");
  const [selectedPage, setSelectedPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    fetchData();
  }, [selectedPage, limit, searchInput]);

  const fetchData = async () => {
    const notificationResponse: any = await NotificationList(
      selectedPage,
      limit,
      searchInput,
      setIsLoading
    );
    setNotificationListData(notificationResponse?.data);
  };

  const AddNotificationApi = async () => {
    const response = await AddNotificationA(notificationData, setIsLoading);
    if (response?.status === 200) {
      fetchData();
      toggleNotificationPopup();
    }
  };

  const DeleteNotificationApi = async () => {
    const response = await DeleteNotification(deleteItem, setIsLoading);
    if (response?.status === 200) {
      fetchData();
    }
  };

  const AddNotificationValidator = () => {
    let newErrors: any = {};
    let isValid: boolean = true;
    const statusCrewName = ValidateName(notificationData.title);
    const statusPrefWork = ValidateName(notificationData.context);

    if (statusCrewName) {
      newErrors.title =
        statusCrewName === 1 ? "Notification Title is Required" : "";
      isValid = false;
    }

    if (statusPrefWork) {
      newErrors.context =
        statusPrefWork === 1 ? "Notification Context is Required" : "";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const toggleNotificationPopup = () => {
    setOpenNotificationForm(!openNotificationForm);
    setNotificationData(initialValue);
    setErrors(initialValue);
  };

  const NotificationSubmitHandler = () => {
    if (AddNotificationValidator()) {
      AddNotificationApi();
    }
  };

  const toggleDeletePopup = () => {
    setOpenDeleteCrewPop(!openDeleteCrewPop);
  };

  const onDeleteHandler = (value: any) => {
    setDeleteItem(value);
    toggleDeletePopup();
  };

  const DeleteSubmitHandler = () => {
    DeleteNotificationApi();
    toggleDeletePopup();
  };

  const handleChangeSearch = (e: any) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  return (
    <div>
      <NotificationComponent
        notificationListData={notificationListData}
        isLoading={isLoading}
        onDeleteHandler={onDeleteHandler}
        toggleCrewPopup={toggleNotificationPopup}
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
        size={limit}
        setSize={setLimit}
        handleChangeSearch={handleChangeSearch}
        searchInput={searchInput}
      />
      {openNotificationForm ? (
        <AddNotification
          notificationData={notificationData}
          setNotificationData={setNotificationData}
          errors={errors}
          NotificationSubmitHandler={NotificationSubmitHandler}
          toggleNotificationPopup={toggleNotificationPopup}
          isLoading={isLoading}
        />
      ) : null}
      {openDeleteCrewPop ? (
        <DeletePopup
          isLoading={isLoading}
          category={"Notification"}
          name={deleteItem?.title}
          DeleteSubmitHandler={DeleteSubmitHandler}
          CancelDeleteSubmitHandler={toggleDeletePopup}
        />
      ) : null}
    </div>
  );
}

export default NotificationController;
