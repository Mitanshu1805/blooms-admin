import { ApiCall } from "../../config";
import { AlertType, alertService } from "../../utils/alert.service";

export const UserList = async (
  page: number,
  limit: number,
  setIsLoading: (val: boolean) => void,
  searchInput: string
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "user/list",
      method: "POST",
      data: {
        page,
        limit,
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

export const AddUserA = async (
  userData: any,
  dateOfBirth: any,
  joiningDate: any,
  setIsLoading: (val: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "user/register",
      method: "POST",
      data: {
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        password: userData.password,
        phone_number: userData.phone_number,
        dob: dateOfBirth,
        joining_date: joiningDate,
        employee_type: userData.employee_type,
        service_type: userData.service_type,
        role: userData.role,
        id_card: userData.id_card,
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
    setIsLoading(false);
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

export const EditUserA = async (
  editItem: any,
  dateOfBirth: any,
  joiningDate: any,
  setIsLoading: (val: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "user/edit",
      method: "POST",
      data: {
        user_id: editItem.user_id,
        first_name: editItem.first_name,
        last_name: editItem.last_name,
        email: editItem.email,
        password: editItem.password,
        confirm_password: editItem.confirm_password,
        phone_number: editItem.phone_number,
        dob: dateOfBirth,
        joining_date: joiningDate,
        employee_type: editItem.employee_type,
        service_type: editItem.service_type,
        role: editItem.role,
        id_card: editItem.id_card,
      },
    });
    if (response?.status === 200) {
      const errorMessage = response?.data?.message.toString();
      alertService.alert({
        type: AlertType.Success,
        message: errorMessage,
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

export const DeleteUser = async (
  deleteItem: any,
  setIsLoading: (val: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "user/delete",
      method: "POST",
      data: {
        user_id: deleteItem?.user_id,
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

export const updateUserStatus = async (
  user: any,
  setIsLoading: (value: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "user/status",
      method: "POST",
      data: {
        user_id: user.id,
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
