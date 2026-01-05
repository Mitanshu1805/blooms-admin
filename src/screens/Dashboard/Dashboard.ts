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

export const VideoUpload = async (
  guide_text: any,
  screen_key: any,
  guide_video: any,
  setIsLoading: (value: boolean) => void
) => {
  try {
    setIsLoading(true);

    const form_data = new FormData();
    form_data.append("guide_text", guide_text);
    form_data.append("screen_key", screen_key);

    if (guide_video) {
      form_data.append("guide_video", guide_video);
    }

    const response = await ApiCallFormData({
      endpoint: "guide/add",
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
    alertService.alert({
      type: AlertType.Error,
      message: error?.data?.message || "Something went wrong",
    });
  } finally {
    setIsLoading(false);
  }
};

export const VideoDelete = async (
  guide_id: any,
  setIsLoading: (value: boolean) => void
) => {
  try {
    setIsLoading(true);

    const response = await ApiCall({
      endpoint: "guide/delete",
      method: "DELETE",
      data: {
        guide_id: guide_id,
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
    alertService.alert({
      type: AlertType.Error,
      message: error?.response?.data?.message || "Something went wrong",
    });
  } finally {
    setIsLoading(false);
  }
};

export const GuideList = async (screen_key: any, setIsLoading: any) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "v2/guide/list",
      method: "POST",
      data: {
        screen_key: screen_key,
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
