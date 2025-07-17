import { ApiCall } from "../../config";
import { AlertType, alertService } from "../../utils/alert.service";

export const CodeList = async (
  size: number,
  selectedPage: number,
  searchInput: string,
  setIsLoading: (val: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "coupon/list",
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

export const AddCodesA = async (
  codeData: any,
  date_start: any,
  date_end: any,
  setIsLoading: (val: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "coupon/create",
      method: "POST",
      data: {
        name: codeData.name,
        quantity: parseInt(codeData.quantity),
        discount_type: codeData.discount_type,
        discount_value: codeData.discount_value,
        discount_code: codeData.discount_code,
        date_start: date_start,
        date_end: date_end,
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

export const EditCodeA = async (
  editItem: any,
  date_start: any,
  date_end: any,
  setIsLoading: (val: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "coupon/update",
      method: "POST",
      data: {
        discount_id: editItem.discount_id,
        discount_code: editItem.discount_code,
        name: editItem.name,
        quantity: parseInt(editItem.quantity),
        discount_type: editItem.discount_type,
        discount_value: editItem.discount_value,
        date_start: date_start,
        date_end: date_end,
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

export const DeleteCode = async (
  deleteItem: any,
  setIsLoading: (val: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "coupon/delete",
      method: "POST",
      data: {
        discount_id: deleteItem?.discount_id,
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
