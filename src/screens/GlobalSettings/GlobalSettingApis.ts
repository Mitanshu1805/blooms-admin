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
