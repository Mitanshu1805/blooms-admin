import { hasPermission } from "../../utils/permissions.utils";

export const ClientTableData = (
  userListData: any,
  selectedPage: number,
  limit: number
) => {
  const canDelete = hasPermission("client", "delete");
  const canUpdate = hasPermission("client", "update");

  return userListData?.data?.map((item: any, index: number) => {
    const row = [
      {
        title: "No.",
        data:
          selectedPage === 1
            ? index + 1
            : (selectedPage - 1) * limit + index + 1,
      },
      {
        title: "Phone Number",
        data: item?.phone_number,
      },
    ];

    if (canUpdate) {
      row.push({
        title: "Is Active",
        data: item,
      });
    }

    if (canDelete) {
      row.push({
        title: "Action",
        data: item,
      });
    }

    return row;
  });
};
