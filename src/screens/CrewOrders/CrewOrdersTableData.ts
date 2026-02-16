import { editableInputTypes } from "@testing-library/user-event/dist/utils";
import moment from "moment";
import { title } from "process";

export const CrewOrdersTableData = (
  crewOrdersListData: any,
  selectedPage: number,
  size: number,
  waiver: number,
) => {
  let accumulatedNett: number = 0;
  console.log(crewOrdersListData);

  return crewOrdersListData?.flatMap((item: any, index: number) => {
    console.log(item);

    const calculate = () => {
      const order_amount = Number(item?.cashless ?? "0")
        ? item.cashless
        : item?.cash;
      const calWaiver = waiver > 0 && waiver <= 100 ? waiver : 10;
      if (Number(item?.cashless ?? 0)) {
        return item.has_waiver
          ? order_amount
          : (Number(order_amount) * (100 - calWaiver)) / 100;
      }

      return item.has_waiver
        ? 0.0
        : (-1 * (Number(order_amount) * calWaiver)) / 100;
    };

    const creditDebit = Number(calculate());
    accumulatedNett += creditDebit;
    console.log(creditDebit, accumulatedNett);

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
        editable: true,
        fieldName: "contact_person",
      },
      {
        title: "Time slot",
        data: moment.utc(item?.time_slot).format("DD-MM-YYYY"),
      },
      {
        title: "Order ID",
        data: item.oid,
        editable: true,
        fieldName: "oid",
      },
      {
        title: "Cash/Cashless",
        // data: Number(item?.cashless ?? "0") ? "cashless" : "cash",
        data: item?.actual_payment_mode,
        editable: true,
        fieldName: "actual_payment_mode",
      },
      {
        title: "Type",
        data: "Service",
      },
      {
        title: "Fee",
        data: Number(item?.cashless ?? "0") ? item.cashless : item?.cash,
        editable: true,
        fieldName: Number(item?.cashless ?? "0") ? "cashless" : "cash",
      },

      {
        title: "Waiver",
        // data: item?.has_waiver ? "Yes" : `No (${waiver}%)`,
        data: item?.has_waiver ?? false,
        editable: true,
        fieldName: "has_waiver",
        type: "boolean",
      },
      {
        title: "Credit/Debit",
        data: Number(creditDebit).toFixed(2),
      },
      {
        title: "Nett",
        data: accumulatedNett.toFixed(2),
      },
      // {
      //   title: "Action",
      //   data: item,
      // },
      // {
      //   title: "Crew Earnings",
      //   data: item?.crew_earnings,
      // },
      // {
      //   title: "BLMS Earnings",
      //   data: item?.blms_earnings,
      // },
    ];
    const rows = [baseRow];

    if (item?.materials_fee && Number(item?.materials_fee) !== 0) {
      if (item?.actual_payment_mode == "cashless") {
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
          editable: true,
          fieldName: "contact_person",
        },
        {
          title: "Time slot",
          data: moment.utc(item?.time_slot).format("DD-MM-YYYY"),
        },
        {
          title: "Order ID",
          data: item.oid,
          editable: true,
          fieldName: "oid",
        },
        {
          title: "Cash/Cashless",
          // data: item?.cashless ? "cashless" : "cash",
          data: item?.actual_payment_mode,
          editable: true,
          fieldName: "actual_payment_mode",
        },
        {
          title: "Type",
          data: "Materials",
        },
        {
          title: "Fee",
          data: item?.materials_fee,
          editable: true,
          fieldName: "materials_fee",
        },
        {
          title: "Waiver",
          data: "-",
          // editable: false,
        },
        {
          title: "Credit/Debit",
          data: item?.cashless ? item?.materials_fee : "0.00",
        },
        {
          title: "Nett",
          data: accumulatedNett.toFixed(2),
        },
        // {
        //   title: "Action",
        //   data: item,
        // },
        // {
        //   title: "Crew Earnings",
        //   data: item?.crew_earnings,
        // },
        // {
        //   title: "BLMS Earnings",
        //   data: item?.blms_earnings,
        // },
      ];

      rows.push(materialRow);
    }

    return rows;
  });
};
