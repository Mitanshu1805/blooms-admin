import moment from "moment";
import { ApiCall } from "../../config";
import { alertService, AlertType } from "../../utils/alert.service";

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

export const TimeSlotList = async (service_id: string, date: any) => {
  console.log("date >> ", date);

  try {
    const response = await ApiCall({
      endpoint: "services/timeslot/list",
      method: "POST",
      data: {
        date: date,
        service_id: service_id,
      },
    });

    return response;
  } catch (error: any) {
    console.log("error >> ", error);
  }
};

export const UpdateTimeSlotList = async (
  service_id: string,
  location_id: string,
  specificDate: any,
  disabledTimeSlots: any
) => {
  try {
    const response = await ApiCall({
      endpoint: "services/timeslot/update",
      method: "POST",
      data: {
        service_id: service_id,
        location_id: location_id,
        specific_date: moment(specificDate).format("DD-MM-YYYY"),
        time_slots: disabledTimeSlots,
      },
    });

    return response;
  } catch (error: any) {
    console.log("error >> ", error);
  }
};

export const GetGlobalTimeLimit = async () => {
  try {
    const response = await ApiCall({
      endpoint: "setting/globaltime",
      method: "GET",
    });

    return response;
  } catch (error: any) {
    console.log("error >> ", error);
  }
};

export const UpdateGlobalTimeLimit = async (timeslot: string) => {
  try {
    const response = await ApiCall({
      endpoint: "setting/update/globaltime",
      method: "POST",
      data: {
        timeslot: timeslot,
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
  }
};

export const CancellationTimeLimit = async () =>
  // setIsLoading: (val: boolean) => void
  {
    try {
      // setIsLoading(true);
      const response = await ApiCall({
        endpoint: "setting/cancellation",
        method: "GET",
        data: {},
      });
      // if (response?.status === 200) {
      //   alertService.alert({
      //     type: AlertType.Success,
      //     message: response?.data?.message,
      //   });
      // }
      return response;
    } catch (error: any) {
      if (error?.data?.message) {
        alertService.alert({
          type: AlertType.Error,
          message: error?.data?.message,
        });
      }
    } finally {
      // setIsLoading(false);
    }
  };

export const UpdateCancellationLimit = async (
  cancellation_limit: string,
  setIsLoading: (val: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "setting/update/cancellation",
      method: "PUT",
      data: {
        cancellation_limit,
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
