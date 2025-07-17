import moment from "moment";
import { ApiCall, ApiCallFormData } from "../../config";
import { AlertType, alertService } from "../../utils/alert.service";

export const OrderItem = async (
  item: any,
  setIsLoading: (val: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "order/item/list",
      method: "POST",
      data: {
        order_id: item,
      },
    });
    return response;
  } catch (error: any) {
    if (error?.data?.message) {
      alertService.alert({
        type: AlertType.Error,
        message: error?.data?.message,
      });
    }
  } finally {
    setIsLoading(false);
  }
};

export const OrderNoteReply = async (
  item: any,
  order_id: string,
  client_id: string,
  setIsLoading: (val: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "order/update/notereply",
      method: "POST",
      data: {
        note_reply: item,
        order_id: order_id,
        client_id: client_id,
      },
    });
    if (response?.status === 200) {
      alertService.alert({
        type: AlertType.Success,
        message: response?.data?.message,
      });
    }
    return response;
  } catch (error: any) {
    if (error?.data?.message) {
      alertService.alert({
        type: AlertType.Error,
        message: error?.data?.message,
      });
    }
  } finally {
    setIsLoading(false);
  }
};

export const OrderAmount = async (
  item: any,
  order_id: string,
  client_id: string,
  setIsLoading: (val: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "order/update/amount",
      method: "POST",
      data: {
        order_amount: item,
        order_id: order_id,
        client_id: client_id,
      },
    });
    if (response?.status === 200) {
      alertService.alert({
        type: AlertType.Success,
        message: response?.data?.message,
      });
    }
    return response;
  } catch (error: any) {
    if (error?.data?.message) {
      alertService.alert({
        type: AlertType.Error,
        message: error?.data?.message,
      });
    }
  } finally {
    setIsLoading(false);
  }
};

export const OrderTimeslot = async (
  item: any,
  order_id: string,
  client_id: string,
  setIsLoading: (val: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "order/update/timeslot",
      method: "POST",
      data: {
        time_slot: item,
        order_id: order_id,
        client_id: client_id,
      },
    });
    if (response?.status === 200) {
      alertService.alert({
        type: AlertType.Success,
        message: response?.data?.message,
      });
    }
    return response;
  } catch (error: any) {
    if (error?.data?.message) {
      alertService.alert({
        type: AlertType.Error,
        message: error?.data?.message,
      });
    }
  } finally {
    setIsLoading(false);
  }
};

export const OrderMobileShow = async (
  order_id: string,
  is_mobile_hidden: boolean,
  setIsLoading: (val: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "order/update/mobile-show",
      method: "POST",
      data: {
        order_id: order_id,
        is_mobile_hidden: is_mobile_hidden,
      },
    });
    if (response?.status === 200) {
      alertService.alert({
        type: AlertType.Success,
        message: response?.data?.message,
      });
    }
    return response;
  } catch (error: any) {
    if (error?.data?.message) {
      alertService.alert({
        type: AlertType.Error,
        message: error?.data?.message,
      });
    }
  } finally {
    setIsLoading(false);
  }
};

export const OrderStatus = async (
  item: any,
  order_id: string,
  client_id: string,
  setIsLoading: (val: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "order/update/orderstatus",
      method: "POST",
      data: {
        order_status: item,
        order_id: order_id,
        client_id: client_id,
      },
    });
    if (response?.status === 200) {
      alertService.alert({
        type: AlertType.Success,
        message: response?.data?.message,
      });
    }
    return response;
  } catch (error: any) {
    if (error?.data?.message) {
      alertService.alert({
        type: AlertType.Error,
        message: error?.data?.message,
      });
    }
  } finally {
    setIsLoading(false);
  }
};

export const InvoiceImageDelete = async (
  item: any,
  order_id: string,
  setIsLoading: (val: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "order/invoice/delete",
      method: "POST",
      data: {
        invoice: item.split("/").pop(),
        order_id: order_id,
      },
    });
    if (response?.status === 200) {
      alertService.alert({
        type: AlertType.Success,
        message: response?.data?.message,
      });
    }
    return response;
  } catch (error: any) {
    if (error?.data?.message) {
      alertService.alert({
        type: AlertType.Error,
        message: error?.data?.message,
      });
    }
  } finally {
    setIsLoading(false);
  }
};

export const QuoteImageDelete = async (
  item: any,
  order_id: string,
  setIsLoading: (val: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "order/invoice/delete",
      method: "POST",
      data: {
        quote: item.split("/").pop(),
        order_id: order_id,
      },
    });
    if (response?.status === 200) {
      alertService.alert({
        type: AlertType.Success,
        message: response?.data?.message,
      });
    }
    return response;
  } catch (error: any) {
    if (error?.data?.message) {
      alertService.alert({
        type: AlertType.Error,
        message: error?.data?.message,
      });
    }
  } finally {
    setIsLoading(false);
  }
};

export const OrderImageDelete = async (
  item: any,
  order_id: string,
  setIsLoading: (val: boolean) => void
) => {
  try {
    setIsLoading(true);
    const filename = new URL(item).pathname.split("/").pop();
    const response = await ApiCall({
      endpoint: "order/invoice/delete",
      method: "POST",
      data: {
        order_images: filename,
        order_id: order_id,
      },
    });
    if (response?.status === 200) {
      alertService.alert({
        type: AlertType.Success,
        message: response?.data?.message,
      });
    }
    return response;
  } catch (error: any) {
    if (error?.data?.message) {
      alertService.alert({
        type: AlertType.Error,
        message: error?.data?.message,
      });
    }
  } finally {
    setIsLoading(false);
  }
};

export const OtherImageDelete = async (
  item: any,
  order_id: string,
  setIsLoading: (val: boolean) => void
) => {
  try {
    setIsLoading(true);
    const filename = new URL(item).pathname.split("/").pop();
    const response = await ApiCall({
      endpoint: "order/invoice/delete",
      method: "POST",
      data: {
        other_document: filename,
        order_id: order_id,
      },
    });
    if (response?.status === 200) {
      alertService.alert({
        type: AlertType.Success,
        message: response?.data?.message,
      });
    }
    return response;
  } catch (error: any) {
    if (error?.data?.message) {
      alertService.alert({
        type: AlertType.Error,
        message: error?.data?.message,
      });
    }
  } finally {
    setIsLoading(false);
  }
};

export const MultiFileUploadA = async (
  files: any[],
  order_id: string,
  setIsLoading: (value: boolean) => void
) => {
  try {
    setIsLoading(true);
    const formData = new FormData();
    files.forEach((file: any) => {
      formData.append("other_document", file);
    });
    formData.append("order_id", order_id);

    const response = await ApiCallFormData({
      endpoint: "order/update/otherdocument",
      method: "POST",
      data: formData,
    });
    if (response?.status === 200) {
      alertService.alert({
        type: AlertType.Success,
        message: response?.data?.message,
      });
    }
    return response;
  } catch (error: any) {
    if (error?.data?.message) {
      alertService.alert({
        type: AlertType.Error,
        message: error?.data?.message,
      });
    }
  } finally {
    setIsLoading(false);
  }
};

export const RatesDropDownA = async (
  service_id: string,
  setIsLoading: (val: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "services/option/dropdown",
      method: "POST",
      data: {
        service_id: service_id,
      },
    });
    if (response?.status === 200) {
      alertService.alert({
        type: AlertType.Success,
        message: response?.data?.message,
      });
    }
    return response;
  } catch (error: any) {
    if (error?.data?.message) {
      alertService.alert({
        type: AlertType.Error,
        message: error?.data?.message,
      });
    }
  } finally {
    setIsLoading(false);
  }
};

export const ReceiptUploadA = async (
  file: any,
  order_id: string,
  setIsLoading: (value: boolean) => void
) => {
  try {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("invoice", file);
    formData.append("order_id", order_id);

    const response = await ApiCallFormData({
      endpoint: "/order/add/invoice",
      method: "POST",
      data: formData,
    });

    if (response?.status === 200) {
      alertService.alert({
        type: AlertType.Success,
        message: response?.data?.message,
      });
    }
    return response;
  } catch (error: any) {
    if (error?.data?.message) {
      alertService.alert({
        type: AlertType.Error,
        message: error?.data?.message,
      });
    }
  } finally {
    setIsLoading(false);
  }
};
export const QuoteUpload = async (
  file: any,
  order_id: string,
  setIsLoading: (value: boolean) => void
) => {
  try {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("quote", file);
    formData.append("order_id", order_id);

    const response = await ApiCallFormData({
      endpoint: "/order/add/quote",
      method: "POST",
      data: formData,
    });

    if (response?.status === 200) {
      alertService.alert({
        type: AlertType.Success,
        message: response?.data?.message,
      });
    }
    return response;
  } catch (error: any) {
    if (error?.data?.message) {
      alertService.alert({
        type: AlertType.Error,
        message: error?.data?.message,
      });
    }
  } finally {
    setIsLoading(false);
  }
};

export const TimeSlotCrewListA = async (
  item: any,
  setIsLoading: (val: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "v2/crew/list",
      method: "POST",
      data: {
        time_slot: item,
      },
    });
    return response;
  } catch (error: any) {
    if (error?.data?.message) {
      alertService.alert({
        type: AlertType.Error,
        message: error?.data?.message,
      });
    }
  } finally {
    setIsLoading(false);
  }
};

export const BookTimeSlotCrewA = async (
  item: any,
  bookSlot: any,
  setIsLoading: (val: boolean) => void
) => {
  const parsedDate = moment(item?.time_slot).format("YYYY-MM-DD");
  const newTimeSlotString = `${parsedDate}T${bookSlot.title}:00.000Z`;
  console.log("bookSlot => ", item);

  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "v2/crew/assigned",
      method: "POST",
      data: {
        crew_id: bookSlot.crew_id,
        order_id: item.order_id,
        time_slot: newTimeSlotString,
      },
    });
    if (response?.status === 200) {
      alertService.alert({
        type: AlertType.Success,
        message: response?.data?.message,
      });
    }
    return response;
  } catch (error: any) {
    if (error?.data?.message) {
      alertService.alert({
        type: AlertType.Error,
        message: error?.data?.message,
      });
    }
  } finally {
    setIsLoading(false);
  }
};

export const CardAmountCharge = async (
  order_id: string,
  order_amount: any,
  setIsLoading: (val: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "v2/payment/create",
      method: "POST",
      data: {
        order_id: order_id,
        amount: order_amount,
      },
    });
    if (response?.status === 200) {
      alertService.alert({
        type: AlertType.Success,
        message: response?.data?.message,
      });
    }
    return response;
  } catch (error: any) {
    if (error?.data?.message) {
      alertService.alert({
        type: AlertType.Error,
        message: error?.data?.message,
      });
    }
  } finally {
    setIsLoading(false);
  }
};

export const OrderWaiver = async (
  item: any,
  order_id: string,
  client_id: string,
  setIsLoading: (val: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "order/update/waiver",
      method: "POST",
      data: {
        has_waiver: item,
        order_id: order_id,
        client_id: client_id,
      },
    });
    if (response?.status === 200) {
      alertService.alert({
        type: AlertType.Success,
        message: response?.data?.message,
      });
    }
    return response;
  } catch (error: any) {
    if (error?.data?.message) {
      alertService.alert({
        type: AlertType.Error,
        message: error?.data?.message,
      });
    }
  } finally {
    setIsLoading(false);
  }
};
