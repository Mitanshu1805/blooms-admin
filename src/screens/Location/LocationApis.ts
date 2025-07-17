import { ApiCall, ApiCallFormData } from "../../config";
import { AlertType, alertService } from "../../utils/alert.service";

export const LocationList = async (
  size: number,
  selectedPage: number,
  searchInput: string,
  setIsLoading: (val: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "location/list",
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

export const AddLocationA = async (
  locationData: any,
  location_image: any,
  setIsLoading: (val: boolean) => void
) => {
  try {
    setIsLoading(true);
    const form_data = new FormData();
    form_data.append("location_name", locationData.location_name);
    form_data.append("template", locationData.template);
    form_data.append("phone_number", locationData.phone_number);
    form_data.append("email", locationData.email);
    form_data.append("share_count", locationData.share_count);
    form_data.append("currency", locationData.currency);
    form_data.append("location_image", location_image?.raw);
    const response = await ApiCallFormData({
      endpoint: "location/create",
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

export const EditLocationA = async (
  editItem: any,
  setIsLoading: (val: boolean) => void
) => {
  try {
    setIsLoading(true);
    const form_data = new FormData();
    form_data.append("location_id", editItem.location_id);
    form_data.append("location_name", editItem.location_name);
    form_data.append("phone_number", editItem.phone_number);
    form_data.append("email", editItem.email);
    form_data.append("template", editItem.template);
    form_data.append("currency", editItem.currency);
    form_data.append("share_count", editItem.share_count);
    form_data.append("location_image", editItem?.raw);
    const response = await ApiCallFormData({
      endpoint: "location/update",
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

export const DeleteLocation = async (
  deleteItem: any,
  setIsLoading: (val: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "location/delete",
      method: "POST",
      data: {
        location_id: deleteItem?.location_id,
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
