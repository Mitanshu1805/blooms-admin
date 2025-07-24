import moment from "moment";
import {
  AssignCrew,
  Button,
  ButtonGroup,
  Input,
  LotiFiles,
  MultiAccordion,
  SingleAccordion,
  TableComp,
  TableLoader,
} from "../../components";
import { OrderDetailsTableData } from "./OrderDetailsTableData";
import DateTimePicker from "react-datetime-picker";
import SwitchComponent from "../../components/Toggle/Toggle";

interface ODProps {
  isLoading: boolean;
  AmountSubmitHandler: () => void;
  AssignCrewFormSubmitHandler: () => void;
  item: any;
  handleButtonClick: (value: any) => void;
  detailsData: any;
  setDetailsData: (value: any) => void;
  NotReplySubmitHandler: () => void;
  openReceipt: boolean;
  setOpenReceipt: (value: boolean) => void;
  openQuote: boolean;
  setOpenQuote: React.Dispatch<React.SetStateAction<boolean>>;
  toggleOrderDetailsPopup: (value: any, val: any) => void;
  toggleMultiFile: (value: boolean) => void;
  ratesDropA: (val: any) => void;
  isInvoiceOpen: boolean;
  setIsInvoiceOpen: (val: boolean) => void;
  isQuoteOpen: boolean;
  setIsQuoteOpen: (val: boolean) => void;
  isOrderOpen: boolean;
  setIsOrderOpen: (val: boolean) => void;
  isOtherOpen: boolean;
  setIsOtherOpen: (val: boolean) => void;
  isAssignCrew: boolean;
  toggleAssignCrew: (val: boolean) => void;
  isReviewOpen: boolean;
  setIsReviewOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSelectedTimeSlots: (val: any) => void;
  toggleTimeSlotEdit: () => void;
  updateTimeSlotValue: (val: any) => void;
  onEditDone: () => void;
  toggleMobileShow: () => void;
  onEditCancel: () => void;
  timeCrew: any;
  bookSlot: any;
  order_id: string;
  isTimeSlotEdit: boolean;
  timeSlotValue: string;
  handleWaiverToggle: (val: boolean) => void;
}

function ODComponent({
  isLoading,
  handleButtonClick,
  item,
  setDetailsData,
  detailsData,
  AmountSubmitHandler,
  openReceipt,
  NotReplySubmitHandler,
  isInvoiceOpen,
  setIsInvoiceOpen,
  isQuoteOpen,
  setIsQuoteOpen,
  isOrderOpen,
  setIsOrderOpen,
  isOtherOpen,
  ratesDropA,
  toggleMultiFile,
  toggleOrderDetailsPopup,
  setIsOtherOpen,
  setOpenReceipt,
  isAssignCrew,
  toggleAssignCrew,
  AssignCrewFormSubmitHandler,
  timeCrew,
  handleSelectedTimeSlots,
  toggleTimeSlotEdit,
  updateTimeSlotValue,
  onEditDone,
  onEditCancel,
  openQuote,
  setOpenQuote,
  toggleMobileShow,
  bookSlot,
  order_id,
  isTimeSlotEdit,
  timeSlotValue,
  isReviewOpen,
  setIsReviewOpen,
  handleWaiverToggle,
}: ODProps) {
  const HeaderData = [
    "No",
    "Price Label",
    "Price ",
    "Property Label",
    "Property Price",
    "Label",
    "Quantity",
    "Order Label",
    "Base",
    "Quantity Label",
    "Amount",
  ];

  const listData = OrderDetailsTableData(item);
  console.log("🚀 => item?.other_document:", item?.other_document);
  const LeftOrderDetailsData = [
    { label: "Contact Person", title: item?.contact_person },
    { label: "Contact no.", title: item?.contact_no },
    { label: "Block No.", title: item?.block },
    { label: "Street Address", title: item?.address },
    { label: "Unit No.", title: item?.unit },
    { label: "Constituency", title: item?.city },
    { label: "Country", title: item?.location_name },
    { label: "Note", title: item?.note },
  ];

  const RightOrderDetailsData = [
    { label: "Order ID", title: item?.oid },
    {
      label: "Time slot",
      title: timeSlotValue,
    },
    {
      label: "Payment Method (old)",
      title: `${item?.payment_mode ?? "NA"} / ${item?.paid ?? "NA"}`,
      labelTwo: "Type",
      titleTwo: item?.payment_mode,
      labelThree: "Paid",
      titleThree: item?.paid,
    },
    { label: "Payment in cash", title: item?.cash },
    { label: "Payment in cashless", title: item?.cashless },
    { label: "Materials Fee", title: item?.materials_fee },
    { label: "Assigned Crew", title: item?.crew_name },
    { label: "Order Status", title: item?.order_status },
    { label: "Order Amount", title: item?.order_amount },
    { label: "Discount Code", title: item?.discount_code },
    {
      label: "Pink Discount",
      title: item?.created_at_pink ? item?.pink_date_discount : null,
    },
    { label: "Reply Note", title: item?.note_reply },
    { label: "Job complete report", title: item?.job_complete_report },
  ];
  console.log("RightOrderDetailsData >> ", RightOrderDetailsData);

  const renderNewOrderDetails = () => (
    <div className="od-details-container row">
      <div className="col-md-12 od-customer-info ">
        <div className="od-details-title">
          <span>Customer Info</span>
        </div>
        <div className="od-customer-info-container">
          {LeftOrderDetailsData.map((mapItem: any, index: number) => (
            <div key={index} className="d-flex">
              <div className="od-customer-info-container-item-label">
                <span>{mapItem.label}</span>
              </div>
              <span>:</span>
              <div className="od-customer-info-container-item-title row">
                <span className={index === 1 ? "col-md-6" : undefined}>
                  {mapItem.label === "Unit" && mapItem.title === "0"
                    ? "-"
                    : mapItem.title}
                </span>
                {index === 1 ? (
                  <Button
                    onClick={toggleMobileShow}
                    name={
                      item?.is_mobile_hidden ? "Show to crew" : "Hide from crew"
                    }
                    className="order-info-mobile-toggle-btn"
                  />
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="col-md-12 od-customer-info ">
        <div className="od-details-title">
          <span>Service Info</span>
        </div>
        <div className="od-customer-info-container">
          {RightOrderDetailsData.map((item: any, index: number) => (
            <div key={index} className="d-flex">
              <div className="od-customer-info-container-item-label">
                <span>{item.label}</span>
              </div>
              <span>:</span>
              <div className="od-customer-info-container-item-title">
                {isTimeSlotEdit && item?.label === "Time slot" ? (
                  <DateTimePicker
                    className={"content-details-input"}
                    clearIcon={null}
                    format="y-MM-dd h:mm a"
                    onChange={updateTimeSlotValue}
                    value={item?.title}
                  />
                ) : (
                  <span>
                    {item?.title
                      ? item?.label === "Time slot"
                        ? moment
                            .utc(item?.title)
                            .format("dddd, MMMM Do YYYY, h:mm:ss A")
                        : item?.title
                      : "-"}
                  </span>
                )}
                {item?.label === "Time slot" && !isTimeSlotEdit ? (
                  <div className="" onClick={toggleTimeSlotEdit}>
                    <i className="bx bx-edit-alt icon-primary-color" />
                    {/* <i className='bx bx-check icon-primary-color' /> */}
                  </div>
                ) : null}
                {item?.label === "Time slot" && isTimeSlotEdit ? (
                  <>
                    <div className="" onClick={onEditDone}>
                      <i className="bx bx-check icon-primary-color" />
                    </div>
                    <div className="" onClick={onEditCancel}>
                      <i className="bx bx-x icon-primary-color" />
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
      {item?.order_status !== "Complete" ? (
        <div className="row">
          <div className="col-md-6">
            <div className="d-flex align-items-center">
              <Input
                className={"od-text-input"}
                style={{ width: "100%" }}
                label="Reply Note"
                type="text"
                placeholder="Reply Note"
                value={detailsData.note_reply}
                onChange={(e: any) => {
                  setDetailsData((prevValue: any) => ({
                    ...prevValue,
                    note_reply: e.target.value,
                  }));
                }}
              />
              <Button
                className="order-info-submit-btn"
                name={"Add"}
                onClick={() => {
                  if (detailsData.note_reply) {
                    NotReplySubmitHandler();
                  }
                }}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex align-items-center">
              <Input
                className={"od-text-input"}
                style={{ width: "100%" }}
                label={`Amount To Charge (${item.currency})`}
                type="text"
                placeholder="Amount"
                value={detailsData.order_amount}
                onChange={(e: any) => {
                  setDetailsData((prevValue: any) => ({
                    ...prevValue,
                    order_amount: e.target.value,
                  }));
                }}
              />
              <Button
                className="order-info-submit-btn"
                name={"Add"}
                onClick={() => {
                  if (detailsData.order_amount) {
                    AmountSubmitHandler();
                  }
                }}
              />
            </div>
          </div>
          {/* {item?.payment_mode === "card-payment" ? (
                              <div className="right-input-div">
                                <Input
                                  style={{ width: "250px" }}
                                  label="Charge Amount (Card Payment)"
                                  type="text"
                                  placeholder="Amount"
                                  value={item?.order_amount}
                                />
                                <Button
                                  className="order-info-submit-btn"
                                  name={"Add"}
                                  onClick={() => {
                                    if (detailsData.order_amount) {
                                      CardAmountSubmitHandler();
                                    }
                                  }}
                                />
                              </div>
                            ) : null} */}
        </div>
      ) : null}
      <div className="od-main-btn-div">
        <ButtonGroup
          handleButtonClick={handleButtonClick}
          order_status={item.order_status}
        />
      </div>
    </div>
  );

  return (
    <div className="details-list-card card">
      <div className="details-list-top">
        <div className="details-list-top-left">
          <span className="details-list-top-left-title">ORDER DETAILS</span>
        </div>
        <div className="details-list-top-right">
          <Button
            className="details-list-btn"
            name={"Assign Crew"}
            onClick={toggleAssignCrew}
          />
        </div>
      </div>
      {isLoading ? (
        <TableLoader />
      ) : (
        <div>
          {item ? (
            <div>
              <div
                className="flex-col-div card-class"
                style={{ marginTop: "1rem", marginBottom: "1rem" }}
              >
                {renderNewOrderDetails()}
                <div className="order-container">
                  <div className="editable-div">
                    <Button
                      className="order-info-receipt-btn"
                      name={"Generate Receipt"}
                      onClick={() => {
                        setOpenReceipt(!openReceipt);
                        ratesDropA(item?.service_id);
                      }}
                    />
                    <Button
                      className="order-info-receipt-btn"
                      name={"Generate Quotes"}
                      onClick={() => {
                        setOpenQuote((prevState: boolean) => !prevState);
                        // ratesDropA(item?.service_id);
                      }}
                    />
                    <SwitchComponent
                      waiver={item?.has_waiver}
                      handleWaiverToggle={handleWaiverToggle}
                    />
                  </div>
                </div>
              </div>
              <SingleAccordion
                name={"Receipt & Invoice"}
                active={isInvoiceOpen}
                onClick={() => setIsInvoiceOpen(!isInvoiceOpen)}
                item={item?.invoice}
                label={"invoice"}
                toggleOrderDetailsPopup={toggleOrderDetailsPopup}
              />
              <SingleAccordion
                name={"Quote"}
                active={isQuoteOpen}
                onClick={() => setIsQuoteOpen(!isQuoteOpen)}
                item={item?.quote}
                label={"quote"}
                toggleOrderDetailsPopup={toggleOrderDetailsPopup}
              />
              <MultiAccordion
                name={"Order Images"}
                active={isOrderOpen}
                onClick={() => setIsOrderOpen(!isOrderOpen)}
                item={item?.order_images}
                label={"order_images"}
                toggleOrderDetailsPopup={toggleOrderDetailsPopup}
              />
              <MultiAccordion
                name={"Other Document (Uploaded from Crew)"}
                active={isOtherOpen}
                onClick={() => setIsOtherOpen(!isOtherOpen)}
                item={item?.other_document}
                label={"other_document"}
                toggleOrderDetailsPopup={toggleOrderDetailsPopup}
              />
              <SingleAccordion
                name={"Review image (Uploaded from Crew)"}
                active={isReviewOpen}
                onClick={() => setIsReviewOpen((prevState) => !prevState)}
                item={item?.review_images}
                label={"review_images"}
                toggleOrderDetailsPopup={toggleOrderDetailsPopup}
              />
              <div className="details-list-table">
                <TableComp
                  isLoading={isLoading}
                  listHeaderData={HeaderData}
                  listData={listData}
                />
              </div>
            </div>
          ) : (
            <LotiFiles message={"No Data Found!"} />
          )}
        </div>
      )}
      {isAssignCrew ? (
        <AssignCrew
          isLoading={isLoading}
          AssignCrewFormSubmitHandler={AssignCrewFormSubmitHandler}
          toggleAssignCrew={toggleAssignCrew}
          timeCrew={timeCrew}
          handleSelectedTimeSlots={handleSelectedTimeSlots}
          bookSlot={bookSlot}
          order_id={order_id}
          item={item}
          timeSlotValue={timeSlotValue}
        />
      ) : null}
    </div>
  );
}

export default ODComponent;
