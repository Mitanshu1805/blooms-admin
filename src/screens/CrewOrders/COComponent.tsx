import {
  AssignCrew,
  Button,
  DatePickerComponent,
  DropDown,
  Input,
  TableComp,
} from "../../components";
import { CrewOrdersTableData } from "./CrewOrdersTableData";
import "./CrewOrders.scss";
import { CrewOrdersUpdate } from "./COApis";
import EditTimeSlot from "../../components/Screen/OrderComponent/EditTimeSlot";

interface CrewOrdersProps {
  selectedPage: number;
  setCrewOrdersListData: any;
  crewOrdersListData: any;
  isLoading: boolean;
  size: number;
  searchInput: string;
  setSelectedPage: (value: number) => void;
  generateStatement: any;
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
  setNetSettlement: any;
  netSettlement: any;
  isEditMode: any;
  setIsEditMode: any;
  editableOrders: any;
  handleCellChange: any;
  buildUpdatePayload: any;
  setIsLoading: any;
  onTimeSlotClick: any;
  orderData: any;
  setOrderData: any;
  showTimeSlotTable: any;
  timeSlotTable: any;
  setTimeSlotTable: any;
  showTimeSlotModal: any;
  slotData: any;
  selectedSlot: any;
  setSelectedSlot: any;
  setShowTimeSlotModal: any;
  setEditableOrders: any;
  validateOrders: any;
  errors: any;
  OrdersValidator: any;
}

function COComponent({
  selectedPage,
  setCrewOrdersListData,
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
  netSettlement,
  setNetSettlement,
  isEditMode,
  setIsEditMode,
  editableOrders,
  setEditableOrders,
  handleCellChange,
  buildUpdatePayload,
  setIsLoading,
  onTimeSlotClick,
  orderData,
  setOrderData,
  showTimeSlotTable,
  timeSlotTable,
  setTimeSlotTable,
  showTimeSlotModal,
  slotData,
  selectedSlot,
  setSelectedSlot,
  setShowTimeSlotModal,
  validateOrders,
  errors,
  OrdersValidator,
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
    // "Action",
    // "Crew Earnings",
    // "BLMS Earnings",
  ];

  const tableSource = isEditMode ? editableOrders : crewOrdersListData;

  const listData = CrewOrdersTableData(tableSource, selectedPage, size, waiver);

  console.log("netSettlement>>>", netSettlement);
  console.log(crewOrdersListData);
  console.log("Order Data in comp", orderData);

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

          <div className="details-list-top-left-dropdown"></div>
        </div>
        <div className="details-list-top-right"></div>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <Button
          className="order-info-receipt-btn"
          name={"Generate Statement"}
          onClick={generateStatement}
          // isInvalid={crewOrdersListData.length === 0}
        />
      </div>
      <div className="net-settlement mb-4 text-start">
        <h4 style={{ marginLeft: "15px" }}>
          Settlement Amount:{" "}
          <span
            style={{
              color: Number(netSettlement) < 0 ? "red" : "green",
              fontWeight: "bold",
            }}
          >
            {netSettlement}
          </span>
        </h4>
      </div>
      {listData?.length > 0 && (
        <div style={{ marginBottom: "12px", textAlign: "right" }}>
          {!isEditMode ? (
            <Button
              name="Edit"
              onClick={() => setIsEditMode(true)}
              style={{
                backgroundColor: "#FD8D82",
                color: "white",
                padding: "8px 30px",
                border: "2px solid",
                borderRadius: "10px",
                marginRight: "5px",
              }}
            />
          ) : (
            <>
              <Button
                style={{
                  backgroundColor: "#FD8D82",
                  color: "white",
                  padding: "8px 30px",
                  border: "2px solid",
                  borderRadius: "10px",
                  marginRight: "5px",
                }}
                name="Save"
                onClick={async () => {
                  try {
                    if (!OrdersValidator()) return;
                    const payload = buildUpdatePayload();
                    console.log("Updating orders payload:", payload);
                    if (payload.length === 0) return;
                    await CrewOrdersUpdate(payload, setIsLoading);

                    setCrewOrdersListData([...editableOrders]);

                    let newNetSettlement = 0;

                    editableOrders.forEach((item: any) => {
                      const order_amount = Number(item?.cashless ?? "0")
                        ? item.cashless
                        : item?.cash;

                      const calWaiver =
                        waiver > 0 && waiver <= 100 ? waiver : 10;

                      if (Number(item?.cashless ?? 0)) {
                        newNetSettlement += item.has_waiver
                          ? Number(order_amount)
                          : (Number(order_amount) * (100 - calWaiver)) / 100;
                      } else {
                        newNetSettlement += item.has_waiver
                          ? 0
                          : (-1 * Number(order_amount) * calWaiver) / 100;
                      }

                      if (
                        item?.materials_fee &&
                        Number(item?.materials_fee) !== 0 &&
                        item?.actual_payment_mode === "cashless"
                      ) {
                        newNetSettlement += Number(item?.materials_fee);
                      }
                    });

                    setNetSettlement(newNetSettlement.toFixed(2));
                    setIsEditMode(false);
                  } catch (error) {
                    console.error("Failed to update crew orders", error);
                  }
                }}
              />

              <Button
                name="Cancel"
                onClick={() => setIsEditMode(false)}
                style={{
                  backgroundColor: "#FD8D82",
                  color: "white",
                  padding: "8px 30px",
                  border: "2px solid",
                  borderRadius: "10px",
                  marginRight: "5px",
                }}
              />
            </>
          )}
        </div>
      )}

      <div className="details-list-table">
        <TableComp
          isLoading={false}
          listHeaderData={headerData}
          listData={listData}
          isEditMode={isEditMode}
          onCellChange={handleCellChange}
          onTimeSlotClick={onTimeSlotClick}
          // onEditHandler={onEditHandler}
          showTimeSlotTable={showTimeSlotTable}
        />
      </div>
      {/* {timeSlotTable ? <EditTimeSlot /> : null} */}
      {showTimeSlotModal &&
        (() => {
          const updatedOrder = editableOrders.find(
            (order: any) => order.order_id === slotData?.order_id,
          );

          const mergedItem = {
            ...slotData, // keeps first_slot, last_slot, timing_of_each_slot
            ...updatedOrder, // overrides time_slot if edited
          };

          return (
            <EditTimeSlot
              item={mergedItem}
              selectedSlot={selectedSlot}
              orderId={slotData?.order_id}
              editableOrders={editableOrders}
              setEditableOrders={setEditableOrders}
              onClose={() => setShowTimeSlotModal(false)}
            />
          );
        })()}
    </div>
  );
}

export default COComponent;
