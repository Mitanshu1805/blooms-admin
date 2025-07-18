import { useEffect, useState } from "react";
import PermissionComponent from "./PermissionsComponent";
import {
  PermissionList,
  PermissionModuleAdd,
  PermissionModuleDelete,
  PermissionDelete,
  PermissionAdd,
} from "./PermissionsApis";
import AddPermissionModal from "./AddModule";
import AddPermissions from "./AddPermissions";

const PermissionsController = () => {
  const [permissionListData, setPermissionListData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [selectedModuleName, setSelectedModuleName] = useState<string | null>(
    null
  );

  const fetchPermissionList = async () => {
    const res = await PermissionList(setIsLoading);
    if (res?.data) {
      setPermissionListData(res.data);
    }
  };

  const handleAddModule = async (moduleName: string) => {
    await PermissionModuleAdd(moduleName, setIsLoading);
    fetchPermissionList();
  };

  const handleAddPermissions = async (
    moduleId: string,
    permissionTypes: string[]
  ): Promise<void> => {
    for (const permission of permissionTypes) {
      await PermissionAdd(moduleId, permission, setIsLoading);
    }
    fetchPermissionList();
  };

  const handleDeleteModule = async (module_id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this module?"
    );
    if (!confirmed) return;

    await PermissionModuleDelete(module_id, setIsLoading);
    fetchPermissionList();
  };

  const handleDeletePermission = async (permission_id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this permission?"
    );
    if (!confirmed) return;
    await PermissionDelete(permission_id, setIsLoading);
    fetchPermissionList();
  };

  useEffect(() => {
    fetchPermissionList();
  }, []);

  return (
    <>
      <PermissionComponent
        handleDeleteModule={handleDeleteModule}
        permissionListData={permissionListData}
        isLoading={isLoading}
        onEditHandler={() => {}}
        onDeleteHandler={handleDeleteModule}
        toggleUserPopup={() => setIsPopupOpen(true)}
        handleDeletePermission={handleDeletePermission}
      />
      {isPopupOpen && (
        <AddPermissionModal
          onClose={() => setIsPopupOpen(false)}
          onSubmit={handleAddModule}
        />
      )}
      {showPermissionModal && selectedModuleId && selectedModuleName && (
        <AddPermissions
          moduleId={selectedModuleId}
          moduleName={selectedModuleName}
          onClose={() => setShowPermissionModal(false)}
          onSubmit={(selectedPermissions) =>
            handleAddPermissions(selectedModuleId, selectedPermissions)
          }
        />
      )}
    </>
  );
};

export default PermissionsController;
