export const SubServiceTableData = (
  userListData: any,
  selectedPage: number
) => {
  return userListData?.data?.map((item: any, index: number) => {
    return [
      {
        title: "No.",
        data:
          selectedPage === 1 ? index + 1 : (selectedPage - 1) * 10 + index + 1,
      },
      {
        title: "Label",
        data: item.label,
      },
      {
        title: "Order Label",
        data: item?.order_label,
      },
      {
        title: "Is Active",
        data: item,
      },
      {
        title: "Handler",
        data: item?.handle,
      },
      {
        title: "Cost",
        data: item?.cost,
      },
      {
        title: "Transport Fees",
        data:
          item?.transport_fees === "fee"
            ? "This is a Transport Fee"
            : item?.transport_fees === "required"
            ? "Transport Fee Required"
            : "Transport Fee Not Required",
      },
      {
        title: "Description",
        data: item?.description,
      },
      {
        title: "Q. Label",
        data: item?.quantity_label,
      },
      {
        title: "Q. Minimum",
        data: item?.quantity_min,
      },
      {
        title: "Q. Maximum",
        data: item?.quantity_max,
      },
      {
        title: "Q. Default",
        data: item?.quantity_default,
      },
      {
        title: "Q. Base",
        data: item?.quantity_base,
      },
      {
        title: "Q. Increment",
        data: item?.quantity_increment,
      },
      {
        title: "Action",
        data: item,
      },
    ];
  });
};

export const PropertyTableData = (locationListData: any) => {
  return locationListData?.options?.map((item: any, index: number) => {
    return [
      {
        title: "No.",
        data: index + 1,
      },
      {
        title: "Label",
        data: item?.label,
      },
      {
        title: "Order Label",
        data: item?.order_label,
      },
      {
        title: "Cost",
        data: item?.cost,
      },
      {
        title: "Currency",
        data: item?.currency,
      },
      {
        title: "Action",
        data: item,
      },
    ];
  });
};
