import moment from "moment";
import { hasPermission } from "../../utils/permissions.utils";

export const CodeTableData = (
  userListData: any,
  selectedPage: number,
  size: number
) => {
  const canUpdate = hasPermission("discount_codes", "update");
  const canDelete = hasPermission("discount_codes", "delete");
  const showActionColumn = canDelete || canUpdate;
  return userListData?.list?.map((item: any, index: number) => {
    const row = [
      {
        title: "No.",
        data:
          selectedPage === 1
            ? index + 1
            : (selectedPage - 1) * size + index + 1,
      },
      {
        title: "Name",
        data: item?.name,
      },
      {
        title: "Discount Code",
        data: item?.discount_code,
      },
      {
        title: "Quantity",
        data: item?.quantity,
      },
      {
        title: "Discount Value",
        data: item.discount_value,
      },
      {
        title: "Access Type",
        data: item?.discount_type,
      },
      {
        title: "Start Date",
        data: item?.date_start
          ? moment(item?.date_start).format("DD-MM-YYYY")
          : "-",
      },
      {
        title: "End Date",
        data: item?.date_end
          ? moment(item?.date_end).format("DD-MM-YYYY")
          : "-",
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
