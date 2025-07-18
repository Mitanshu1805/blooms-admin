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

      // ✅ Extract permissions and store
      const rawPermissions = response?.data?.permissions || [];

      console.log("rawPermissions>>>>>", rawPermissions);

      // Convert to object like: { User: ["read", "write", "update", "delete"] }
      const formattedPermissions: Record<string, string[]> = {};

      rawPermissions.forEach((perm: any) => {
        const moduleName = perm.module_name;
        const perms = perm.permissions
          ?.replace(/[{}]/g, "") // remove { and }
          .split(",")
          .map((p: string) => p.trim());

        formattedPermissions[moduleName] = perms;
      });

      localStorage.setItem("permissions", JSON.stringify(formattedPermissions));
      localStorage.setItem("authToken", response?.data?.auth_token); // if not already
      console.log("Stored permissions:", formattedPermissions);
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
