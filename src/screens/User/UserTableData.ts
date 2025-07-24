import moment from "moment";
import { hasPermission } from "../../utils/permissions.utils";

export const UserTableData = (
  userListData: any,
  selectedPage: number,
  size: number
) => {
  const canUpdate = hasPermission("user", "update");
  const canDelete = hasPermission("user", "delete");
  const showActionColumn = canDelete || canUpdate;

  return userListData?.users?.map((item: any, index: number) => {
    // console.log("userListData>>", userListData);
    const row = [
      {
        title: "No.",
        data:
          selectedPage === 1
            ? index + 1
            : (selectedPage - 1) * size + index + 1,
      },
      {
        title: "First Name",
        data: item?.first_name,
      },
      {
        title: "Last Name",
        data: item.last_name,
      },
      {
        title: "Phone Number",
        data: item?.phone_number,
      },
      {
        title: "Role",
        data: item?.role_name,
      },

      {
        title: "Date of Birth",
        data: moment(item.dob).format("DD-MM-YYYY"),
      },
      {
        title: "Employee Type",
        data: item?.employee_type,
      },
      {
        title: "Service Type",
        data: item?.service_type,
      },
    ];

    if (canUpdate) {
      row.push({
        title: "Is Active",
        data: item,
      });
    }

    if (showActionColumn) {
      row.push({
        title: "Action",
        data: item,
      });
    }

    return row;
  });
};
