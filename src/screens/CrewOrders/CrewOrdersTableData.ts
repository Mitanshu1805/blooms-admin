import moment from "moment";
import { title } from "process";

export const CrewOrdersTableData = (
  crewOrdersListData: any,
  selectedPage: number,
  size: number,
  waiver: number
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
        data: Number(item?.cashless ?? "0") ? "cashless" : "cash",
      },
      {
        title: "Type",
        data: "Service",
      },
      {
        title: "Fee",
        data: Number(item?.cashless ?? "0") ? item.cashless : item?.cash,
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

// export const CrewOrdersTableData = (
//   crewOrdersListData: any,
//   selectedPage: number,
//   size: number,
//   waiver: number
// ) => {
//   let accumulatedNett = 0;

//   return crewOrdersListData?.flatMap((item: any, index: number) => {
//     const calWaiver = waiver > 0 && waiver <= 100 ? waiver : 10;

//     const calculateService = () => {
//       if (item?.cashless && Number(item.cashless) > 0) {
//         return item.has_waiver
//           ? Number(item.order_amount)
//           : (Number(item.order_amount) * (100 - calWaiver)) / 100;
//       } else {
//         return item.has_waiver
//           ? 0
//           : (-1 * Number(item.order_amount) * calWaiver) / 100;
//       }
//     };

//     const serviceCredit = calculateService();
//     let materialsCredit = 0;

//     if (item?.materials_fee && Number(item.materials_fee) !== 0) {
//       // only add materials if cashless
//       if (item?.cashless && Number(item.cashless) > 0) {
//         materialsCredit = Number(item.materials_fee);
//       }
//     }

//     const orderTotal = serviceCredit + materialsCredit;
//     accumulatedNett += orderTotal; // update running total

//     // then generate rows
//     const numberIndex =
//       selectedPage === 1 ? index + 1 : (selectedPage - 1) * size + index + 1;

//     const baseRow = [
//       { title: "No.", data: item?.materials_fee ? `${numberIndex}a` : numberIndex },
//       { title: "Customer", data: item.contact_person },
//       { title: "Time slot", data: moment.utc(item.time_slot).format("DD-MM-YYYY") },
//       { title: "Order ID", data: item.oid },
//       { title: "Cash/Cashless", data: Number(item.cashless) > 0 ? "cashless" : "cash" },
//       { title: "Type", data: "Service" },
//       { title: "Fee", data: item.order_amount },
//       { title: "Waiver", data: item.has_waiver ? "Yes" : `No (${waiver}%)` },
//       { title: "Credit/Debit", data: serviceCredit.toFixed(2) },
//       { title: "Nett", data: accumulatedNett.toFixed(2) },
//     ];

//     const rows = [baseRow];

//     if (materialsCredit > 0) {
//       const materialRow = [
//         { title: "No.", data: `${numberIndex}b` },
//         { title: "Customer", data: item.contact_person },
//         { title: "Time slot", data: moment.utc(item.time_slot).format("DD-MM-YYYY") },
//         { title: "Order ID", data: item.oid },
//         { title: "Cash/Cashless", data: "cashless" },
//         { title: "Type", data: "Materials" },
//         { title: "Fee", data: item.materials_fee },
//         { title: "Waiver", data: "-" },
//         { title: "Credit/Debit", data: materialsCredit.toFixed(2) },
//         { title: "Nett", data: accumulatedNett.toFixed(2) },
//       ];
//       rows.push(materialRow);
//     }

//     return rows;
//   });
// };
