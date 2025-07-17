import { ApiCall } from "../../config";
import { AlertType, alertService } from "../../utils/alert.service";

export const FeedbackList = async (
  page: number,
  limit: number,
  searchInput: string,
  setIsLoading: (value: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "screen/feedback/list",
      method: "POST",
      data: {
        page,
        limit,
        search: searchInput,
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

export const DeleteFeedback = async (
  deleteItem: any,
  setIsLoading: (value: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "screen/feedback/delete",
      method: "POST",
      data: {
        feedback_id: deleteItem?.feedback_id,
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

export const updateFeedbackStatus = async (
  user: any,
  setIsLoading: (value: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "screen/feedback/status",
      method: "POST",
      data: {
        feedback_id: user.id,
        is_active: user.status,
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
