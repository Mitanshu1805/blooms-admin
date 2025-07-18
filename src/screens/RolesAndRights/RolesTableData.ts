export const RolesTableData = (
  userListData: any,
  selectedPage: number,
  size: number
) => {
  // console.log("userListData???>>>>>>", userListData);

  return userListData?.roles?.map((item: any, index: number) => {
    return [
      {
        title: "No.",
        data:
          selectedPage === 1
            ? index + 1
            : (selectedPage - 1) * size + index + 1,
      },
      {
        title: "Role Name",
        data: item?.role_name,
      },
      {
        title: "Role Code",
        data: item.role_code,
      },
      {
        title: "Read",
        data: item.role_code,
      },
      {
        title: "Write",
        data: item.role_code,
      },
      {
        title: "Update",
        data: item?.access_type,
      },
      {
        title: "Delete",
        data: item?.permission_type,
      },

      {
        title: "Action",
        data: item,
      },
    ];
  });
};
