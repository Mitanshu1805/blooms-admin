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
