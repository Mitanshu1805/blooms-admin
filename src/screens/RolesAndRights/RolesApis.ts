import { ApiCall } from "../../config";
import { AlertType, alertService } from "../../utils/alert.service";

export const RolesList = async (
  size: number,
  selectedPage: number,
  searchInput: string,
  setIsLoading: (val: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "role/list",
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

export const AddRolesA = async (
  rolesData: any,
  setIsLoading: (val: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "role/create",
      method: "POST",
      data: {
        role_name: rolesData.role_name,
        role_code: rolesData.role_code,
        access_type: rolesData.access_type,
        permission_type: rolesData.permission_type,
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

export const EditRolesA = async (
  editItem: any,
  setIsLoading: (val: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "role/update",
      method: "POST",
      data: {
        role_id: editItem.role_id,
        role_name: editItem.role_name,
        role_code: editItem.role_code,
        access_type: editItem.access_type,
        permission_type: editItem.permission_type,
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

export const DeleteRoles = async (
  deleteItem: any,
  setIsLoading: (val: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "role/delete",
      method: "POST",
      data: {
        role_id: deleteItem?.role_id,
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
