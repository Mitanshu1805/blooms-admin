import { useLocation } from "react-router-dom";
import COComponent from "./COComponent";
import { useCallback, useEffect, useState } from "react";

import { pdf } from "@react-pdf/renderer";
import CrewSettlementDoc from "../../components/SettlementPDF/StatementDoc";
import {
  CrewOrderList,
  CrewOrdersPdf,
  CrewUpload,
  CrewOrdersUpdate,
} from "./COApis";
import moment from "moment";

function COController() {
  const { state } = useLocation();
  console.log(state);

  const [crewOrdersListData, setCrewOrdersListData] = useState<any>([]);
  const [netSettlement, setNetSettlement] = useState<any>([]);
  const [selectedPage, setSelectedPage] = useState(1);
  const [size, setSize] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [country, setCountry] = useState("");
  const [date, setDate] = useState<any>("");
  const [period, setPeriod] = useState("Weekly");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [remarks, setRemarks] = useState("");
  const [editableOrders, setEditableOrders] = useState<any[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);

  const limit = 200;

  const setFormattedContent = useCallback(
    (text: string) => {
      setRemarks(text.slice(0, limit));
    },
    [limit],
  );

  useEffect(() => {
    const currency =
      country === "Singapore" ? "SGD" : country === "Malaysia" ? "MYR" : null;
    const dates = dateSetup();
    if (currency && date !== "") {
      fetchData(currency, dates[0], dates[1]);
    }
  }, [size, selectedPage, country, date, period]);

  const dateSetup = () => {
    const dateValue = new Date(date);

    const day = String(dateValue.getDate()).padStart(2, "0");
    const month = String(dateValue.getMonth() + 1).padStart(2, "0");
    const year = dateValue.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;

    const startDate = moment.utc(formattedDate, "DD-MM-YYYY");
    const endDate = moment.utc(formattedDate, "DD-MM-YYYY");

    if (period === "Weekly") {
      endDate.add(1, "weeks");
    } else if (period === "Monthly") {
      endDate.add(1, "months");
    } else {
      endDate.add(2, "weeks");
    }

    setStartDate(startDate.format("DD-MM-YYYY"));
    setEndDate(endDate.format("DD-MM-YYYY"));

    return [startDate.format("YYYY-MM-DD"), endDate.format("YYYY-MM-DD")];
  };

  const fetchData = async (
    currency: string,
    startDate: string,
    endDate: string,
  ) => {
    const rolesDataResponse: any = await CrewOrderList(
      size,
      selectedPage,
      setIsLoading,
      state?.crew_id,
      currency,
      startDate,
      endDate,
    );
    console.log("rolesDataResponse>>", rolesDataResponse?.data);
    console.log("netSettlement>>>", netSettlement);
    if (rolesDataResponse?.data?.data) {
      setCrewOrdersListData(rolesDataResponse?.data?.data);
      setEditableOrders(
        JSON.parse(JSON.stringify(rolesDataResponse.data.data)),
      );
      setNetSettlement(rolesDataResponse?.data?.netSettlement);
    } else {
      setCrewOrdersListData([]);
      setNetSettlement([]);
    }
  };

  const handleCountryChange = (value: string) => {
    setCountry(value);
  };

  const handleDateChange = (value: any) => {
    setDate(value);
  };

  const handlePeriodChange = (value: string) => {
    setPeriod(value);
  };

  const handleGenerate = async () => {
    try {
      const blob = await pdf(
        <CrewSettlementDoc
          data={crewOrdersListData}
          crew={state}
          remarks={remarks}
          startDate={startDate}
          endDate={endDate}
        />,
      ).toBlob();

      const file = new File([blob], `${state?.crew_name}_${startDate}.pdf`, {
        type: blob.type,
      });
      const month = moment(startDate, "DD-MM-YYYY").format("MMMM");
      const year = moment(startDate, "DD-MM-YYYY").format("YY");
      const crewUploadResponse: any = await CrewUpload(
        file,
        `${month} ${year}`,
        setIsLoading,
      );

      console.log("PDF uploaded to Google Drive successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const handlePrint = async () => {
    console.log("=== PDF Generation Debug ===");

    try {
      setIsLoading(true);

      const currencyValue =
        country === "Singapore"
          ? "SGD"
          : country === "Malaysia"
            ? "MYR"
            : "USD";

      // Use the exact same date setup as fetchData
      const dates = dateSetup();

      console.log("Request Parameters:");
      console.log("- Crew ID:", state?.crew_id);
      console.log("- Currency:", currencyValue);
      console.log("- Start Date (API format):", dates[0]);
      console.log("- End Date (API format):", dates[1]);
      console.log("- Start Date (Display):", startDate);
      console.log("- End Date (Display):", endDate);
      console.log("- Crew Orders Count:", crewOrdersListData?.length);

      // Use dates[0] and dates[1] which are already in YYYY-MM-DD format
      const response = await CrewOrdersPdf(
        setIsLoading,
        state?.crew_id,
        currencyValue,
        dates[0], // These are the same dates used in fetchData
        dates[1],
      );

      console.log(
        "Response:",
        response?.status,
        "Size:",
        response?.data?.byteLength,
      );
      console.log(
        "data instanceof ArrayBuffer:",
        response?.data instanceof ArrayBuffer,
      );
      console.log("byteLength:", response?.data?.byteLength);

      if (response?.data) {
        const blob = new Blob([response.data], { type: "application/pdf" });
        console.log("Blob size:", blob.size);

        if (blob.size < 3) {
          alert(
            "⚠️ PDF generated but appears to be empty. Check if there are orders for the selected dates.",
          );
        }

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.target = "_blank";
        link.download = `crew-orders-${state?.crew_name}-${startDate}.pdf`;
        link.click();

        setTimeout(() => window.URL.revokeObjectURL(url), 100);
      }
    } catch (error) {
      console.error("PDF generation failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  // CrewOrders.controller.tsx

  const handleCellChange = (
    rowIndex: number,
    fieldTitle: string,
    value: any,
  ) => {
    console.log("Editing:", { rowIndex, fieldTitle, value });

    setEditableOrders((prev) => {
      const updated = [...prev];

      // Calculate which order this row belongs to
      let currentRowCount = 0;
      let orderIndex = -1;
      let isMaterialRow = false;

      for (let i = 0; i < updated.length; i++) {
        const hasMatFee =
          updated[i]?.materials_fee && Number(updated[i]?.materials_fee) !== 0;
        const rowsForThisOrder = hasMatFee ? 2 : 1;

        if (
          currentRowCount <= rowIndex &&
          rowIndex < currentRowCount + rowsForThisOrder
        ) {
          orderIndex = i;
          isMaterialRow = hasMatFee && rowIndex === currentRowCount + 1;
          break;
        }
        currentRowCount += rowsForThisOrder;
      }

      if (orderIndex === -1) {
        console.error("Could not find order for row index:", rowIndex);
        return prev;
      }

      console.log("Found order:", {
        orderIndex,
        isMaterialRow,
        order: updated[orderIndex],
      });

      // Update the appropriate field
      if (fieldTitle === "Fee") {
        if (isMaterialRow) {
          // Material row - update materials_fee
          updated[orderIndex] = {
            ...updated[orderIndex],
            materials_fee: value,
          };
        } else {
          // Service row - update cashless or cash
          if (
            updated[orderIndex].actual_payment_mode === "cashless" ||
            Number(updated[orderIndex]?.cashless ?? "0")
          ) {
            updated[orderIndex] = {
              ...updated[orderIndex],
              cashless: value,
            };
          } else {
            updated[orderIndex] = {
              ...updated[orderIndex],
              cash: value,
            };
          }
        }
      } else if (fieldTitle === "Cash/Cashless") {
        updated[orderIndex] = {
          ...updated[orderIndex],
          actual_payment_mode: value,
        };

        if (value === "cash") {
          updated[orderIndex].cash =
            updated[orderIndex].cashless || updated[orderIndex].cash || "0.00";
          updated[orderIndex].cashless = "0.00";
        } else {
          updated[orderIndex].cashless =
            updated[orderIndex].cash || updated[orderIndex].cashless || "0.00";
          updated[orderIndex].cash = "0.00";
        }
      } else if (fieldTitle === "Customer") {
        updated[orderIndex] = {
          ...updated[orderIndex],
          contact_person: value,
        };
      } else if (fieldTitle === "Order ID") {
        updated[orderIndex] = {
          ...updated[orderIndex],
          oid: value,
        };
      } else if (fieldTitle === "Waiver") {
        updated[orderIndex] = {
          ...updated[orderIndex],
          has_waiver: value,
        };
      }

      console.log("Updated order:", updated[orderIndex]);
      return updated;
    });
  };

  const isOrderChanged = (original: any, edited: any) => {
    return (
      String(original.cash ?? "0.00") !== String(edited.cash ?? "0.00") ||
      String(original.cashless ?? "0.00") !==
        String(edited.cashless ?? "0.00") ||
      String(original.materials_fee ?? "0.00") !==
        String(edited.materials_fee ?? "0.00") ||
      original.actual_payment_mode !== edited.actual_payment_mode ||
      original.contact_person !== edited.contact_person ||
      original.oid !== edited.oid || // ✅ ADD THIS
      original.has_waiver !== edited.has_waiver
    );
  };

  const buildUpdatePayload = () => {
    return editableOrders
      .filter((edited: any, index: number) =>
        isOrderChanged(crewOrdersListData[index], edited),
      )
      .map((order: any, index: number) => {
        const original = crewOrdersListData[index];

        const fee = Number(order.cashless ?? 0) || Number(order.cash ?? 0) || 0;

        const isCash = order.actual_payment_mode === "cash";

        const payload: any = {
          order_id: order.order_id,
          payment_mode: isCash ? "cash" : "cashless",
          cash: isCash ? fee.toFixed(2) : "0.00",
          cashless: isCash ? "0.00" : fee.toFixed(2),
          materials_fee: String(order.materials_fee ?? "0.00"),
          time_slot: order?.time_slot,
          has_waiver: order?.has_waiver,
          contact_person: order?.contact_person,
        };

        // ✅ Only add contact_person if changed
        // if (original.contact_person !== order.contact_person) {
        //   payload.contact_person = order.contact_person;
        // }

        // ✅ Only add oid if changed
        if (original.oid !== order.oid) {
          payload.oid = order.oid;
        }

        return payload;
      });
  };

  return (
    <div>
      <COComponent
        crewOrdersListData={crewOrdersListData}
        setCrewOrdersListData={setCrewOrdersListData}
        netSettlement={netSettlement}
        setNetSettlement={setNetSettlement}
        selectedPage={selectedPage}
        isLoading={isLoading}
        size={size}
        searchInput=""
        setSelectedPage={setSelectedPage}
        // generateStatement={handleGenerate}
        generateStatement={handlePrint}
        country={country}
        handleCountryChange={handleCountryChange}
        remarks={remarks}
        handleRemarksChange={setFormattedContent}
        limit={limit}
        date={date}
        handleDateChange={handleDateChange}
        period={period}
        handlePeriodChange={handlePeriodChange}
        crewName={state.crew_name}
        waiver={Number(state.waiver)}
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
        editableOrders={editableOrders}
        handleCellChange={handleCellChange}
        buildUpdatePayload={buildUpdatePayload}
        setIsLoading={setIsLoading}
      />
    </div>
  );
}

export default COController;
