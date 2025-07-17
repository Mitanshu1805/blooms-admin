import { ApiCall } from "../../config";
import { AlertType, alertService } from "../../utils/alert.service";

export const NotificationList = async (
  page: number,
  limit: number,
  searchInput: string,
  setIsLoading: (value: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "screen/notifications/list",
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

export const AddNotificationA = async (
  notificationData: any,
  setIsLoading: (value: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "screen/notifications",
      method: "POST",
      data: {
        title: notificationData.title,
        title_text: notificationData.context,
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

export const DeleteNotification = async (
  deleteItem: any,
  setIsLoading: (value: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "screen/notifications/delete",
      method: "POST",
      data: {
        notification_id: deleteItem?.notification_id,
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
