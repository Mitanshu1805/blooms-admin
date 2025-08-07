import { hasPermission } from "../../utils/permissions.utils";

export const RolesTableData = (
  userListData: any,
  selectedPage: number,
  size: number
) => {
  const canUpdate = hasPermission("user", "update");
  const canDelete = hasPermission("user", "delete");
  const showActionColumn = canDelete;
  return userListData?.data?.roles?.map((item: any, index: number) => {
    console.log("userListData?>>>>>", userListData);
    console.log("item?>>", item);
    const formatModuleName = (name: string) => {
      return name
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    };

    const row = [
      {
        title: "No.",
        data: (
          <span style={{ verticalAlign: "top", display: "inline-block" }}>
            {selectedPage === 1
              ? index + 1
              : (selectedPage - 1) * size + index + 1}
          </span>
        ),
      },
      {
        title: "Role Name",
        data: (
          <span style={{ verticalAlign: "top", display: "inline-block" }}>
            {item?.role_name}
          </span>
        ),
      },
      {
        title: "Permissions",
        data: (
          <ul style={{ listStyle: "none", paddingLeft: "0", margin: 0 }}>
            {item?.permissions?.map((perm: any, idx: number) => (
              <li
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.5rem",
                  marginBottom: "4px",
                }}
              >
                <span style={{ lineHeight: "1.4" }}>•</span>
                <span style={{ lineHeight: "1.4" }}>
                  <strong>{formatModuleName(perm.module_name)}</strong> (
                  {perm.actions.join(", ")})
                </span>
              </li>
            ))}
          </ul>
        ),
      },
    ];

    if (showActionColumn) {
      row.push({
        title: "Action",
        data: item,
      });
    }

    return row;
  });
};
