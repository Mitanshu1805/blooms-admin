export const RolesPermissionTableData = ({
  modulesListData,
  selectedPermissions,
  handleCheckboxChange,
}: any) => {
  const formatModuleName = (name: string) => {
    return name
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return modulesListData?.map((module: any, index: number) => {
    return [
      {
        title: "No.",
        data: index + 1,
      },
      {
        title: "Module",
        data: formatModuleName(module.module_name),
      },
      {
        title: "Read",
        data: (
          <input
            type="checkbox"
            checked={selectedPermissions[module.module_id]?.includes?.("read")}
            onChange={(e) =>
              handleCheckboxChange(module.module_id, "read", e.target.checked)
            }
          />
        ),
      },
      {
        title: "Write",
        data: (
          <input
            type="checkbox"
            checked={
              selectedPermissions[module.module_id]?.includes?.("create") ||
              false
            }
            onChange={(e) =>
              handleCheckboxChange(module.module_id, "create", e.target.checked)
            }
          />
        ),
      },
      {
        title: "Update",
        data: (
          <input
            type="checkbox"
            checked={selectedPermissions[module.module_id]?.includes?.(
              "update"
            )}
            onChange={(e) =>
              handleCheckboxChange(module.module_id, "update", e.target.checked)
            }
          />
        ),
      },
      {
        title: "Delete",
        data: (
          <input
            type="checkbox"
            checked={selectedPermissions[module.module_id]?.includes?.(
              "delete"
            )}
            onChange={(e) =>
              handleCheckboxChange(module.module_id, "delete", e.target.checked)
            }
          />
        ),
      },
      {
        title: "Select All",
        data: (
          <input
            type="checkbox"
            checked={["read", "create", "update", "delete"].every((p) =>
              selectedPermissions[module.module_id]?.includes?.(p)
            )}
            onChange={(e) =>
              ["read", "create", "update", "delete"].forEach((perm) =>
                handleCheckboxChange(module.module_id, perm, e.target.checked)
              )
            }
          />
        ),
      },
    ];
  });
};
