import moment from "moment";
import { ApiCall } from "../../config";
import { AlertType, alertService } from "../../utils/alert.service";

export const SpecializeTerritoryList = async () => {
  try {
    const response = await ApiCall({
      endpoint: "location/dropdown",
      method: "GET",
    });

    return response;
  } catch (error: any) {
    console.log("error >> ", error);
  }
};

export const SpecializeServiceList = async (location_id: string) => {
  try {
    const response = await ApiCall({
      endpoint: "services/dropdown",
      method: "POST",
      data: {
        location_id: location_id,
      },
    });

    return response;
  } catch (error: any) {
    console.log("error >> ", error);
  }
};

export const PinkDateList = async (service_id: string, month: any) => {
  try {
    const response = await ApiCall({
      endpoint: "services/pinkdate/list",
      method: "POST",
      data: {
        service_id: service_id,
        date: month,
      },
    });

    return response;
  } catch (error: any) {
    console.log("error >> ", error);
  }
};

export const UpdatePinkDateList = async (
  service_id: string,
  date: any,
  time_slots: any
) => {
  try {
    const response = await ApiCall({
      endpoint: "services/pinkdate/update",
      method: "POST",
      data: {
        service_id: service_id,
        date: date,
        time_slots: time_slots,
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
    console.log("error >> ", error);
    if (error?.data?.message) {
      alertService.alert({
        type: AlertType.Error,
        message: error?.data?.message,
      });
    }
  }
};

export const PinkDiscountUpdate = async (
  service_id: string,
  discount: number
) => {
  try {
    const response = await ApiCall({
      endpoint: "services/pinkdiscount/update",
      method: "POST",
      data: {
        service_id: service_id,
        discount: discount,
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
    console.log("error >> ", error);
    if (error?.data?.message) {
      alertService.alert({
        type: AlertType.Error,
        message: error?.data?.message,
      });
    }
  }
};
