import { ApiCall, ApiCallFormData } from "../../config";
import { AlertType, alertService } from "../../utils/alert.service";

export const SplashList = async (setIsLoading: any) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "screen/list",
      method: "GET",
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

export const UpdateSplashA = async (
  splashDuration: any,
  splashImage: any,
  setIsLoading: (value: boolean) => void
) => {
  try {
    setIsLoading(true);
    const form_data = new FormData();
    form_data.append(
      "screen_image",
      splashImage?.raw ? splashImage?.raw : splashImage
    );
    form_data.append("screen_number", splashDuration);
    const response = await ApiCallFormData({
      endpoint: "screen/add",
      method: "POST",
      data: form_data,
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
