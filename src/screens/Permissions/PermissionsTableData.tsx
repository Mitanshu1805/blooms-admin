// import { FaRegEdit, FaTrash, FaPlus, FaMinus } from "react-icons/fa";

export const PermissionsTableData = (
  permissionListData: any,
  onAddPermission: (moduleId: string, module_name: string) => void,
  handleDeleteModule: (moduleId: string) => void,
  handleDeletePermission: (permissionId: string) => void
) => {
  return permissionListData?.data?.map((item: any, index: number) => {
    const permissionTypes = Array.isArray(item?.permissions)
      ? item.permissions.map((p: any) => p.permission_type).join(", ")
      : "-";

    console.log("item?????", item);

    return [
      {
        title: "No.",
        data: index + 1,
      },
      {
        title: "Module Name",
        data: (
          <div className="d-flex justify-content-between align-items-center">
            <span>{item?.module_name}</span>
            <div onClick={() => handleDeleteModule(item?.module_id)}>
              {/* <FaTrash
                role="button"
                className="text-danger"
                title="Delete Module"
              /> */}
            </div>
          </div>
        ),
      },
      {
        title: "Permissions",
        data: (
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {item?.permissions?.length > 0 ? (
              item.permissions.map((p: any) => (
                <div
                  key={p._id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>{p.permission_type}</span>
                  {/* <FaMinus
                    className="text-danger"
                    style={{ cursor: "pointer" }}
                    title="Delete Permission"
                    onClick={() => handleDeletePermission(p.permission_id)}
                  /> */}
                </div>
              ))
            ) : (
              <span>-</span>
            )}

            <div style={{ marginTop: "8px", textAlign: "right" }}>
              {/* <FaPlus
                // className="text-success"
                // style={{ cursor: "pointer" }}
                // title="Add Permission"
                onClick={() =>
                  onAddPermission(item?.module_id, item?.module_name)
                }
              />{" "} */}
              Add Permission
            </div>
          </div>
        ),
      },
    ];
  });
};
