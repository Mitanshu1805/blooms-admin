import moment from "moment";

export const NotificationTableData = (
  notificationListData: any,
  selectedPage: number,
  size: number
) => {
  return notificationListData?.crews?.map((item: any, index: number) => {
    return [
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
      {
        title: "Action",
        data: item,
      },
    ];
  });
};
