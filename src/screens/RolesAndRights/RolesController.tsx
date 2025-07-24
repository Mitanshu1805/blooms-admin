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
  const [modulesListData, setModulesListData] = useState<any[]>([]);

  const [selectedPermissions, setSelectedPermissions] = useState<any>({});

  const handleCheckboxChange = (
    moduleName: string,
    moduleId: string,
    permission: string,
    checked: boolean
  ) => {
    setSelectedPermissions((prev: any) => {
      const current = prev[moduleName] || {
        module_id: moduleId,
        actions: [],
      };
      let updatedActions = [...current.actions];

      if (checked) {
        if (!updatedActions.includes(permission)) {
          updatedActions.push(permission);
        }
        if (
          (permission === "update" ||
            permission === "delete" ||
            permission === "create") &&
          !updatedActions.includes("read")
        ) {
          updatedActions.push("read");
        }
      } else {
        updatedActions = updatedActions.filter((p) => p !== permission);
        if (permission === "read") {
          updatedActions = updatedActions.filter(
            (p) => p !== "update" && p !== "create" && p !== "delete"
          );
        }
      }

      return {
        ...prev,
        [moduleName]: {
          module_id: moduleId,
          actions: updatedActions,
        },
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

  useEffect(() => {
    const fetchModules = async () => {
      const res = await ModulesList(
        size,
        selectedPage,
        searchInput,
        setIsLoading
      ); // this hits your API
      console.log("response", res);

      if (res) {
        setModulesListData(res.data.data);
      }
    };
    fetchModules();
  }, []);

  const getModuleIdByName = (name: string) => {
    const found = modulesListData.find((mod) => mod.module_name === name);
    return found?.module_id || null;
  };

  const parsePermissions = () => {
    const parsedPermissions = Object.keys(selectedPermissions).map(
      (moduleName) => ({
        module_id: selectedPermissions[moduleName].module_id,
        access: selectedPermissions[moduleName].actions,
      })
    );

    console.log("parsedPermissions -> ", parsedPermissions);
    return parsedPermissions;
  };

  const AddRolesApi = async () => {
    console.log("rolesData>>", rolesData);

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

  // const EditRolesApi = async () => {
  //   console.log("editItem for EDIT>>", editItem);
  //   const response = await EditRolesA(editItem, setIsLoading);
  //   if (response?.status === 200) {
  //     fetchData();
  //     toggleEditUserPopup();
  //   }
  // };
  const EditRolesApi = async () => {
    console.log("editItem for EDIT>>", editItem);

    const payload = {
      role_id: editItem.role_id,
      // role_name: rolesData.role_name,
      permissions: parsePermissions(),
    };

    const response = await EditRolesA(payload, setIsLoading);

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
    setEditItem(initialValue);
  };

  const RolesFormSubmitHandler = () => {
    if (AddRolesValidator()) {
      AddRolesApi();
    }
  };

  const toggleEditUserPopup = () => {
    setOpenEditRolesPop(!openEditRolesPop);
    setRolesData(initialValue);
    // setSelectedPermissions({});
  };

  const onEditHandler = (value: any) => {
    setEditItem(value);
    toggleEditUserPopup();
  };

  // useEffect(() => {
  //   if (editItem) {
  //     console.log("editItem>>", editItem.editItem);
  //     const initialPermissions: any = {};
  //     editItem.permissions?.forEach((perm: any) => {
  //       if (!initialPermissions[perm.module_name]) {
  //         initialPermissions[perm.module_name] = {
  //           module_id: perm.module_id,
  //           actions: [],
  //         };
  //       }
  //       initialPermissions[perm.module_name].actions.push(perm.actions);
  //     });
  //     setSelectedPermissions(initialPermissions);

  //     setRolesData({ role_name: editItem.editItem });
  //   }
  // }, [editItem]);
  useEffect(() => {
    if (editItem) {
      const initialPermissions: any = {};

      editItem.permissions?.forEach((perm: any) => {
        const moduleName = perm.module_name;
        const moduleId = getModuleIdByName(moduleName);
        const action = perm.actions;

        if (!initialPermissions[moduleName]) {
          initialPermissions[moduleName] = {
            module_id: moduleId,
            actions: [],
          };
        }

        if (!initialPermissions[moduleName].actions.includes(action)) {
          initialPermissions[moduleName].actions.push(...action);
        }
      });

      setSelectedPermissions(initialPermissions);
      setRolesData({ role_name: editItem.editItem });
    }
  }, [editItem, modulesListData]);

  console.log("selectedPermissions in Cont>>", selectedPermissions);

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

  console.log("selectedPermissions in Controller", selectedPermissions);
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
      {/* {openRolesForm ? (
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
      {openEditRolesPop ? (
        <EditRoles
          editItem={editItem}
          setEditItem={setEditItem}
          errors={errors}
          UserFormSubmitHandler={RolesEditFormSubmitHandler}
          toggleUserPopup={toggleEditUserPopup}
          isLoading={isLoading}
          selectedPermissions={selectedPermissions}
          handleCheckboxChange={handleCheckboxChange}
          setSelectedPermissions={setSelectedPermissions}
        />
      ) : null} */}
      {(openRolesForm || openEditRolesPop) && (
        <AddRoles
          mode={openRolesForm ? "add" : "edit"}
          rolesData={rolesData}
          setRolesData={setRolesData}
          errors={errors}
          handleSubmit={
            openRolesForm ? RolesFormSubmitHandler : RolesEditFormSubmitHandler
          }
          togglePopup={openRolesForm ? toggleRolesPopup : toggleEditUserPopup}
          selectedPermissions={selectedPermissions}
          setSelectedPermissions={setSelectedPermissions}
          handleCheckboxChange={handleCheckboxChange}
          isLoading={isLoading}
          editItem={editItem}
          setEditItem={setEditItem}
          toggleUserPopup={
            openRolesForm ? toggleRolesPopup : toggleEditUserPopup
          }
        />
      )}
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
