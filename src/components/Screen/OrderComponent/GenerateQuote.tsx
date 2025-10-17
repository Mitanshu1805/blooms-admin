import moment from "moment";
import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import ReactToPrint from "react-to-print";
import { ArticleLoader, Image } from "../..";
import { QuoteHeader, ReceiptFooter } from "../../../assets";
import Button from "../../Button/Button";
import EditableField from "./EditableField";
import ServiceQuote from "./ServiceQuote";
import QuoteMultiImagePicker from "./QuoteMultiImagePicker";
import AutoResizeTextarea from "../../InputText/AutoResizeTextArea";

const Quote = ({
  openQuote,
  setOpenQuote,
  item,
  isPreview,
  setIsPreview,
  isLoading,
  quoteRef,
  isSTEditing,
  setIsSTEditing,
  isEditing,
  setIsEditing,
  handleUploadOrder,
  printDocument,
  handleGeneratePreview,
}: any) => {
  const [quoteData, setQuoteData] = useState({
    date: moment().toString(),
    quote_id: "quote-" + (item?.oid ?? ""),
    service: item?.service_name,
    crew: "",
    amount: "",
    scope: "",
    amount_paid: item?.order_amount,
    images: [],
    remarks: "",
  });

  return (
    <>
      <div className="popup-box-wrapper">
        <div className="receipt-box">
          <div className="receipt">
            <div className="header-main-div">
              <Image
                style={{ height: "100%", width: "100%" }}
                src={QuoteHeader}
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
                      value={moment(quoteData?.date).format(
                        "dddd, MMM DD, YYYY, hh:mm a"
                      )}
                      label="Date"
                    />
                    <EditableField
                      value={quoteData?.quote_id}
                      label="Quote ID"
                    />
                    <EditableField value={quoteData?.service} label="Service" />
                    <EditableField value={quoteData?.crew} label="Crew" />
                    <EditableField
                      value={quoteData?.amount}
                      label="Quote Amt"
                    />
                    <div className="quote-title-container">
                      <span>Scope</span>
                    </div>
                    <div className="edit-text-div input-border m-0">
                      <span
                        className="content-details-title"
                        style={{ whiteSpace: "pre-wrap" }}
                      >
                        {quoteData?.scope}
                      </span>
                    </div>
                    <div className="quote-title-container">
                      <span>Image Attachments</span>
                    </div>
                    <div className="quote-img-section">
                      {quoteData.images.map((image: any, index: number) => (
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Image ${index + 1}`}
                        />
                      ))}
                    </div>
                    <div className="quote-title-container">
                      <span>Remarks</span>
                    </div>
                    <div className="edit-text-div input-border m-0">
                      <span
                        className="content-details-title"
                        style={{ whiteSpace: "pre-wrap" }}
                      >
                        {quoteData?.remarks}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="content-div">
                    <div className="content-details-div">
                      <strong className="content-details-label">
                        {"Date"}
                      </strong>
                      <div className="editable-div">
                        :
                        <div className="margin-div">
                          <DateTimePicker
                            className={"content-details-input"}
                            clearIcon={null}
                            format="y-MM-dd h:mm a"
                            onChange={(value: any) => {
                              setQuoteData((prevValue: any) => ({
                                ...prevValue,
                                date: moment(value).toISOString(),
                              }));
                            }}
                            value={quoteData?.date}
                          />
                        </div>
                      </div>
                    </div>
                    <EditableField
                      value={quoteData.quote_id}
                      label="Quote ID"
                      editable={true}
                      isEditing={true}
                      setIsEditing={setIsEditing}
                    />
                    <EditableField
                      value={quoteData.service}
                      label="Service"
                      onInputChange={(e: any) => {
                        setQuoteData((prevValue: any) => ({
                          ...prevValue,
                          service_type: e.target.value,
                        }));
                      }}
                      editable={true}
                      isEditing={true}
                      setIsEditing={setIsEditing}
                    />
                    <EditableField
                      value={quoteData.crew}
                      label="Crew"
                      editable={true}
                      isEditing={true}
                      setIsEditing={setIsEditing}
                      onInputChange={(e: any) => {
                        setQuoteData((prevValue: any) => ({
                          ...prevValue,
                          crew: e.target.value,
                        }));
                      }}
                    />
                    <EditableField
                      value={quoteData.amount}
                      label="Quote Amt"
                      editable={true}
                      isEditing={true}
                      setIsEditing={setIsEditing}
                      onInputChange={(e: any) => {
                        setQuoteData((prevValue: any) => ({
                          ...prevValue,
                          amount: e.target.value,
                        }));
                      }}
                    />
                    {/* <EditableField
                      value={quoteData.scope}
                      label="Scope"
                      editable={true}
                      isEditing={true}
                      setIsEditing={setIsEditing}
                      onInputChange={(e: any) => {
                        setQuoteData((prevValue: any) => ({
                          ...prevValue,
                          scope: e.target.value,
                        }));
                      }}
                    /> */}
                    <AutoResizeTextarea
                      label="Scope"
                      className="custom-textarea"
                      value={quoteData?.scope}
                      placeholder="Scope"
                      onChange={(e: any) => {
                        setQuoteData((prevValue: any) => ({
                          ...prevValue,
                          scope: e.target.value,
                        }));
                      }}
                    />
                    {/* <EditableField
                      value={quoteData?.remarks}
                      label="Remarks"
                      editable={true}
                      isEditing={true}
                      setIsEditing={setIsEditing}
                      onInputChange={(e: any) => {
                        setQuoteData((prevValue: any) => ({
                          ...prevValue,
                          remarks: e.target.value,
                        }));
                      }}
                    /> */}
                    <AutoResizeTextarea
                      label="Remarks"
                      className="custom-textarea mb-3"
                      value={quoteData?.remarks}
                      placeholder="Remarks"
                      onChange={(e: any) => {
                        setQuoteData((prevValue: any) => ({
                          ...prevValue,
                          remarks: e.target.value,
                        }));
                      }}
                    />
                    <QuoteMultiImagePicker
                      selectedImages={quoteData.images}
                      setSelectedImages={(images: any) =>
                        setQuoteData((prevState) => ({
                          ...prevState,
                          images: images,
                        }))
                      }
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
                      content={() => quoteRef.current}
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
                setOpenQuote(!openQuote);
                setIsPreview(false);
              }}
            />
          </div>
        </div>
      </div>
      <div style={{ width: "1130px" }}>
        <ServiceQuote quoteRef={quoteRef} item={item} quoteData={quoteData} />
      </div>
    </>
  );
};

export default Quote;
