import { useLocation } from "react-router-dom";
import COComponent from "./COComponent";
import { useCallback, useEffect, useState } from "react";

import { pdf } from "@react-pdf/renderer";
import CrewSettlementDoc from "../../components/SettlementPDF/StatementDoc";
import { CrewOrderList, CrewOrdersPdf, CrewUpload } from "./COApis";
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
  const limit = 200;

  const setFormattedContent = useCallback(
    (text: string) => {
      setRemarks(text.slice(0, limit));
    },
    [limit]
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
    endDate: string
  ) => {
    const rolesDataResponse: any = await CrewOrderList(
      size,
      selectedPage,
      setIsLoading,
      state?.crew_id,
      currency,
      startDate,
      endDate
    );
    console.log("rolesDataResponse>>", rolesDataResponse?.data);
    console.log("netSettlement>>>", netSettlement);
    if (rolesDataResponse?.data?.data) {
      setCrewOrdersListData(rolesDataResponse?.data?.data);
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
        />
      ).toBlob();

      const file = new File([blob], `${state?.crew_name}_${startDate}.pdf`, {
        type: blob.type,
      });
      const month = moment(startDate, "DD-MM-YYYY").format("MMMM");
      const year = moment(startDate, "DD-MM-YYYY").format("YY");
      const crewUploadResponse: any = await CrewUpload(
        file,
        `${month} ${year}`,
        setIsLoading
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
        dates[1]
      );

      console.log(
        "Response:",
        response?.status,
        "Size:",
        response?.data?.byteLength
      );
      console.log(
        "data instanceof ArrayBuffer:",
        response?.data instanceof ArrayBuffer
      );
      console.log("byteLength:", response?.data?.byteLength);

      if (response?.data) {
        const blob = new Blob([response.data], { type: "application/pdf" });
        console.log("Blob size:", blob.size);

        if (blob.size < 3) {
          alert(
            "⚠️ PDF generated but appears to be empty. Check if there are orders for the selected dates."
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

  return (
    <div>
      <COComponent
        crewOrdersListData={crewOrdersListData}
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
      />
    </div>
  );
}

export default COController;
