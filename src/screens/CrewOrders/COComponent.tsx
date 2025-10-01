import {
  Button,
  DatePickerComponent,
  DropDown,
  Input,
  TableComp,
} from "../../components";
import { CrewOrdersTableData } from "./CrewOrdersTableData";
import "./CrewOrders.scss";

interface CrewOrdersProps {
  selectedPage: number;
  crewOrdersListData: any;
  isLoading: boolean;
  size: number;
  searchInput: string;
  setSelectedPage: (value: number) => void;
  generateStatement: () => void;
  country: string;
  handleCountryChange: (value: string) => void;
  handleRemarksChange: (value: string) => void;
  remarks: string;
  limit: number;
  date: any;
  handleDateChange: (value: any) => void;
  period: string;
  handlePeriodChange: (value: string) => void;
  crewName: string;
  waiver: number;
}

function COComponent({
  selectedPage,
  crewOrdersListData,
  isLoading,
  size,
  searchInput,
  setSelectedPage,
  generateStatement,
  country,
  handleCountryChange,
  remarks,
  handleRemarksChange,
  limit,
  date,
  handleDateChange,
  period,
  handlePeriodChange,
  crewName,
  waiver,
}: CrewOrdersProps) {
  const headerData = [
    "No",
    "Customer",
    "Time Slot",
    "Order ID",
    "Cash/Cashless",
    "Type",
    "Fee",
    `Comm Waiver? (${waiver}%)`,
    `Credit/Debit (${crewOrdersListData[0]?.currency})`,
    "Nett",
    "Crew Earnings",
    "BLMS Earnings",
  ];

  const listData = CrewOrdersTableData(
    crewOrdersListData,
    selectedPage,
    size,
    waiver
  );
  return (
    <div className="details-list-card card">
      <div className="details-list-top">
        <div className="details-list-top-left">
          <span className="details-list-top-left-title">
            ORDERS LIST BY {crewName}
          </span>
          <div className="row justify-content-center mt-4">
            <div>
              <DropDown
                label={"Country"}
                data={["Singapore", "Malaysia"]}
                value={country}
                onChange={(e: any) => {
                  handleCountryChange(e.target.value);
                }}
              />
              <DatePickerComponent
                label={"Start Date"}
                selected={date}
                onChange={(value: any) => {
                  handleDateChange(value);
                }}
              />
              <DropDown
                label={"Period"}
                data={["Weekly", "Biweekly", "Monthly"]}
                value={period}
                onChange={(e: any) => {
                  handlePeriodChange(e.target.value);
                }}
              />
            </div>
          </div>
          <div>
            <p>Remarks:</p>
            <textarea
              className="fixed-height-textarea"
              onChange={(event) => handleRemarksChange(event.target.value)}
              value={remarks}
              placeholder="Enter your remarks here (Optional)"
            />
            <p>
              {remarks.length}/{limit}
            </p>
          </div>
          <div className="details-list-top-left-dropdown">
            {/* <NumberDropdown
                  data={userListData}
                  onChange={(e: any) => {
                    setSize(e.target.value);
                    setSelectedPage(1);
                  }}
                /> */}
          </div>
        </div>
        <div className="details-list-top-right"></div>
      </div>
      <div className="details-list-table">
        <TableComp
          isLoading={false}
          listHeaderData={headerData}
          listData={listData}
        />
      </div>
      {/* {sampleData?.length > 0 ? (
            <div className="details-list-pagination">
              <Pagination
                selectedPage={selectedPage}
                totalCount={userListData?.totalPages ?? 1}
                onPageChange={(page: number) => setSelectedPage(page)}
                itemsPerPage={4}
              />
            </div>
          ) : null} */}
      <div>
        <Button
          className="order-info-receipt-btn"
          name={"Generate Statement"}
          onClick={generateStatement}
          isInvalid={crewOrdersListData.length === 0}
        />
      </div>
    </div>
  );
}

export default COComponent;
