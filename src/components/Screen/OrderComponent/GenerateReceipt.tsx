import ReactToPrint from "react-to-print";
import { ArticleLoader, Image, RatesSection } from "../..";
import Button from "../../Button/Button";
import EditableField from "./EditableField";
import ServiceReceipt from "./ServiceReceipt";
import { ReceiptFooter, ReceiptHeader } from "../../../assets";
import { useState } from "react";
import moment from "moment";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

const Receipt = ({
  openReceipt,
  setOpenReceipt,
  item,
  ratesDropList,
  isPreview,
  setIsPreview,
  isLoading,
  receiptRef,
  isSDEditing,
  setIsSDEditing,
  isSTEditing,
  setIsSTEditing,
  isEditing,
  setIsEditing,
  handleUploadOrder,
  printDocument,
  handleGeneratePreview,
}: any) => {
  const formattedArray = item?.items?.map(
    (cost: any) =>
      `${cost?.order_label ? cost?.order_label : ""} x ${
        cost?.quantity ? cost?.quantity : 0
      } : ${cost?.amount ? cost?.amount : 0}`
  );

  const [dropdownValues, setDropdownValues] = useState(
    formattedArray ? formattedArray : [""]
  );
  const [receiptData, setReceiptData] = useState({
    service_date: item?.time_slot,
    service_type: item?.service_name,
    service_duration: "",
    charges: item?.order_amount,
    amount_paid: item?.order_amount,
    remarks: "",
  });

  const prevCom = [
    { label: "Charges", title: receiptData?.charges },
    { label: "Amount Paid", title: receiptData?.amount_paid },
    { label: "Remarks", title: receiptData?.remarks },
  ];

  return (
    <>
      <div className="popup-box-wrapper">
        <div className="receipt-box">
          <div className="receipt">
            <div className="header-main-div">
              <Image
                style={{ height: "100%", width: "100%" }}
                src={ReceiptHeader}
              />
            </div>
            {isLoading ? (
              <ArticleLoader />
            ) : (
              <div className="content-main-div">
                <div className="content-text-div">
                  <span className="content-text-one">
                    {item?.contact_person},
                  </span>
                  <span className="content-text-one">
                    thanks for blooming with us
                  </span>
                  <span className="content-text-three">{item?.address} </span>
                </div>
                {isPreview ? (
                  <div className="content-div">
                    <EditableField
                      value={moment(receiptData?.service_date).format(
                        "dddd, MMM DD, YYYY, hh:mm a"
                      )}
                      label="Service Date"
                    />
                    <EditableField value={item.oid} label="Order ID" />
                    <EditableField
                      value={receiptData?.service_type}
                      label="Service Type"
                    />
                    <div className="content-details-rates-div">
                      <strong className="content-details-label">Rates </strong>
                      <div className="flex-col-div">
                        {dropdownValues?.map((item: any) => (
                          <div className="content-details-multi-title">
                            : {item}
                          </div>
                        ))}
                      </div>
                    </div>
                    <EditableField
                      value={receiptData?.service_duration}
                      label="Service Duration"
                    />
                    {prevCom?.map((subitem: any) => (
                      <div className="content-details-div">
                        <strong className="content-details-label">
                          {subitem.label}
                        </strong>
                        <div className="edit-text-div">
                          :
                          {/* <span className="content-details-title input-border">
                            {subitem.title}
                          </span>{" "} */}
                          <span
                            className={`content-details-title input-border ${
                              subitem.label === "Remarks"
                                ? "remarks-preview"
                                : ""
                            }`}
                          >
                            {subitem.title}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="content-div">
                    <div className="content-details-div">
                      <strong className="content-details-label">
                        {"Service Date"}
                      </strong>
                      <div className="editable-div">
                        :
                        <div className="margin-div">
                          <DateTimePicker
                            className={"content-details-input"}
                            clearIcon={null}
                            format="y-MM-dd h:mm a"
                            onChange={(value: any) => {
                              setReceiptData((prevValue: any) => ({
                                ...prevValue,
                                service_date: moment(value).toISOString(),
                              }));
                            }}
                            value={receiptData?.service_date}
                          />
                        </div>
                      </div>
                    </div>
                    <EditableField
                      value={item.oid}
                      label="Order ID"
                      editable={false}
                      isEditing={isSTEditing}
                      setIsEditing={setIsSTEditing}
                    />
                    <EditableField
                      value={receiptData.service_type}
                      label="Service Type"
                      onInputChange={(e: any) => {
                        setReceiptData((prevValue: any) => ({
                          ...prevValue,
                          service_type: e.target.value,
                        }));
                      }}
                      editable={true}
                      isEditing={isEditing}
                      setIsEditing={setIsEditing}
                    />
                    <RatesSection
                      ratesDropList={ratesDropList}
                      dropdownValues={dropdownValues}
                      setDropdownValues={setDropdownValues}
                    />
                    <EditableField
                      value={receiptData.service_duration}
                      label="Service Duration"
                      editable={true}
                      isEditing={true}
                      setIsEditing={setIsEditing}
                      onInputChange={(e: any) => {
                        setReceiptData((prevValue: any) => ({
                          ...prevValue,
                          service_duration: e.target.value,
                        }));
                      }}
                    />
                    <EditableField
                      value={receiptData.charges}
                      label="Charges"
                      editable={true}
                      isEditing={true}
                      setIsEditing={setIsEditing}
                      onInputChange={(e: any) => {
                        setReceiptData((prevValue: any) => ({
                          ...prevValue,
                          charges: e.target.value,
                        }));
                      }}
                    />
                    <EditableField
                      value={receiptData?.amount_paid}
                      label="Amount Paid"
                      editable={true}
                      isEditing={true}
                      setIsEditing={setIsEditing}
                      onInputChange={(e: any) => {
                        setReceiptData((prevValue: any) => ({
                          ...prevValue,
                          amount_paid: e.target.value,
                        }));
                      }}
                    />
                    <EditableField
                      value={receiptData?.remarks}
                      label="Remarks"
                      editable={true}
                      isEditing={true}
                      setIsEditing={setIsEditing}
                      onInputChange={(e: any) => {
                        setReceiptData((prevValue: any) => ({
                          ...prevValue,
                          remarks: e.target.value,
                        }));
                      }}
                    />
                  </div>
                )}
                {isPreview ? (
                  <div className="btn-div">
                    <Button
                      className="receipt-preview-btn"
                      name="Back to Generate"
                      onClick={() => setIsPreview(!isPreview)}
                    />
                    <Button
                      className="receipt-preview-btn"
                      name="Upload to Order"
                      onClick={handleUploadOrder}
                    />
                    <ReactToPrint
                      trigger={() => (
                        <Button
                          className="receipt-preview-btn"
                          name="Print"
                          onClick={printDocument}
                        />
                      )}
                      content={() => receiptRef.current}
                      removeAfterPrint={true}
                    />
                  </div>
                ) : (
                  <div className="btn-div">
                    <Button
                      className="order-info-receipt-btn"
                      name="Generate Preview"
                      onClick={handleGeneratePreview}
                    />
                  </div>
                )}
              </div>
            )}
            <div className="footer-main-div">
              <Image
                style={{ height: "100%", width: "100%" }}
                src={ReceiptFooter}
              />
            </div>
          </div>
          <div className="flex-row-cen-cen-div only-margin-top only-margin-bottom">
            <Button
              className="add-details-cancel-btn"
              name="Close"
              onClick={() => {
                setOpenReceipt(!openReceipt);
                setIsPreview(false);
              }}
            />
          </div>
        </div>
      </div>
      <div style={{ width: "1130px" }}>
        <ServiceReceipt
          receiptRef={receiptRef}
          item={item}
          receiptData={receiptData}
          dropdownValues={dropdownValues}
        />
      </div>
    </>
  );
};

export default Receipt;
