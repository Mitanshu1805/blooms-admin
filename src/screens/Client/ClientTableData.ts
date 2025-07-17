export const ClientTableData = (
  userListData: any,
  selectedPage: number,
  limit: number
) => {
  return userListData?.data?.map((item: any, index: number) => {
    return [
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
      {
        title: "Is Active",
        data: item,
      },
      {
        title: "Action",
        data: item,
      },
    ];
  });
};
