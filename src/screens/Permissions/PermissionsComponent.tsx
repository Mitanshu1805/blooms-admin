import { Button, NumberDropdown, TableComp } from "../../components";
import { PermissionsTableData } from "./PermissionsTableData";
import { PermissionModuleDelete, PermissionAdd } from "./PermissionsApis";
import { useState } from "react";
import AddPermissions from "./AddPermissions";

interface PermissionProps {
  permissionListData: any;
  isLoading: boolean;
  onEditHandler: (value: any) => void;
  onDeleteHandler: (value: any) => void;
  toggleUserPopup: () => void;
  handleDeleteModule: (value: any) => void;
  handleDeletePermission: (value: any) => void;
}

function PermissionComponent({
  permissionListData,
  handleDeleteModule,
  onEditHandler,
  onDeleteHandler,
  toggleUserPopup,
  handleDeletePermission,
}: PermissionProps) {
  const HeaderData = ["No", "Module Name", "Permissions"];
  const [isLoading, setIsLoading] = useState(false);

  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [selectedModuleName, setSelectedModuleName] = useState<string | null>(
    null
  );

  const onAddPermission = (module_id: string, moduleName: string) => {
    setSelectedModuleId(module_id);
    setSelectedModuleName(moduleName);
    setShowPermissionModal(true);
  };

  const permListData = PermissionsTableData(
    permissionListData,
    onAddPermission,
    handleDeleteModule,
    handleDeletePermission
  );

  return (
    <div className="details-list-card card">
      <div className="details-list-top">
        <div className="details-list-top-left">
          <span className="details-list-top-left-title">
            Modules And Permissions
          </span>
        </div>
        <div className="details-list-top-right">
          <Button
            className="details-list-btn"
            name={"Add Module"}
            onClick={toggleUserPopup}
          />
        </div>
      </div>
      <div className="details-list-table">
        <TableComp
          isLoading={isLoading}
          listHeaderData={HeaderData}
          listData={permListData}
          onEditHandler={(value: any) => onEditHandler(value)}
          onDeleteHandler={(value: any) => onDeleteHandler(value)}
        />
      </div>
    </div>
  );
}

export default PermissionComponent;
