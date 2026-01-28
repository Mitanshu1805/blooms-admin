import { str } from "ajv";
import { ApiCall, ApiCallFormData } from "../../config";
import { AlertType, alertService } from "../../utils/alert.service";

interface CrewOrderUpdatePayload {
  order_id: string;
  payment_mode: string;
  cash: string;
  cashless: string;
  materials_fee: string;
}

export const CrewOrderList = async (
  size: number,
  selectedPage: number,
  setIsLoading: (val: boolean) => void,
  crew_id: string,
  currency: string,
  startDate: string,
  endDate: string,
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "crew/orders",
      method: "POST",
      data: {
        limit: size,
        page: selectedPage ?? 1,
        crewId: crew_id,
        columnName: "mo.time_slot",
        order: "ASC",
        currency: currency,
        startDate: startDate,
        endDate: endDate,
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

export const CrewUpload = async (
  file: any,
  folderName: string,
  setIsLoading: (val: boolean) => void,
) => {
  try {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("settlement", file);
    formData.append("folderName", folderName);
    console.log(file);
    const response = await ApiCallFormData({
      endpoint: "crew/upload",
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

export const CrewOrdersPdf = async (
  // order: string,
  // columnName: string,
  setIsLoading: (val: boolean) => void,
  crew_id: string,
  currency: string,
  startDate: string,
  endDate: string,
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "crew/orders/pdf",
      method: "POST",
      responseType: "arraybuffer",
      data: {
        crewId: crew_id,
        columnName: "mo.time_slot",
        order: "ASC",
        currency: currency,
        startDate: startDate,
        endDate: endDate,
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

export const CrewOrdersUpdate = async (
  orders: CrewOrderUpdatePayload[],
  setIsLoading: (val: boolean) => void,
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "crew/orders/update",
      method: "POST",
      data: {
        orders,
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
