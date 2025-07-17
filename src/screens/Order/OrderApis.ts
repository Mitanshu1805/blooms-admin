import { ApiCall } from "../../config";
import { AlertType, alertService } from "../../utils/alert.service";

export const OrderList = async (
  size: number,
  selectedPage: number,
  searchInput: string,
  setIsLoading: (val: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "order/list",
      method: "POST",
      data: {
        limit: size,
        page: selectedPage ?? 1,
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

export const DeleteOrder = async (
  deleteItem: any,
  setIsLoading: (val: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "order/delete",
      method: "POST",
      data: {
        order_id: deleteItem?.order_id,
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
