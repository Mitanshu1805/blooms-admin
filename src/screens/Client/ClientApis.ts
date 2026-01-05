import { ApiCall } from "../../config";
import { AlertType, alertService } from "../../utils/alert.service";

export const ClientList = async (
  size: number,
  selectedPage: number,
  searchInput: string,
  setIsLoading: (val: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "client/list",
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

export const AddClientA = async (
  rolesData: any,
  setIsLoading: (val: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "client/add",
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

export const EditClientA = async (
  editItem: any,
  setIsLoading: (val: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "client/update",
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

export const DeleteClient = async (
  deleteItem: any,
  setIsLoading: (val: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "client/delete",
      method: "POST",
      data: {
        client_id: deleteItem?.client_id,
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

export const updateClientStatus = async (
  user: any,
  setIsLoading: (value: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "client/status",
      method: "POST",
      data: {
        client_id: user.id,
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

export const BlockClient = async (
  blockItem: any,
  setIsLoading: (val: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "client/block",
      method: "POST",
      data: {
        client_id: blockItem?.client_id,
        reason: blockItem?.reason,
        time_period: blockItem?.time_period,
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

export const UnblockClient = async (
  client_id: string,
  setIsLoading: (val: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "client/unblock",
      method: "PUT",
      data: {
        client_id: client_id,
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

export const ClientBlockList = async (
  client_id: string,
  setIsLoading: (val: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "client/blocklist",
      method: "POST",
      data: {
        client_id: client_id,
      },
    });
    if (response?.status === 200) {
      // alertService.alert({
      //   type: AlertType.Success,
      //   message: response?.data?.message,
      // });
    }
    return response;
  } catch (error: any) {
    if (error?.data?.message) {
      // alertService.alert({
      //   type: AlertType.Error,
      //   message: error?.data?.message,
      // });
    }
  } finally {
    setIsLoading(false);
  }
};

export const PointRedeem = async (
  client_id: string,
  points_to_redeem: string,
  setIsLoading: (val: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "client/loyalty/point/redeem",
      method: "POST",
      data: {
        client_id: client_id,
        points_to_redeem: points_to_redeem,
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

export const ClientExport = async (setIsLoading: (val: boolean) => void) => {
  try {
    setIsLoading(true);

    const response = await ApiCall({
      endpoint: "client/export",
      method: "GET",
      responseType: "blob", // 🔥 REQUIRED
    });

    const blob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "clients.xlsx"; // 👈 Excel file
    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error: any) {
    alertService.alert({
      type: AlertType.Error,
      message: error?.response?.data?.message || "Failed to export clients",
    });
  } finally {
    setIsLoading(false);
  }
};
