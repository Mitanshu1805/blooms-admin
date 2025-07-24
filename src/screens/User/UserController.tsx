import { useEffect, useState } from "react";
import {
  AddUser,
  DeletePopup,
  EditUser,
  EditOurselves,
} from "../../components";
import {
  ValidateEmail,
  ValidateMobile,
  ValidateName,
  ValidatePassword,
} from "../../helpers/Validators";
import {
  AddUserA,
  DeleteUser,
  EditUserA,
  UserList,
  updateUserStatus,
} from "./UserApis";
import UserComponent from "./UserComponent";
import { AlertType, alertService } from "../../utils/alert.service";

function UserController() {
  const initialValue = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    phone_number: "",
    employee_type: "",
    service_type: "",
    role_id: "",
    id_card: "",
  };
  const phone_number = sessionStorage.getItem("phone_number");
  const [userData, setUserData] = useState(initialValue);
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [joiningDate, setJoiningDate] = useState(new Date());
  const [errors, setErrors] = useState(initialValue);
  const [userListData, setUserListData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openUserForm, setOpenUserForm] = useState(false);
  const [openEditUserPop, setOpenEditUserPop] = useState(false);
  const [openEditOurselvesPop, setOpenEditOurselvesPop] = useState(false);
  const [editItem, setEditItem] = useState<any>("");
  const [openDeleteUserPop, setOpenDeleteUserPop] = useState(false);
  const [deleteItem, setDeleteItem] = useState<any>("");
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    fetchData();
  }, [selectedPage, limit, searchInput]);

  useEffect(() => {
    if (editItem) {
      setDateOfBirth(new Date(editItem?.dob));
      setJoiningDate(new Date(editItem?.joining_date));
    }
  }, [editItem]);

  const fetchData = async () => {
    const userDataResponse: any = await UserList(
      selectedPage,
      limit,
      setIsLoading,
      searchInput
    );
    setUserListData(userDataResponse?.data);
  };
  const AddUserApi = async () => {
    const response = await AddUserA(
      userData,
      dateOfBirth,
      joiningDate,
      setIsLoading
    );
    if (response?.status === 200) {
      fetchData();
      toggleUserPopup();
    }
  };

  const EditUserApi = async () => {
    const response = await EditUserA(
      editItem,
      dateOfBirth,
      joiningDate,
      setIsLoading
    );
    if (response?.status === 200) {
      fetchData();
      toggleEditUserPopup();
    }
  };

  const EditOurselvesApi = async () => {
    const response = await EditUserA(
      editItem,
      dateOfBirth,
      joiningDate,
      setIsLoading
    );
    if (response?.status === 200) {
      fetchData();
      toggleEditOurselvesPopup();
    }
  };

  const DeleteUserApi = async () => {
    const response = await DeleteUser(deleteItem, setIsLoading);
    if (response?.status === 200) {
      fetchData();
      toggleDeletePopup();
    }
  };

  const handleSwitchChange = async (value: any) => {
    const response = await updateUserStatus(value, setIsLoading);
    if (response?.status === 200) {
      fetchData();
    }
  };

  const AddUserValidator = () => {
    let newErrors: any = {};
    let isValid: boolean = true;
    const statusFirstName = ValidateName(userData.first_name);
    const statusLastName = ValidateName(userData.last_name);
    const statusOwnerEmail = ValidateEmail(userData.email);
    const statusPassword = ValidatePassword(userData.password);
    const statusConPassword = ValidatePassword(userData.confirm_password);
    const statusPhone = ValidateMobile(userData.phone_number);
    const statusEmployeeType = ValidateName(userData.employee_type);
    const statusServiceType = ValidateName(userData.service_type);
    const statusRole = ValidateName(userData.role_id);
    const statusIdCard = ValidateName(userData.id_card);

    if (statusFirstName) {
      newErrors.first_name =
        statusFirstName === 1 ? "First Name is Required" : "";
      isValid = false;
    }

    if (statusLastName) {
      newErrors.last_name = statusLastName === 1 ? "Last Name is Required" : "";
      isValid = false;
    }

    if (statusOwnerEmail) {
      newErrors.email =
        statusOwnerEmail === 1 ? "Email is Required" : "Email is Invalid";
      isValid = false;
    }

    if (statusPassword) {
      newErrors.password =
        statusPassword === 1
          ? "Password is Required"
          : "Please Enter Strong Password";
      isValid = false;
    }

    if (statusConPassword) {
      newErrors.confirm_password =
        statusConPassword === 1
          ? "Confirm Password is Required"
          : "Confirm Password is short";

      isValid = false;
    }

    if (userData.password !== userData.confirm_password) {
      newErrors.confirm_password = "Password is not same";
      isValid = false;
    }

    if (statusPhone) {
      newErrors.phone_number =
        statusPhone === 1
          ? "Phone Number is Required"
          : "Phone Number is Invalid";
      isValid = false;
    }

    if (statusEmployeeType) {
      newErrors.employee_type =
        statusEmployeeType === 1 ? "Employee Type is Required" : "";
      isValid = false;
    }

    if (statusServiceType) {
      newErrors.service_type =
        statusServiceType === 1 ? "Service Type is Required" : "";
      isValid = false;
    }

    if (statusRole) {
      newErrors.role = statusRole === 1 ? "User Role is Required" : "";
      isValid = false;
    }

    if (statusIdCard) {
      newErrors.id_card = statusIdCard === 1 ? "Id card is Required" : "";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const toggleUserPopup = () => {
    setOpenUserForm(!openUserForm);
    setUserData(initialValue);
    setDateOfBirth(new Date());
    setJoiningDate(new Date());
  };

  const UserFormSubmitHandler = () => {
    if (AddUserValidator()) {
      AddUserApi();
    }
  };

  const toggleEditUserPopup = () => {
    setOpenEditUserPop(!openEditUserPop);
  };
  const toggleEditOurselvesPopup = () => {
    setOpenEditOurselvesPop(!openEditOurselvesPop);
  };

  const onEditHandler = (value: any) => {
    if (phone_number === value.phone_number) {
      onEditOurselvesHandler(value);
    } else {
      setEditItem(value);
      toggleEditUserPopup();
    }
  };

  // const onEditHandler = (value: any) => {
  //   setEditItem(value);
  //   toggleEditUserPopup();
  // };

  const onEditOurselvesHandler = (value: any) => {
    setEditItem(value);
    toggleEditOurselvesPopup();
  };

  const UserEditFormSubmitHandler = () => {
    EditUserApi();
  };

  const OurselvesEditFormSubmitHandler = () => {
    EditOurselvesApi();
  };

  const toggleDeletePopup = () => {
    setOpenDeleteUserPop(!openDeleteUserPop);
  };

  const onDeleteHandler = (value: any) => {
    if (phone_number === value.phone_number) {
      alertService.alert({
        type: AlertType.Error,
        message: "You cannot delete your own user account.",
      });
    } else {
      setDeleteItem(value);
      toggleDeletePopup();
    }
  };

  const DeleteSubmitHandler = () => {
    DeleteUserApi();
  };

  const handleChangeSearch = (e: any) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  // console.log("editItem>>", editItem);

  return (
    <div>
      <UserComponent
        userListData={userListData}
        isLoading={isLoading}
        onEditHandler={onEditHandler}
        onEditOurselves={onEditOurselvesHandler}
        onDeleteHandler={onDeleteHandler}
        toggleUserPopup={toggleUserPopup}
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
        limit={limit}
        setLimit={setLimit}
        handleChangeSearch={handleChangeSearch}
        searchInput={searchInput}
        handleSwitchChange={handleSwitchChange}
      />
      {openUserForm ? (
        <AddUser
          userData={userData}
          setUserData={setUserData}
          errors={errors}
          UserFormSubmitHandler={UserFormSubmitHandler}
          toggleUserPopup={toggleUserPopup}
          dateOfBirth={dateOfBirth}
          setDateOfBirth={setDateOfBirth}
          joiningDate={joiningDate}
          setJoiningDate={setJoiningDate}
          isLoading={isLoading}
        />
      ) : null}
      {openEditUserPop ? (
        <EditUser
          editItem={editItem}
          setEditItem={setEditItem}
          errors={errors}
          UserEditFormSubmitHandler={UserEditFormSubmitHandler}
          toggleEditUserPopup={toggleEditUserPopup}
          dateOfBirth={dateOfBirth}
          setDateOfBirth={setDateOfBirth}
          joiningDate={joiningDate}
          setJoiningDate={setJoiningDate}
          isLoading={isLoading}
        />
      ) : null}
      {openEditOurselvesPop ? (
        <EditOurselves
          editItem={editItem}
          setEditItem={setEditItem}
          errors={errors}
          OurselvesEditFormSubmitHandler={OurselvesEditFormSubmitHandler}
          toggleEditOurselvesPopup={toggleEditOurselvesPopup}
          dateOfBirth={dateOfBirth}
          setDateOfBirth={setDateOfBirth}
          joiningDate={joiningDate}
          setJoiningDate={setJoiningDate}
          isLoading={isLoading}
        />
      ) : null}
      {openDeleteUserPop ? (
        <DeletePopup
          isLoading={isLoading}
          category={"User"}
          name={deleteItem?.first_name}
          DeleteSubmitHandler={DeleteSubmitHandler}
          CancelDeleteSubmitHandler={toggleDeletePopup}
        />
      ) : null}
    </div>
  );
}

export default UserController;
