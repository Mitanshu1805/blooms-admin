import moment from "moment";
import { hasPermission } from "../../utils/permissions.utils";

export const OrderTableData = (
  userListData: any,
  selectedPage: number,
  size: number
) => {
  const canDelete = hasPermission("orders", "delete");
  const showActionColumn = canDelete;
  return userListData?.data?.map((item: any, index: number) => {
    const row = [
      {
        title: "No.",
        data:
          selectedPage === 1
            ? index + 1
            : (selectedPage - 1) * size + index + 1,
      },
      {
        title: "Location Name",
        data: item?.location_name,
      },
      {
        title: "Navigate",
        data: item,
      },
      {
        title: "Client Name",
        data: item?.contact_person,
      },
      {
        title: "Order ID",
        data: item.oid,
      },
      {
        title: "City",
        data: item.city,
      },
      {
        title: "Payment Method",
        data: item?.payment_mode,
      },
      {
        title: "Status",
        data: item?.order_status,
      },
      {
        title: "Code",
        data: item?.discount_code,
      },
      {
        title: "Time slot",
        data: moment.utc(item?.time_slot).format("YYYY-MM-DD h:mm:ss A"),
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
