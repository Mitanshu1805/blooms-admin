// import React from "react";

// interface ClientBlockHistoryProps {
//   show: boolean;
//   onClose: () => void;
//   historyData: any;
// }

// const ClientBlockHistory: React.FC<ClientBlockHistoryProps> = ({
//   show,
//   onClose,
//   historyData,
// }) => {
//   if (!show) return null;

//   // Convert object response (with message, success, etc.) into a proper array
//   //   const entries =
//   //     historyData && typeof historyData === "object"
//   //       ? Object.values(historyData).filter(
//   //           (item) => typeof item === "object" && item?.client_id
//   //         )
//   //       : [];
//   type ClientHistory = Record<
//     string,
//     { client_id: string; [key: string]: any }
//   >;

//   const filteredHistory =
//     historyData && typeof historyData === "object"
//       ? Object.values(historyData as ClientHistory).filter(
//           (item) => item.client_id
//         )
//       : [];
//   console.log(filteredHistory);

//   return (
//     <div
//       className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4"
//       role="dialog"
//       aria-modal="true"
//       aria-labelledby="client-block-history-title"
//     >
//       <div className="w-full max-w-4xl rounded-2xl bg-white dark:bg-slate-800 shadow-2xl ring-1 ring-black/5 overflow-hidden">
//         {/* Header */}
//         <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-slate-700">
//           <h3
//             id="client-block-history-title"
//             className="text-lg font-semibold text-slate-900 dark:text-slate-100"
//           >
//             Client Block History
//           </h3>
//           <button
//             onClick={onClose}
//             aria-label="Close"
//             className="inline-flex items-center justify-center rounded-md p-2 hover:bg-slate-100 dark:hover:bg-slate-700"
//           >
//             <svg
//               className="h-5 w-5 text-slate-700 dark:text-slate-200"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           </button>
//         </div>

//         {/* Body */}
//         <div className="px-6 py-5">
//           {filteredHistory.length > 0 ? (
//             <div className="overflow-x-auto">
//               <table className="min-w-full table-auto text-sm">
//                 <thead>
//                   <tr className="bg-gray-50 dark:bg-slate-700">
//                     <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-slate-700 dark:text-slate-200">
//                       #
//                     </th>
//                     <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-slate-700 dark:text-slate-200">
//                       Reason
//                     </th>
//                     <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-slate-700 dark:text-slate-200">
//                       Time Period
//                     </th>
//                     <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-slate-700 dark:text-slate-200">
//                       Blocked At
//                     </th>
//                     <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-slate-700 dark:text-slate-200">
//                       Unblocked At
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
//                   {filteredHistory.map((item: any, index: number) => (
//                     <tr
//                       key={index}
//                       className="hover:bg-gray-50 dark:hover:bg-slate-800"
//                     >
//                       <td className="px-4 py-3 text-slate-700 dark:text-slate-200">
//                         {index + 1}
//                       </td>
//                       <td className="px-4 py-3 text-slate-700 dark:text-slate-200">
//                         {item?.reason ?? "-"}
//                       </td>
//                       <td className="px-4 py-3 text-slate-700 dark:text-slate-200">
//                         {item?.time_period
//                           ? `${item.time_period.days ?? ""} ${
//                               item.time_period.unit ?? ""
//                             }`
//                           : "-"}
//                       </td>
//                       <td className="px-4 py-3 text-slate-700 dark:text-slate-200">
//                         {item?.blocked_at
//                           ? new Date(item.blocked_at).toLocaleString()
//                           : "-"}
//                       </td>
//                       <td className="px-4 py-3 text-slate-700 dark:text-slate-200">
//                         {item?.unblocked_at
//                           ? new Date(item.unblocked_at).toLocaleString()
//                           : "-"}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             <div className="py-8 text-center text-sm text-slate-600 dark:text-slate-300">
//               No block history found.
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 dark:border-slate-700">
//           <button
//             onClick={onClose}
//             className="rounded-md bg-slate-100 px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClientBlockHistory;

import React from "react";

interface ClientBlockHistoryProps {
  show: boolean;
  onClose: () => void;
  historyData: any;
}

const ClientBlockHistory: React.FC<ClientBlockHistoryProps> = ({
  show,
  onClose,
  historyData,
}) => {
  if (!show) return null;

  // Convert to array safely
  const filteredHistory =
    historyData && typeof historyData === "object"
      ? Object.values(historyData).filter(
          (item: any) => item && typeof item === "object" && item.client_id
        )
      : [];

  console.log(filteredHistory);

  const getTimePeriod = (tp: any) => {
    if (!tp || typeof tp !== "object") return "-";
    const key = Object.keys(tp)[0]; // e.g. "days", "weeks", etc.
    const value = tp[key];
    return `${value} ${key}`;
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          width: "100%",
          maxWidth: "800px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "15px 20px",
            borderBottom: "1px solid #ddd",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3 style={{ margin: 0 }}>Client Block History</h3>
          <button
            onClick={onClose}
            style={{
              border: "none",
              background: "transparent",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "20px" }}>
          {filteredHistory.length > 0 ? (
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "14px",
                }}
              >
                <thead>
                  <tr style={{ background: "#f5f5f5" }}>
                    <th style={{ textAlign: "left", padding: "8px" }}>#</th>
                    <th style={{ textAlign: "left", padding: "8px" }}>
                      Reason
                    </th>
                    <th style={{ textAlign: "left", padding: "8px" }}>
                      Time Period
                    </th>
                    <th style={{ textAlign: "left", padding: "8px" }}>
                      Blocked At
                    </th>
                    {/* <th style={{ textAlign: "left", padding: "8px" }}>
                      Unblocked At
                    </th> */}
                  </tr>
                </thead>
                <tbody>
                  {filteredHistory.map((item: any, index: number) => (
                    <tr
                      key={index}
                      style={{
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      <td style={{ padding: "8px" }}>{index + 1}</td>
                      <td style={{ padding: "8px" }}>{item?.reason ?? "-"}</td>
                      <td style={{ padding: "8px" }}>
                        {getTimePeriod(item?.time_period)}
                      </td>
                      <td style={{ padding: "8px" }}>
                        {item?.blocked_at
                          ? new Date(item.blocked_at).toLocaleString()
                          : "-"}
                      </td>
                      {/* <td style={{ padding: "8px" }}>
                        {item?.unblocked_at
                          ? new Date(item.unblocked_at).toLocaleString()
                          : "-"}
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{ textAlign: "center", color: "#555" }}>
              No block history found.
            </p>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "15px 20px",
            borderTop: "1px solid #ddd",
            textAlign: "right",
          }}
        >
          <button
            onClick={onClose}
            style={{
              backgroundColor: "#f0f0f0",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "6px 14px",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientBlockHistory;
