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
        title: "Name",
        data: item?.client_name,
      },
      {
        title: "Phone Number",
        data: item?.phone_number,
      },
      {
        title: "Reason",
        data: item?.reason,
      },
      {
        title: "Time Period",
        data: (() => {
          const tp = item?.time_period;
          if (!tp) return "-";

          const unit = Object.keys(tp)[0]; // e.g. "days", "weeks"
          const value = tp[unit];
          return value ? `${value} ${unit}` : "-";
        })(),
      },

      {
        title: "Blocked At",
        data: item?.blocked_at,
      },

      {
        title: "Block History",
        data: item,
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
