import { ApiCall } from "../../config";
import { AlertType, alertService } from "../../utils/alert.service";

export const handleSuccess = (response: any) => {
  if (response?.status === 200) {
    alertService.alert({
      type: AlertType.Success,
      message: response?.data?.message,
    });
  }
};

export const handleError = (error: any) => {
  if (error?.data?.message) {
    alertService.alert({
      type: AlertType.Error,
      message: error?.data?.message || "Something went wrong",
    });
  }
};

export const PermissionModuleAdd = async (
  module_name: string,
  setIsLoading: (val: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "permission/module/add",
      method: "POST",
      data: {
        module_name,
      },
    });
    handleSuccess(response);
    return response;
  } catch (error: any) {
    handleError(error);
  } finally {
    setIsLoading(false);
  }
};

export const PermissionModuleDelete = async (
  module_id: string,
  setIsLoading: (val: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "permission/module/delete",
      method: "DELETE",
      data: {
        module_id,
      },
    });
    handleSuccess(response);
    return response;
  } catch (error: any) {
    handleError(error);
  } finally {
    setIsLoading(false);
  }
};

export const PermissionAdd = async (
  module_id: string,
  permission_type: string,
  setIsLoading: (val: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "permission/add",
      method: "POST",
      data: {
        module_id,
        permission_type,
      },
    });
    handleSuccess(response);
    return response;
  } catch (error: any) {
    handleError(error);
  } finally {
    setIsLoading(false);
  }
};

export const PermissionList = async (setIsLoading: (val: boolean) => void) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "permission/list",
      method: "GET",
    });
    handleSuccess(response);
    return response;
  } catch (error: any) {
    handleError(error);
  } finally {
    setIsLoading(false);
  }
};

export const PermissionDelete = async (
  permission_id: string,
  setIsLoading: (val: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "permission/delete",
      method: "DELETE",
      data: {
        permission_id,
      },
    });
    handleSuccess(response);
    return response;
  } catch (error: any) {
    handleError(error);
  } finally {
    setIsLoading(false);
  }
};

export const PermissionAssign = async (
  user_id: string,
  permission_ids: [],
  setIsLoading: (val: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "permission/assign",
      method: "PUT",
      data: {
        user_id,
        permission_ids,
      },
    });
    handleSuccess(response);
    return response;
  } catch (error: any) {
    handleError(error);
  } finally {
    setIsLoading(false);
  }
};
