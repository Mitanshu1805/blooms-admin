import { ValidateName, ValidatePercentage } from "../../helpers/Validators";

interface PropertyTypeOptionType {
  label: string;
  order_label: string;
  cost: string;
}
export interface PropertyType {
  label: string;
  description: string;
  options: PropertyTypeOptionType[];
}

export const AddServiceValidator = (
  serviceData: any,
  endTime: any,
  startTime: any,
  serviceImage: any,
  setErrors: any
) => {
  let newErrors: any = {};
  let isValid: boolean = true;
  const statusServiceName = ValidateName(serviceData.service_name);
  // const statusBasePrice = ValidateName(serviceData.base_price);
  const statusBasePrice = ValidateName(String(serviceData.cost));

  const statusServiceKey = ValidateName(serviceData.web_page_service_key);
  const statusEachSlot = ValidateName(serviceData.timing_of_each_slot);
  const statusWaiver = ValidateName(String(serviceData.waiver ?? ""));
  const validWaiver = ValidatePercentage(serviceData.waiver);
  const statusLastSlot = ValidateName(endTime);
  const statusFirstSlot = ValidateName(startTime);
  const statusImage = ValidateName(String(serviceImage.preview ?? ""));
  const propertyTypeValidationObj = validatePropertyType(
    serviceData.property_type
  );
  newErrors.property_type = propertyTypeValidationObj.error;
  isValid = propertyTypeValidationObj.isValid;
  if (statusServiceName) {
    newErrors.service_name =
      statusServiceName === 1 ? "Service Name is Required" : "";
    isValid = false;
  }

  if (statusBasePrice) {
    newErrors.cost = statusBasePrice === 1 ? "Price is Required" : "";
    isValid = false;
  }

  if (statusServiceKey) {
    newErrors.web_page_service_key =
      statusServiceKey === 1 ? "Service Key is Required" : "";
    isValid = false;
  }

  if (statusEachSlot) {
    newErrors.timing_of_each_slot =
      statusEachSlot === 1 ? "Timing of Each Slot is Required" : "";
    isValid = false;
  }

  if (statusLastSlot) {
    newErrors.last_slot = statusLastSlot === 1 ? "Last Slot is Required" : "";
    isValid = false;
  }

  if (statusFirstSlot) {
    newErrors.first_slot =
      statusFirstSlot === 1 ? "First Slot is Required" : "";
    isValid = false;
  }

  if (statusImage) {
    newErrors.image = statusImage === 1 ? "Service Image is Required" : "";
    isValid = false;
  }
  if (statusImage) {
    newErrors.image = statusImage === 1 ? "Service Image is Required" : "";
    isValid = false;
  }

  if (statusWaiver) {
    newErrors.waiver =
      statusWaiver === 1 ? "Commission Waiver is Required" : "";
    isValid = false;
  } else if (validWaiver) {
    newErrors.waiver = validWaiver === 1 ? "Commission Waiver is Invalid" : "";
    isValid = false;
  }

  setErrors(newErrors);

  console.log("🧪 Validation Check Results:");
  console.log("service_name", statusServiceName);
  console.log("cost", statusBasePrice);
  console.log("web_page_service_key", statusServiceKey);
  console.log("timing_of_each_slot", statusEachSlot);
  console.log("first_slot", statusFirstSlot);
  console.log("last_slot", statusLastSlot);
  console.log("waiver", statusWaiver);
  console.log("validWaiver", validWaiver);
  console.log("image", statusImage);
  console.log("property_type", propertyTypeValidationObj);
  console.log("Final isValid:", isValid);

  return isValid;
};

export const validateOnlyPropertyType = (
  propertyType: any,
  setErrors: (value: any) => void
) => {
  let isValid = true;
  let newErrors: any = {};

  const statusLabel = ValidateName(propertyType.label);
  const statusDescription = ValidateName(propertyType.description);

  if (statusLabel) {
    newErrors.label = statusLabel === 1 ? "Label is Required" : "";
    isValid = false;
  }

  if (statusDescription) {
    newErrors.description =
      statusDescription === 1 ? "Description is Required" : "";
    isValid = false;
  }
  setErrors(newErrors);
  return isValid;
};

export const validatePropertyType = (
  propertyType: PropertyType,
  isAllEmptyValidation: boolean = false
) => {
  let error = {
    label: "",
    description: "",
    options: [
      {
        label: "",
        order_label: "",
        cost: "",
      },
    ],
  };
  let isValid = true;
  if (propertyType) {
    if (
      propertyType.label?.trim() !== "" ||
      propertyType.description?.trim() !== "" ||
      propertyType.options.some((someItem) =>
        Object.values(someItem).some((innerSome) => innerSome?.trim() !== "")
      ) ||
      isAllEmptyValidation
    ) {
      if (propertyType.label?.trim() === "") {
        error.label = "Property label is Required";
      }
      if (propertyType.description?.trim() === "") {
        error.description = "Property description is Required";
      }
      propertyType.options.forEach((option, optionIndex) => {
        const optionValidationObj = validatePropertyTypeOption(option);
        error.options[optionIndex] = optionValidationObj.error;
        isValid = optionValidationObj.isValid;
      });
    }
  }
  return { error, isValid };
};

const validatePropertyTypeOption = (option: PropertyTypeOptionType) => {
  let error = {
    label: "",
    order_label: "",
    cost: "",
  };
  let isValid = true;
  if (option) {
    if (option.label?.trim() === "") {
      error.label = "Property option label is Required";
      isValid = false;
    }
    if (option.order_label?.trim() === "") {
      error.order_label = "Property option order label is Required";
      isValid = false;
    }
    if (option.cost?.trim() === "") {
      error.cost = "Property option cost is Required";
      isValid = false;
    }
  }
  return { error, isValid };
};

export const AddBrandValidator = (
  brandData: any,
  brandImage: any,
  setErrors: any
) => {
  let newErrors: any = {};
  let isValid: boolean = true;
  const statusServiceName = ValidateName(brandData);
  const statusImage = ValidateName(brandImage.preview);

  if (statusServiceName) {
    newErrors.brand_name =
      statusServiceName === 1 ? "Brand Name is Required" : "";
    isValid = false;
  }

  if (statusImage) {
    newErrors.image = statusImage === 1 ? "Brand Image is Required" : "";
    isValid = false;
  }

  setErrors(newErrors);
  return isValid;
};

export const AddModalValidator = (
  modalData: any,
  modalImage: any,
  setErrors: any
) => {
  let newErrors: any = {};
  let isValid: boolean = true;
  const statusServiceName = ValidateName(modalData);
  const statusImage = ValidateName(modalImage.preview);

  if (statusServiceName) {
    newErrors.model_name =
      statusServiceName === 1 ? "Model Name is Required" : "";
    isValid = false;
  }

  if (statusImage) {
    newErrors.image = statusImage === 1 ? "Model Image is Required" : "";
    isValid = false;
  }

  setErrors(newErrors);
  return isValid;
};

export const AddSubServiceValidator = (subServiceData: any, setErrors: any) => {
  let newErrors: any = {};
  let isValid: boolean = true;
  const statusBase = ValidateName(subServiceData.quantity_base);
  const statusBasePrice = ValidateName(subServiceData.base_price);
  const statusHandle = ValidateName(subServiceData.handle);
  const statusDefault = ValidateName(subServiceData.quantity_default);
  const statusIncrement = ValidateName(subServiceData.quantity_increment);
  const statusMax = ValidateName(subServiceData.quantity_max);
  const statusMin = ValidateName(subServiceData.quantity_min);
  const statusQLabel = ValidateName(subServiceData.quantity_label);
  const statusOLabel = ValidateName(subServiceData.order_label);
  const statusLabel = ValidateName(subServiceData.label);

  if (statusBase) {
    newErrors.quantity_base =
      statusBase === 1 ? "Base Quantity is Required" : "";
    isValid = false;
  }

  if (statusBasePrice) {
    newErrors.base_price = statusBasePrice === 1 ? "Price is Required" : "";
    isValid = false;
  }

  if (statusHandle) {
    newErrors.handle = statusHandle === 1 ? "Handle is Required" : "";
    isValid = false;
  }

  if (statusDefault) {
    newErrors.quantity_default =
      statusDefault === 1 ? "Default Quantity is Required" : "";
    isValid = false;
  }

  if (statusIncrement) {
    newErrors.quantity_increment =
      statusIncrement === 1 ? "Increment Quantity is Required" : "";
    isValid = false;
  }

  if (statusMax) {
    newErrors.quantity_max =
      statusMax === 1 ? "Maximum Quantity is Required" : "";
    isValid = false;
  }

  if (statusMin) {
    newErrors.quantity_min =
      statusMin === 1 ? "Minimum Quantity is Required" : "";
    isValid = false;
  }

  if (statusQLabel) {
    newErrors.quantity_label =
      statusQLabel === 1 ? "Quantity Label is Required" : "";
    isValid = false;
  }

  if (statusOLabel) {
    newErrors.order_label = statusOLabel === 1 ? "Order Label is Required" : "";
    isValid = false;
  }

  if (statusLabel) {
    newErrors.label = statusLabel === 1 ? "Label is Required" : "";
    isValid = false;
  }

  setErrors(newErrors);
  return isValid;
};

export const AddLocationValidator = (locationData: any, setErrors: any) => {
  let newErrors: any = {};
  let isValid: boolean = true;
  const statusOrderLabel = ValidateName(locationData.order_label);
  const statusLabel = ValidateName(locationData.label);
  const statusPrice = ValidateName(locationData.base_price);

  if (statusOrderLabel) {
    newErrors.order_label =
      statusOrderLabel === 1 ? "Order Label is Required" : "";
    isValid = false;
  }

  if (statusLabel) {
    newErrors.label = statusLabel === 1 ? "Label is Required" : "";
    isValid = false;
  }
  if (statusPrice) {
    newErrors.base_price = statusPrice === 1 ? "Price is Required" : "";
    isValid = false;
  }

  setErrors(newErrors);
  return isValid;
};
