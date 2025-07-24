export const RolesPermissionTableData = ({
  modulesListData,
  selectedPermissions,
  handleCheckboxChange,
  editItem,
}: any) => {
  const formatModuleName = (name: string) => {
    return name
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return modulesListData?.map((module: any, index: number) => {
    const modulePerm = selectedPermissions[module.module_name] || {
      module_id: module.module_id,
      actions: [],
    };
    console.log("modulePerm>>", modulePerm);

    console.log("modulesListData>>", module.module_id);
    // console.log("selectedPermissions>>", selectedPermissions);
    // console.log(
    //   "selectedPermissions[module.module_name]>>",
    //   selectedPermissions[module.module_name]
    // );
    // console.log(
    //   "selectedPermissions[module.module_name] FLAT>>",
    //   (selectedPermissions[module.module_name] || []).flat()
    // );

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
            checked={modulePerm.actions.includes("read")}
            onChange={(e) =>
              handleCheckboxChange(
                module.module_name,
                module.module_id,
                "read",
                e.target.checked
              )
            }
          />
        ),
      },
      {
        title: "Write",
        data: (
          <input
            type="checkbox"
            checked={modulePerm.actions.includes("create")}
            onChange={(e) =>
              handleCheckboxChange(
                module.module_name,
                module.module_id,
                "create",
                e.target.checked
              )
            }
          />
        ),
      },
      {
        title: "Update",
        data: (
          <input
            type="checkbox"
            checked={modulePerm.actions.includes("update")}
            onChange={(e) =>
              handleCheckboxChange(
                module.module_name,
                module.module_id,
                "update",
                e.target.checked
              )
            }
          />
        ),
      },
      {
        title: "Delete",
        data: (
          <input
            type="checkbox"
            checked={modulePerm.actions.includes("delete")}
            onChange={(e) =>
              handleCheckboxChange(
                module.module_name,
                module.module_id,
                "delete",
                e.target.checked
              )
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
              modulePerm.actions.includes(p)
            )}
            onChange={(e) =>
              ["read", "create", "update", "delete"].forEach((perm) =>
                handleCheckboxChange(
                  module.module_name,
                  module.module_id,
                  perm,
                  e.target.checked
                )
              )
            }
          />
        ),
      },
    ];
  });
};
