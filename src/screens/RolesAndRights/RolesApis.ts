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
      method: "GET",
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
  permissions: any,
  setIsLoading: (val: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "role/create",
      method: "POST",
      data: {
        role_name: rolesData.role_name,
        permissions: permissions,
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
        permissions: editItem.permissions,
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

export const AssignRoles = async (
  assignItem: any,
  setIsLoading: (val: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "role/assign",
      method: "POST",
      data: {
        role_id: assignItem?.role_id,
        user_id: assignItem?.user_id,
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
      method: "DELETE",
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

export const ModulesList = async (
  size: number,
  selectedPage: number,
  searchInput: string,
  setIsLoading: (val: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "module/list",
      method: "GET",
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
