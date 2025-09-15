import { ApiCall, ApiCallFormData } from "../../config";
import Api from "../../config/interceptors";
import { AlertType, alertService } from "../../utils/alert.service";

export const OfferList = async (setIsLoading: (val: boolean) => void) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "offer/list",
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

export const OfferScreen = async (setIsLoading: (val: boolean) => void) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "offer/screens",
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

interface Location {
  location_id: string;
  // location_name: string;
}

export const OfferAdd = async (
  setIsLoading: (val: boolean) => void,
  offerData: {
    name: string;
    is_clickable: boolean;
    content: string;
    image: string;
    screen_key: string;
    location_ids: Location[];
  }
) => {
  try {
    setIsLoading(true);
    const formData = new FormData();
    console.log("offerData in api", offerData);

    formData.append("name", offerData.name);
    formData.append("is_clickable", String(offerData.is_clickable));
    formData.append("content", offerData.content);
    formData.append("navigation_key", offerData.screen_key);
    if (offerData.image) {
      formData.append("image", offerData.image);
    }
    const locationIds = offerData.location_ids;
    console.log(locationIds);

    formData.append("location_ids", JSON.stringify(locationIds));
    console.log(typeof locationIds);
    const response = await ApiCallFormData({
      endpoint: "offer/add",
      method: "POST",
      data: formData,
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

export const OfferUpdate = async (
  setIsLoading: (val: boolean) => void,
  offerData: {
    offer_id: string;
    name: string;
    is_clickable: boolean;
    content: string;
    image: File;
    locations: [];
    navigation_key: string;
  }
) => {
  try {
    setIsLoading(true);
    const formData = new FormData();
    console.log(offerData);

    formData.append("offer_id", offerData.offer_id);
    formData.append("name", offerData.name);
    formData.append("is_clickable", String(offerData.is_clickable));
    formData.append("navigation_key", offerData.navigation_key);
    formData.append("content", offerData.content);
    if (offerData.image) {
      formData.append("image", offerData.image);
    }
    const locationIds = offerData?.locations?.map(
      (item: any) => item.location_id
    );
    formData.append("location_ids", JSON.stringify(locationIds));
    console.log(formData);

    const response = await ApiCallFormData({
      endpoint: "offer/update",
      method: "PUT",
      data: formData,
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

export const OfferUpdateStatus = async (
  offerData: any,
  setIsLoading: (value: boolean) => void
) => {
  console.log("Payload going to backend:", {
    offer_id: offerData.id,
    is_active: offerData.status,
  });

  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "offer/update/status",
      method: "PUT",
      data: {
        offer_id: offerData.id,
        is_active: offerData.status,
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

export const OfferDelete = async (
  setIsLoading: (val: boolean) => void,
  offerData: {
    offer_id: string;
  }
) => {
  try {
    setIsLoading(true);

    const response = await ApiCall({
      endpoint: "offer/delete",
      method: "DELETE",
      data: {
        offer_id: offerData.offer_id,
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
