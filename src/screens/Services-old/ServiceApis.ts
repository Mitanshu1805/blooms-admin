import { ApiCall, ApiCallFormData } from "../../config";
import { AlertType, alertService } from "../../utils/alert.service";

//Service List

export const ServiceList = async (
  location_id: string,
  searchInput: string,
  setIsLoading: (value: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "services/list",
      method: "POST",
      data: {
        location_id: location_id,
        search: searchInput,
      },
    });
    return response;
  } catch (error: any) {
  } finally {
    setIsLoading(false);
  }
};

export const AddServiceA = async (
  location_id: string,
  serviceData: any,
  serviceImage: any,
  startTime: any,
  endTime: any,
  has_brand: any,
  setIsLoading: (value: boolean) => void
) => {
  try {
    setIsLoading(true);
    const form_data = new FormData();
    form_data.append("service_icon", serviceImage?.raw);
    form_data.append("location_id", location_id);
    form_data.append("service_name", serviceData.service_name);
    form_data.append("cost", serviceData.base_price);
    form_data.append("web_page_service_key", serviceData.web_page_service_key);
    form_data.append("timing_of_each_slot", serviceData.timing_of_each_slot);
    form_data.append("last_slot", endTime);
    form_data.append("first_slot", startTime);
    form_data.append("has_brand", has_brand);

    const response = await ApiCallFormData({
      endpoint: "services/add",
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

export const EditServiceA = async (
  editItem: any,
  setIsLoading: (value: boolean) => void
) => {
  try {
    setIsLoading(true);
    let form_data = new FormData();
    form_data.append("service_icon", editItem.service_icon?.raw);
    form_data.append("service_name", editItem.service_name);
    form_data.append("timing_of_each_slot", editItem.timing_of_each_slot);
    form_data.append("last_slot", editItem.last_slot);
    form_data.append("first_slot", editItem.first_slot);
    form_data.append("service_id", editItem.service_id);
    form_data.append("cost", editItem.cost);
    form_data.append("web_page_service_key", editItem.web_page_service_key);
    const response = await ApiCallFormData({
      endpoint: "services/update",
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

export const DeleteService = async (
  deleteItem: any,
  setIsLoading: (value: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "services/delete",
      method: "POST",
      data: {
        service_id: deleteItem?.service_id,
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

export const updateServiceStatusA = async (user: any, setIsLoading: any) => {
  const updateStatus = {
    service_id: user.service_id,
    is_active: !user.is_active,
  };

  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "services/status/update",
      method: "POST",
      data: updateStatus,
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

//Brand List

export const BrandList = async (
  selectedAccordion: any,
  setIsLoading: (value: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "services/brand/list",
      method: "POST",
      data: {
        service_id: selectedAccordion,
      },
    });
    return response;
  } catch (error: any) {
  } finally {
    setIsLoading(false);
  }
};

export const AddBrandA = async (
  service_id: string,
  serviceData: any,
  serviceImage: any,
  setIsLoading: (value: boolean) => void
) => {
  try {
    setIsLoading(true);
    const form_data = new FormData();
    form_data.append("brand_icon", serviceImage?.raw);
    form_data.append("service_id", service_id);
    form_data.append("brand_name", serviceData);

    const response = await ApiCallFormData({
      endpoint: "services/brand/add",
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

export const EditBrandA = async (
  editItem: any,
  setIsLoading: (value: boolean) => void
) => {
  try {
    setIsLoading(true);
    const form_data = new FormData();
    form_data.append("brand_icon", editItem?.brand_icon?.raw);
    form_data.append("service_brand_id", editItem?.service_brand_id);
    form_data.append("brand_name", editItem?.brand_name);

    const response = await ApiCallFormData({
      endpoint: "services/brand/update",
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

export const DeleteBrand = async (
  deleteItem: any,
  setIsLoading: (value: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "services/brand/delete",
      method: "POST",
      data: {
        service_brand_id: deleteItem?.service_brand_id,
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

//Model List

export const ModalList = async (
  selectedAccordion: any,
  setIsLoading: (value: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "services/brand/model/list",
      method: "POST",
      data: {
        service_brand_id: selectedAccordion,
      },
    });
    return response;
  } catch (error: any) {
  } finally {
    setIsLoading(false);
  }
};

export const AddModalA = async (
  location_id: string,
  serviceData: any,
  serviceImage: any,
  setIsLoading: (value: boolean) => void
) => {
  try {
    setIsLoading(true);
    const form_data = new FormData();
    form_data.append("model_icon", serviceImage?.raw);
    form_data.append("service_brand_id", location_id);
    form_data.append("model_name", serviceData);

    const response = await ApiCallFormData({
      endpoint: "services/brand/model/add",
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

export const EditModalA = async (
  editItem: any,
  setIsLoading: (value: boolean) => void
) => {
  try {
    setIsLoading(true);
    const form_data = new FormData();
    form_data.append("model_icon", editItem?.model_icon?.raw);
    form_data.append("brands_model_id", editItem?.brands_model_id);
    form_data.append("model_name", editItem?.model_name);

    const response = await ApiCallFormData({
      endpoint: "services/brand/model/update",
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

export const DeleteModal = async (
  deleteItem: any,
  setIsLoading: (value: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "services/brand/model/delete",
      method: "POST",
      data: {
        brands_model_id: deleteItem?.brands_model_id,
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

//Sub Service List

export const SubServiceList = async (
  selectedPage: number,
  selectedAccordion: any,
  brands_model_id: any,
  setIsLoading: (value: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "subservices/list",
      method: "POST",
      data: {
        page: selectedPage ?? 1,
        service_id: selectedAccordion,
        brands_model_id: brands_model_id,
      },
    });
    return response;
  } catch (error: any) {
  } finally {
    setIsLoading(false);
  }
};
export const AddSubServiceA = async (
  subServiceData: any,
  serviceId: any,
  setIsLoading: (value: boolean) => void
) => {
  try {
    setIsLoading(true);

    const response = await ApiCall({
      endpoint: "subservices/add",
      method: "POST",
      data: {
        service_id: serviceId?.service_id,
        brands_model_id: serviceId?.brands_model_id,
        quantity_base: subServiceData.quantity_base,
        quantity_default: subServiceData.quantity_default,
        quantity_increment: subServiceData.quantity_increment,
        quantity_max: subServiceData.quantity_max,
        quantity_min: subServiceData.quantity_min,
        quantity_label: subServiceData.quantity_label,
        description: subServiceData.description,
        order_label: subServiceData.order_label,
        label: subServiceData.label,
        transport_fees: subServiceData.transport_fees,
        cost: subServiceData.base_price,
        handle: subServiceData.handle,
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

export const EditSubServiceA = async (
  editItem: any,
  setIsLoading: (value: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "subservices/update",
      method: "POST",
      data: {
        option_id: editItem.option_id,
        quantity_base: editItem.quantity_base,
        quantity_default: editItem.quantity_default,
        quantity_increment: editItem.quantity_increment,
        quantity_max: editItem.quantity_max,
        quantity_min: editItem.quantity_min,
        quantity_label: editItem.quantity_label,
        description: editItem.description,
        order_label: editItem.order_label,
        label: editItem.label,
        transport_fees: editItem.transport_fees,
        cost: editItem.cost,
        handle: editItem.handle,
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

export const DeleteSubService = async (
  deleteItem: any,
  setIsLoading: (value: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "subservices/delete",
      method: "POST",
      data: {
        option_id: deleteItem?.option_id,
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

export const updateSubServiceStatus = async (
  user: any,
  setIsLoading: (value: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "subservices/update/status",
      method: "POST",
      data: {
        option_id: user.id,
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

//Property List

export const LocationListS = async (
  location_id: string,
  page: number,
  limit: number,
  searchInput: any,
  setIsLoading: (val: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "serviceproperty/type/list",
      method: "POST",
      data: {
        search: searchInput,
        location_id: location_id,
        page: page,
        limit: limit,
      },
    });
    return response;
  } catch (error: any) {
  } finally {
    setIsLoading(false);
  }
};

export const AddLocationSA = async (
  location_id: string,
  locationData: any,
  setIsLoading: any
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "serviceproperty/add/cost",
      method: "POST",
      data: {
        location_id: location_id,
        order_label: locationData.order_label,
        label: locationData.label,
        cost: locationData.base_price,
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

export const EditPropertyA = async (
  editItem: any,
  setIsLoading: (value: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "serviceproperty/update/cost",
      method: "POST",
      data: {
        property_type_id: editItem.property_type_id,
        label: editItem.label,
        order_label: editItem.order_label,
        cost: editItem.cost,
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

export const DeleteProperty = async (
  deleteItem: any,
  setIsLoading: (value: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "serviceproperty/delete/cost",
      method: "POST",
      data: {
        property_type_id: deleteItem?.property_type_id,
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

export const updatePropertyStatus = async (
  user: any,
  setIsLoading: (value: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "serviceproperty/update/status",
      method: "POST",
      data: {
        property_type_id: user.id,
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
