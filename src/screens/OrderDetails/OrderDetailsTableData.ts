export const OrderDetailsTableData = (item: any) => {
  return item?.items?.map((item: any, index: number) => {
    return [
      {
        title: "No.",
        data: index + 1,
      },
      {
        title: "Price Label",
        data: item?.cost_label,
      },
      {
        title: "Price",
        data: item.cost,
      },
      {
        title: "Property Label",
        data: item.property_cost_label,
      },
      {
        title: "Property Price",
        data: item?.property_cost,
      },
      {
        title: "Label",
        data: item?.label,
      },
      {
        title: "Quantity",
        data: item?.quantity,
      },
      {
        title: "Order Label",
        data: item?.order_label,
      },
      {
        title: "Base",
        data: item?.base,
      },
      {
        title: "Quantity Label",
        data: item?.quantity_label,
      },
      {
        title: "Amount",
        data: item?.amount,
      },
    ];
  });
};
