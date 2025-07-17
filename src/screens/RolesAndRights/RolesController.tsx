import { useEffect, useState } from "react";
import { AddRoles, DeletePopup, EditRoles } from "../../components";
import { ValidateName } from "../../helpers/Validators";
import { AddRolesA, DeleteRoles, EditRolesA, RolesList } from "./RolesApis";
import RolesComponent from "./RolesComponent";

function RolesController() {
  const initialValue = {
    role_name: "",
    role_code: "",
    access_type: "",
    permission_type: "",
  };
  const [rolesData, setRolesData] = useState(initialValue);
  const [errors, setErrors] = useState(initialValue);
  const [rolesListData, setRolesListData] = useState<any>([]);
  const [selectedPage, setSelectedPage] = useState(1);
  const [size, setSize] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [openRolesForm, setOpenRolesForm] = useState(false);
  const [openEditRolesPop, setOpenEditRolesPop] = useState(false);
  const [editItem, setEditItem] = useState<any>("");
  const [openDeleteRolesPop, setOpenDeleteRolesPop] = useState(false);
  const [deleteItem, setDeleteItem] = useState<any>("");
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    fetchData();
  }, [size, selectedPage, searchInput]);

  const fetchData = async () => {
    const rolesDataResponse: any = await RolesList(
      size,
      selectedPage,
      searchInput,
      setIsLoading
    );
    setRolesListData(rolesDataResponse?.data);
  };
  const AddRolesApi = async () => {
    const response = await AddRolesA(rolesData, setIsLoading);
    if (response?.status === 201) {
      fetchData();
      toggleRolesPopup();
    }
  };

  const EditRolesApi = async () => {
    const response = await EditRolesA(editItem, setIsLoading);
    if (response?.status === 200) {
      fetchData();
      toggleEditUserPopup();
    }
  };

  const DeleteRolesApi = async () => {
    const response = await DeleteRoles(deleteItem, setIsLoading);
    if (response?.status === 200) {
      fetchData();
      toggleDeletePopup();
    }
  };

  const AddRolesValidator = () => {
    let newErrors: any = {};
    let isValid: boolean = true;
    const statusRoleName = ValidateName(rolesData.role_name);
    const statusRoleCode = ValidateName(rolesData.role_code);
    const statusAcType = ValidateName(rolesData.access_type);
    const statusPermissionType = ValidateName(rolesData.permission_type);

    if (statusRoleName) {
      newErrors.role_name = statusRoleName === 1 ? "Role Name is Required" : "";
      isValid = false;
    }

    if (statusRoleCode) {
      newErrors.role_code = statusRoleCode === 1 ? "Role Code is Required" : "";
      isValid = false;
    }

    if (statusAcType) {
      newErrors.access_type =
        statusAcType === 1 ? "Access Type is Required" : "";
      isValid = false;
    }

    if (statusPermissionType) {
      newErrors.permission_type =
        statusPermissionType === 1 ? "Permission Type is Required" : "";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const toggleRolesPopup = () => {
    setOpenRolesForm(!openRolesForm);
    setRolesData(initialValue);
  };

  const RolesFormSubmitHandler = () => {
    if (AddRolesValidator()) {
      AddRolesApi();
    }
  };

  const toggleEditUserPopup = () => {
    setOpenEditRolesPop(!openEditRolesPop);
  };

  const onEditHandler = (value: any) => {
    setEditItem(value);
    toggleEditUserPopup();
  };

  const RolesEditFormSubmitHandler = () => {
    EditRolesApi();
  };

  const toggleDeletePopup = () => {
    setOpenDeleteRolesPop(!openDeleteRolesPop);
  };

  const onDeleteHandler = (value: any) => {
    setDeleteItem(value);
    toggleDeletePopup();
  };

  const DeleteSubmitHandler = () => {
    DeleteRolesApi();
  };

  const handleChangeSearch = (e: any) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  return (
    <div>
      <RolesComponent
        userListData={rolesListData}
        isLoading={isLoading}
        onEditHandler={onEditHandler}
        onDeleteHandler={onDeleteHandler}
        toggleUserPopup={toggleRolesPopup}
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
        size={size}
        setSize={setSize}
        searchInput={searchInput}
        handleChangeSearch={handleChangeSearch}
      />
      {openRolesForm ? (
        <AddRoles
          userData={rolesData}
          setUserData={setRolesData}
          errors={errors}
          UserFormSubmitHandler={RolesFormSubmitHandler}
          toggleUserPopup={toggleRolesPopup}
          isLoading={isLoading}
        />
      ) : null}
      {openEditRolesPop ? (
        <EditRoles
          editItem={editItem}
          setEditItem={setEditItem}
          errors={errors}
          UserFormSubmitHandler={RolesEditFormSubmitHandler}
          toggleUserPopup={toggleEditUserPopup}
          isLoading={isLoading}
        />
      ) : null}
      {openDeleteRolesPop ? (
        <DeletePopup
          isLoading={isLoading}
          category={"Role"}
          name={deleteItem?.role_name}
          DeleteSubmitHandler={DeleteSubmitHandler}
          CancelDeleteSubmitHandler={toggleDeletePopup}
        />
      ) : null}
    </div>
  );
}

export default RolesController;
