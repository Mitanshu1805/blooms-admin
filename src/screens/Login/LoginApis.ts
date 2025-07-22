import { ApiCall } from "../../config";
import { AlertType, alertService } from "../../utils/alert.service";

export const Login = async (
  loginData: any,
  setIsLoading: (val: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "user/login",
      method: "POST",
      data: {
        username: loginData.id,
        password: loginData.password,
      },
    });

    if (response?.status === 200) {
      alertService.alert({
        type: AlertType.Success,
        message: response?.data?.message,
      });
      const rawPermissions = response?.data?.permissions || [];
      // console.log("response>>", response);

      // console.log("rawPermissions>>>>>", rawPermissions);

      const formattedPermissions: any = {};

      for (const element of response?.data?.permissions) {
        formattedPermissions[element.module_name] = element.permissions;
      }

      localStorage.setItem("permissions", JSON.stringify(formattedPermissions));
      localStorage.setItem("authToken", response?.data?.auth_token);

      return response;
    }
  } catch (error: any) {
    if (error?.data?.message) {
      alertService.alert({
        type: AlertType.Error,
        message: error?.data?.message,
      });
    }
    return error;
  } finally {
    setIsLoading(false);
  }
};

export const ChangePass = async (
  userData: any,
  setIsLoading: (val: boolean) => void
) => {
  try {
    setIsLoading(true);
    const response = await ApiCall({
      endpoint: "user/change/password",
      method: "POST",
      data: {
        old_password: userData.old_pass,
        new_password: userData.new_pass,
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
