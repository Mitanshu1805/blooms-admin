import moment from "moment";

export const UserTableData = (
  userListData: any,
  selectedPage: number,
  size: number
) => {
  return userListData?.users?.map((item: any, index: number) => {
    return [
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
        data: item?.role,
      },
      {
        title: "Is Active",
        data: item,
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
      {
        title: "Action",
        data: item,
      },
    ];
  });
};
