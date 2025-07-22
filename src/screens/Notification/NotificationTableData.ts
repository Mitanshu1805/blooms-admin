import moment from "moment";
import { hasPermission } from "../../utils/permissions.utils";

export const NotificationTableData = (
  notificationListData: any,
  selectedPage: number,
  size: number
) => {
  // const canUpdate = hasPermission("notification", "update");
  const canDelete = hasPermission("notification", "delete");
  const showActionColumn = canDelete;
  return notificationListData?.crews?.map((item: any, index: number) => {
    const row = [
      {
        title: "No.",
        data:
          selectedPage === 1
            ? index + 1
            : (selectedPage - 1) * size + index + 1,
      },
      {
        title: "Title",
        data: item?.title,
      },
      {
        title: "Context",
        data: item?.title_text,
      },
      {
        title: "CreatedAt",
        data: moment(item?.created_at).format("DD-MM-YYYY, h:mm:ss A"),
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
