import moment from "moment";

export const CrewOrdersTableData = (
  crewOrdersListData: any,
  selectedPage: number,
  size: number,
  waiver: number
) => {
  let accumulatedNett: number = 0;
  return crewOrdersListData?.flatMap((item: any, index: number) => {
    const calculate = () => {
      const calWaiver = waiver > 0 && waiver <= 100 ? waiver : 10;
      if (item?.cashless) {
        return item.has_waiver
          ? item.order_amount
          : (Number(item.order_amount) * (100 - calWaiver)) / 100;
      }

      return item.has_waiver
        ? 0.0
        : (-1 * (Number(item.order_amount) * calWaiver)) / 100;
    };

    const creditDebit = Number(calculate());
    accumulatedNett += creditDebit;
    const numberIndex =
      selectedPage === 1 ? index + 1 : (selectedPage - 1) * size + index + 1;

    const baseRow = [
      {
        title: "No.",
        data:
          item?.materials_fee && Number(item?.materials_fee) !== 0
            ? `${numberIndex}a`
            : numberIndex,
      },
      {
        title: "Customer",
        data: item?.contact_person,
      },
      {
        title: "Time slot",
        data: moment.utc(item?.time_slot).format("DD-MM-YYYY"),
      },
      {
        title: "Order ID",
        data: item.oid,
      },
      {
        title: "Cash/Cashless",
        data: item?.cashless ? "cashless" : "cash",
      },
      {
        title: "Type",
        data: "Service",
      },
      {
        title: "Fee",
        data: item.order_amount,
      },
      {
        title: "Waiver",
        data: item?.has_waiver ? "Yes" : `No (${waiver}%)`,
      },
      {
        title: "Credit/Debit",
        data: Number(creditDebit).toFixed(2),
      },
      {
        title: "Nett",
        data: accumulatedNett.toFixed(2),
      },
    ];
    const rows = [baseRow];

    if (item?.materials_fee && Number(item?.materials_fee) !== 0) {
      if (item?.cashless) {
        accumulatedNett += Number(item?.materials_fee);
      }
      const materialRow = [
        {
          title: "No.",
          data: `${numberIndex}b`,
        },
        {
          title: "Customer",
          data: item?.contact_person,
        },
        {
          title: "Time slot",
          data: moment.utc(item?.time_slot).format("DD-MM-YYYY"),
        },
        {
          title: "Order ID",
          data: item.oid,
        },
        {
          title: "Cash/Cashless",
          data: item?.cashless ? "cashless" : "cash",
        },
        {
          title: "Type",
          data: "Materials",
        },
        {
          title: "Fee",
          data: item?.materials_fee,
        },
        {
          title: "Waiver",
          data: "-",
        },
        {
          title: "Credit/Debit",
          data: item?.cashless ? item?.materials_fee : "0.00",
        },
        {
          title: "Nett",
          data: accumulatedNett.toFixed(2),
        },
      ];

      rows.push(materialRow);
    }

    return rows;
  });
};
