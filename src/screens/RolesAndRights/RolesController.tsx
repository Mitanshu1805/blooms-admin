import { useEffect, useState } from "react";
import { AddRoles, DeletePopup, EditRoles } from "../../components";
import { ValidateName } from "../../helpers/Validators";
import {
  AddRolesA,
  DeleteRoles,
  EditRolesA,
  RolesList,
  ModulesList,
} from "./RolesApis";
import RolesComponent from "./RolesComponent";
import RolesPermissionTable from "../../components/Screen/RolesComponent/RolesPermissionTable";

function RolesController() {
  const initialValue = {
    role_name: "",
    // role_code: "",
    // access_type: "",
    // permission_type: "",
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

  const [selectedPermissions, setSelectedPermissions] = useState<any>({});

  const handleCheckboxChange = (
    moduleName: string,
    permission: string,
    checked: boolean
  ) => {
    setSelectedPermissions((prev: any) => {
      const currentPerms = prev[moduleName] || [];
      let updatedPerms = [...currentPerms];

      if (checked) {
        // Add the current permission
        if (!updatedPerms.includes(permission)) {
          updatedPerms.push(permission);
        }

        // If selecting 'update', 'create', or 'delete', ensure 'read' is selected
        if (
          (permission === "update" ||
            permission === "delete" ||
            permission === "create") &&
          !updatedPerms.includes("read")
        ) {
          updatedPerms.push("read");
        }
      } else {
        // Remove the current permission
        updatedPerms = updatedPerms.filter((p) => p !== permission);

        // If unchecking 'read', also remove 'update', 'create', and 'delete'
        if (permission === "read") {
          updatedPerms = updatedPerms.filter(
            (p) => p !== "update" && p !== "create" && p !== "delete"
          );
        }
      }

      return {
        ...prev,
        [moduleName]: updatedPerms,
      };
    });
  };

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

  const parsePermissions = () => {
    const parsedPermissions = Object.keys(selectedPermissions).map((item) => ({
      module_id: item,
      access: selectedPermissions[item],
    }));
    console.log("parsedPermissions -> ", parsedPermissions);
    return parsedPermissions;
  };

  const AddRolesApi = async () => {
    const response = await AddRolesA(
      rolesData,
      parsePermissions(),
      setIsLoading
    );
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

    // const statusPermissionType = ValidateName(rolesData.permission_type);

    if (statusRoleName) {
      newErrors.role_name = statusRoleName === 1 ? "Role Name is Required" : "";
      isValid = false;
    }
    // if (statusPermissionType) {
    //   newErrors.permission_type =
    //     statusPermissionType === 1 ? "Permission Type is Required" : "";
    //   isValid = false;
    // }

    setErrors(newErrors);
    return isValid;
  };

  const toggleRolesPopup = () => {
    setOpenRolesForm(!openRolesForm);
    setRolesData(initialValue);
    setSelectedPermissions({});
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
        onClose={toggleRolesPopup}
      />

      {openRolesForm ? (
        <AddRoles
          userData={rolesData}
          setUserData={setRolesData}
          errors={errors}
          UserFormSubmitHandler={RolesFormSubmitHandler}
          toggleUserPopup={toggleRolesPopup}
          selectedPermissions={selectedPermissions}
          setSelectedPermissions={setSelectedPermissions}
          handleCheckboxChange={handleCheckboxChange}
          isLoading={isLoading}
        />
      ) : null}
      {/* {openEditRolesPop ? (
        <EditRoles
          editItem={editItem}
          setEditItem={setEditItem}
          errors={errors}
          UserFormSubmitHandler={RolesEditFormSubmitHandler}
          toggleUserPopup={toggleEditUserPopup}
          isLoading={isLoading}
        />
      ) : null} */}
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
