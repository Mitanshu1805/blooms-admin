import moment from "moment";
import { ApiCall } from "../../config";
import { alertService, AlertType } from "../../utils/alert.service";

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
      //   if (response?.status === 200) {
      //     alertService.alert({
      //       type: AlertType.Success,
      //       message: response?.data?.message,
      //     });
      //   }
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
  setIsLoading: (val: boolean) => void,
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

export const ChargeAmountAdd = async (
  // charge_name: string,
  // charge_amount: string,
  chargeAmountValue: any,
  setIsLoading: (val: boolean) => void,
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "charge/add",
      method: "POST",
      data: {
        charge_name: chargeAmountValue?.charge_name,
        charge_amount: chargeAmountValue?.charge_amount,
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

export const ChargeAmountDelete = async (
  deleteCharge: any,
  setIsLoading: (val: boolean) => void,
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "charge/delete",
      method: "POST",
      data: {
        charge_id: deleteCharge?.charge_id,
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

export const ChargeAmountUpdate = async (
  editCharge: any,

  setIsLoading: (val: boolean) => void,
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "charge/update",
      method: "POST",
      data: {
        charge_name: editCharge?.charge_name,
        charge_amount: editCharge?.charge_amount,
        charge_id: editCharge?.charge_id,
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

export const ChargeAmountList = async (
  setIsLoading: (val: boolean) => void,
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "charge/list",
      method: "GET",
      data: {},
    });
    if (response?.status === 200) {
      // alertService.alert({
      //   type: AlertType.Success,
      //   message: response?.data?.message,
      // });
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
