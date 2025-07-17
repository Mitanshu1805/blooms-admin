import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  DeletePopup,
  GenerateQuote,
  GenerateReceipt,
  UploadMultipleFiles,
} from "../../components";
import { DeleteOrder } from "../Order/OrderApis";
import {
  BookTimeSlotCrewA,
  CardAmountCharge,
  InvoiceImageDelete,
  MultiFileUploadA,
  OrderAmount,
  OrderImageDelete,
  OrderItem,
  OrderMobileShow,
  OrderNoteReply,
  OrderStatus,
  OrderTimeslot,
  OrderWaiver,
  OtherImageDelete,
  QuoteImageDelete,
  QuoteUpload,
  RatesDropDownA,
  ReceiptUploadA,
  TimeSlotCrewListA,
} from "./ODApis";
import ODComponent from "./ODComponent";
import * as htmlToImage from "html-to-image";
import { saveAs } from "file-saver";
import { AlertType, alertService } from "../../utils/alert.service";
import moment from "moment";

function ODController() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [item, setItem] = useState<any>([]);
  const [detailsData, setDetailsData] = useState({
    note_reply: "",
    order_amount: "",
  });
  const [files, setFiles] = useState<any>([]);
  const [ratesDropList, setRatesDropList] = useState<any>([]);
  const [timeCrew, setTimeCrew] = useState<any>([]);
  const [bookSlot, setBookSlot] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [openDeleteOrderPop, setOpenDeleteOrderPop] = useState(false);
  const [openReceipt, setOpenReceipt] = useState(false);
  const [openQuote, setOpenQuote] = useState(false);
  const [openMultiFilePop, setOpenMultiFilePop] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [isOtherOpen, setIsOtherOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSDEditing, setIsSDEditing] = useState(false);
  const [isSTEditing, setIsSTEditing] = useState(false);
  const [isAssignCrew, setIsAssignCrew] = useState(false);
  const [isOrderDetailsDeletePop, setIsOrderDetailsDeletePop] = useState(false);
  const [orderDetailsDeleteValue, setOrderDetailsDeleteValue] = useState({
    subitem: null,
    key: null,
  });
  const [isTimeSlotEdit, setIsTimeSlotEdit] = useState(false);
  const [timeSlotValue, setTimeSlotValue] = useState("");
  const [waiverStatus, setWaiverStatus] = useState(false);

  const receiptRef: any = useRef(null);
  const quoteRef: any = useRef(null);

  useEffect(() => {
    orderItemDataA();
  }, []);

  useEffect(() => {
    setDetailsData({
      order_amount: item?.order_amount,
      note_reply: item.note_reply,
    });
    setWaiverStatus(item.has_waiver);
  }, [item]);

  const orderItemDataA = async () => {
    const itemDataResponse: any = await OrderItem(
      state?.data?.order_id,
      setIsLoading
    );
    setItem(itemDataResponse?.data?.data);
    setTimeSlotValue(itemDataResponse?.data?.data?.time_slot);
  };

  const toggleDeletePopup = () => {
    setOpenDeleteOrderPop(!openDeleteOrderPop);
  };

  const DeleteOrderApi = async () => {
    const response = await DeleteOrder(item, setIsLoading);
    if (response?.status === 200) {
      toggleDeletePopup();
      navigate("/orders");
    }
  };

  const AmountSubmitHandler = async () => {
    if (item?.payment_mode === "card-payment") {
      const response = await CardAmountCharge(
        item.order_id,
        detailsData.order_amount,
        setIsLoading
      );
      if (response?.status === 201 || 200) {
        orderItemDataA();
        setDetailsData({
          note_reply: detailsData?.note_reply,
          order_amount: detailsData?.order_amount,
        });
      }
    }
    const response = await OrderAmount(
      detailsData.order_amount,
      item?.order_id,
      item?.client_id,
      setIsLoading
    );
    if (response?.status === 201 || 200) {
      orderItemDataA();
      setDetailsData({
        note_reply: detailsData.note_reply,
        order_amount: detailsData?.order_amount,
      });
    }
  };

  const updateTimeSlotHandler = async () => {
    const response = await OrderTimeslot(
      moment(timeSlotValue).format("YYYY-MM-DDTHH:mm:ss"),
      item?.order_id,
      item?.client_id,
      setIsLoading
    );
    if (response?.status === 201 || 200) {
      orderItemDataA();
    }
  };
  const updateMobileShowHandler = async () => {
    const response = await OrderMobileShow(
      item?.order_id,
      !item?.is_mobile_hidden,
      setIsLoading
    );
    if (response?.status === 201 || 200) {
      orderItemDataA();
    }
  };

  const NotReplySubmitHandler = async () => {
    const response = await OrderNoteReply(
      detailsData.note_reply,
      item?.order_id,
      item?.client_id,
      setIsLoading
    );
    if (response?.status === 201 || 200) {
      orderItemDataA();
      setDetailsData({
        note_reply: "",
        order_amount: detailsData.order_amount,
      });
    }
  };

  const OrderStatusHandler = async (buttonName: string) => {
    const response = await OrderStatus(
      buttonName,
      item?.order_id,
      item?.client_id,
      setIsLoading
    );
    if (response?.status === 201 || 200) {
      orderItemDataA();
    }
  };

  const ImageDeleteSubmitHandler = async () => {
    if (orderDetailsDeleteValue?.key === "invoice") {
      const response = await InvoiceImageDelete(
        orderDetailsDeleteValue?.subitem,
        item?.order_id,
        setIsLoading
      );
      if (response?.status === 200) {
        orderItemDataA();
        toggleOrderDetailsPopup();
      }
    }
    if (orderDetailsDeleteValue?.key === "quote") {
      const response = await QuoteImageDelete(
        orderDetailsDeleteValue?.subitem,
        item?.order_id,
        setIsLoading
      );
      if (response?.status === 200) {
        orderItemDataA();
        toggleOrderDetailsPopup();
      }
    }
    if (orderDetailsDeleteValue?.key === "order_images") {
      const response = await OrderImageDelete(
        orderDetailsDeleteValue?.subitem,
        item?.order_id,
        setIsLoading
      );
      if (response?.status === 200) {
        orderItemDataA();
        toggleOrderDetailsPopup();
      }
    }
    if (orderDetailsDeleteValue?.key === "other_document") {
      const response = await OtherImageDelete(
        orderDetailsDeleteValue?.subitem,
        item?.order_id,
        setIsLoading
      );
      if (response?.status === 200) {
        orderItemDataA();
        toggleOrderDetailsPopup();
      }
    }
  };

  const ratesDropA = async (service_id: any) => {
    const itemDataResponse: any = await RatesDropDownA(
      service_id,
      setIsLoading
    );
    const itemData = itemDataResponse?.data;
    const updatedData = itemData?.data?.map((option: any) => ({
      value: option.order_label,
      label: option.order_label,
    }));
    setRatesDropList(updatedData);
  };

  const ReceiptUpload = async (dataUrl: any) => {
    const response = await ReceiptUploadA(
      dataUrl,
      item?.order_id,
      setIsLoading
    );
    if (response?.status === 201 || 200) {
      orderItemDataA();
      setOpenReceipt(!openReceipt);
      setIsPreview(false);
    }
  };
  const quoteUploadCall = async (dataUrl: any) => {
    const response = await QuoteUpload(dataUrl, item?.order_id, setIsLoading);
    if (response?.status === 201 || 200) {
      orderItemDataA();
      setOpenQuote((prevState) => !prevState);
      setIsPreview(false);
    }
  };

  const onDeleteHandler = () => {
    toggleDeletePopup();
  };

  const DeleteSubmitHandler = () => {
    DeleteOrderApi();
  };

  const handleButtonClick = (buttonName: any) => {
    if (buttonName === "Delete") {
      onDeleteHandler();
    } else if (buttonName === "Complete") {
      let crewAssigned = false;

      for (const crew of timeCrew) {
        if (
          crew.time_slots.some(
            (slot: any) => slot.order_id === state?.data?.order_id
          )
        ) {
          OrderStatusHandler(buttonName);
          crewAssigned = true;
          break;
        }
      }

      if (!crewAssigned) {
        alertService.alert({
          type: AlertType.Error,
          message: "Crew is not assigned",
        });
      }
    } else {
      OrderStatusHandler(buttonName);
    }
  };

  const toggleMultiFile = () => {
    setOpenMultiFilePop(!openMultiFilePop);
  };

  const handleUploadMultipleFilesSubmit = async () => {
    const response = await MultiFileUploadA(
      files,
      item?.order_id,
      setIsLoading
    );
    if (response?.status === 201 || response?.status === 200) {
      toggleMultiFile();
      orderItemDataA();
      setFiles([]);
    }
  };

  const handleGeneratePreview = () => {
    setIsPreview(true);
  };

  const handleUploadQuote = async () => {
    try {
      setIsLoading(true);
      const quoteContainer = quoteRef.current;

      if (!quoteContainer) {
        console.error("receiptRef.current is null");
        return;
      }

      quoteContainer.style.width = "auto";

      quoteContainer.scrollTo(0, 0);

      const dataUrl = await htmlToImage.toJpeg(quoteContainer, {
        quality: 0.9,
      });

      const blob = base64ToBlob(dataUrl);

      const file = new File([blob], "blooms-receipt.jpg", { type: blob.type });
      await quoteUploadCall(file);
    } catch (error) {
      console.error("Error generating preview:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadOrder = async () => {
    try {
      setIsLoading(true);
      const receiptContainer = receiptRef.current;

      if (!receiptContainer) {
        console.error("receiptRef.current is null");
        return;
      }

      receiptContainer.style.width = "auto";

      receiptContainer.scrollTo(0, 0);

      const dataUrl = await htmlToImage.toJpeg(receiptContainer, {
        quality: 0.9,
      });

      const blob = base64ToBlob(dataUrl);

      const file = new File([blob], "blooms-receipt.jpg", { type: blob.type });

      await ReceiptUpload(file);
    } catch (error) {
      console.error("Error generating preview:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const base64ToBlob = (base64: any) => {
    const byteString = atob(base64.split(",")[1]);
    const mimeString = base64.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  const printDocument = () => {
    window.print();
  };

  const CrewTimeSlotList = async () => {
    const itemDataResponse: any = await TimeSlotCrewListA(
      item?.time_slot,
      setIsLoading
    );

    const selectedCrew = itemDataResponse?.data?.find((findItem: any) =>
      findItem?.time_slots?.some(
        (someItem: any) => someItem.order_id === item?.order_id
      )
    );
    if (selectedCrew) {
      const selectedSlot = selectedCrew?.time_slots.find(
        (findItem: any) => findItem.order_id === item?.order_id
      );
      const selectedValue = {
        crew_id: selectedCrew?.crew_id,
        data: "cb",
        order_id: selectedSlot?.order_id,
        title: moment.utc(selectedSlot?.time_slot).format("HH:mm"),
      };

      handleSelectedTimeSlots(selectedValue);
    }
    setTimeCrew(itemDataResponse?.data);
  };

  const toggleAssignCrew = () => {
    setIsAssignCrew(!isAssignCrew);
    CrewTimeSlotList();
    setBookSlot("");
  };

  const handleSelectedTimeSlots = (j: any) => {
    if (
      j.title === "Territory" ||
      j.title === "Address" ||
      j.title === "Phone Number" ||
      j.title === "Crew Name" ||
      j.title === "No."
    ) {
      setBookSlot("");
    } else {
      setBookSlot(j);
    }
  };

  const AssignCrewFormSubmitHandler = async () => {
    const response = await BookTimeSlotCrewA(item, bookSlot, setIsLoading);
    if (response?.status === 200) {
      toggleAssignCrew();
      CrewTimeSlotList();
      orderItemDataA();
    }
  };

  const toggleOrderDetailsPopup = (subitem = null, key = null) => {
    setOrderDetailsDeleteValue({ subitem, key });
    setIsOrderDetailsDeletePop(!isOrderDetailsDeletePop);
  };

  const renderDeletePopup = (
    isOpen: boolean,
    isLoading: boolean,
    category: any,
    name: any,
    DeleteSubmitHandler: () => void,
    CancelDeleteSubmitHandler: () => void
  ) => {
    return isOpen ? (
      <DeletePopup
        isLoading={isLoading}
        category={category}
        name={name}
        DeleteSubmitHandler={DeleteSubmitHandler}
        CancelDeleteSubmitHandler={CancelDeleteSubmitHandler}
      />
    ) : null;
  };

  const toggleTimeSlotEdit = () => {
    setIsTimeSlotEdit((prevState) => !prevState);
  };
  const onEditDone = () => {
    setIsTimeSlotEdit(false);
    if (item?.time_slot !== timeSlotValue) {
      updateTimeSlotHandler();
    }
  };
  const onEditCancel = () => {
    setTimeSlotValue(item?.time_slot);
    setIsTimeSlotEdit(false);
  };

  const updateTimeSlotValue = (value: string) => {
    console.log("value => ", value);

    setTimeSlotValue(value);
  };
  const toggleMobileShow = () => {
    updateMobileShowHandler();
  };

  const handleWaiverToggle = async (status: boolean) => {
    const response = await OrderWaiver(
      status,
      item?.order_id,
      item?.client_id,
      setIsLoading
    );
    if (response?.status === 201 || 200) {
      orderItemDataA();
    }
  };

  return (
    <div>
      <ODComponent
        isLoading={isLoading}
        item={item}
        handleButtonClick={handleButtonClick}
        detailsData={detailsData}
        setDetailsData={setDetailsData}
        AmountSubmitHandler={AmountSubmitHandler}
        NotReplySubmitHandler={NotReplySubmitHandler}
        openReceipt={openReceipt}
        setOpenReceipt={setOpenReceipt}
        openQuote={openQuote}
        setOpenQuote={setOpenQuote}
        toggleOrderDetailsPopup={toggleOrderDetailsPopup}
        toggleMultiFile={toggleMultiFile}
        ratesDropA={ratesDropA}
        isInvoiceOpen={isInvoiceOpen}
        setIsInvoiceOpen={setIsInvoiceOpen}
        isQuoteOpen={isQuoteOpen}
        setIsQuoteOpen={setIsQuoteOpen}
        isOrderOpen={isOrderOpen}
        setIsOrderOpen={setIsOrderOpen}
        isOtherOpen={isOtherOpen}
        setIsOtherOpen={setIsOtherOpen}
        isAssignCrew={isAssignCrew}
        toggleAssignCrew={toggleAssignCrew}
        AssignCrewFormSubmitHandler={AssignCrewFormSubmitHandler}
        timeCrew={timeCrew}
        handleSelectedTimeSlots={handleSelectedTimeSlots}
        bookSlot={bookSlot}
        order_id={item?.order_id}
        toggleTimeSlotEdit={toggleTimeSlotEdit}
        isTimeSlotEdit={isTimeSlotEdit}
        timeSlotValue={timeSlotValue}
        updateTimeSlotValue={updateTimeSlotValue}
        onEditDone={onEditDone}
        onEditCancel={onEditCancel}
        isReviewOpen={isReviewOpen}
        setIsReviewOpen={setIsReviewOpen}
        toggleMobileShow={toggleMobileShow}
        handleWaiverToggle={handleWaiverToggle}
      />
      {renderDeletePopup(
        openDeleteOrderPop,
        isLoading,
        "Order",
        item?.oid,
        DeleteSubmitHandler,
        toggleDeletePopup
      )}

      {renderDeletePopup(
        isOrderDetailsDeletePop,
        isLoading,
        "Image",
        orderDetailsDeleteValue?.key === "invoice"
          ? "Invoice"
          : orderDetailsDeleteValue?.key === "quote"
          ? "Quote"
          : orderDetailsDeleteValue?.key === "order_images"
          ? "Order Image"
          : "Other Document",
        ImageDeleteSubmitHandler,
        toggleOrderDetailsPopup
      )}
      {openReceipt ? (
        <GenerateReceipt
          openReceipt={openReceipt}
          setOpenReceipt={setOpenReceipt}
          item={item}
          ratesDropList={ratesDropList}
          isPreview={isPreview}
          setIsPreview={setIsPreview}
          isLoading={isLoading}
          receiptRef={receiptRef}
          isSDEditing={isSDEditing}
          setIsSDEditing={setIsSDEditing}
          isSTEditing={isSTEditing}
          setIsSTEditing={setIsSTEditing}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          handleUploadOrder={handleUploadOrder}
          printDocument={printDocument}
          handleGeneratePreview={handleGeneratePreview}
        />
      ) : null}
      {openQuote ? (
        <GenerateQuote
          openQuote={openQuote}
          setOpenQuote={setOpenQuote}
          item={item}
          ratesDropList={ratesDropList}
          isPreview={isPreview}
          setIsPreview={setIsPreview}
          isLoading={isLoading}
          quoteRef={quoteRef}
          isSDEditing={isSDEditing}
          setIsSDEditing={setIsSDEditing}
          isSTEditing={isSTEditing}
          setIsSTEditing={setIsSTEditing}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          handleUploadOrder={handleUploadQuote}
          printDocument={printDocument}
          handleGeneratePreview={handleGeneratePreview}
        />
      ) : null}
      {openMultiFilePop ? (
        <UploadMultipleFiles
          toggleMultiFile={toggleMultiFile}
          files={files}
          setFiles={setFiles}
          handleUploadMultipleFilesSubmit={handleUploadMultipleFilesSubmit}
        />
      ) : null}
    </div>
  );
}

export default ODController;
