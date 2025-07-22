import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ValidateId, ValidatePassword } from "../../helpers/Validators";
import { Login } from "./LoginApis";
import LoginComponent from "./LoginComponent";

function LoginController() {
  const navigate = useNavigate();
  const initialValues = { id: "", password: "" };
  const [loginData, setLoginData] = useState(initialValues);
  const [errors, setErrors] = useState(initialValues);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("auth_token")) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const LoginApi = async () => {
    const response = await Login(loginData, setIsLoading);
    console.log("response>>>", response);
    const rawPermissions = response?.data?.permissions || [];
    console.log("rawPermissions>", rawPermissions);

    if (response?.status === 200) {
      sessionStorage.setItem("auth_token", response?.data?.auth_token);
      sessionStorage.setItem("phone_number", response?.data?.phone_number);
      sessionStorage.setItem(
        "user_details",
        JSON.stringify(response?.data?.details)
      );
      // if (rawPermissions.length > 0) {
      //   const firstModuleName = rawPermissions[0]?.module_name;
      //   console.log("firstModuleName>", firstModuleName);
      //   if (firstModuleName) {
      //     navigate(firstModuleName);
      //   } else {
      //   }
      // }
      const skipModules = ["services", "sub_services"];
      const nextModule = rawPermissions.find(
        (perm: any) =>
          perm.module_name && !skipModules.includes(perm.module_name)
      );
      if (nextModule?.module_name) {
        navigate(`/${nextModule.module_name}`);
      } else {
        console.warn("No valid modules to navigate");
      }
      // navigate("/dashboard", { replace: true });
    }
  };

  const validator = () => {
    let newErrors: any = {};
    let isValid: boolean = true;
    const statusId = ValidateId(loginData.id);
    const statusPassword = ValidatePassword(loginData.password);
    if (statusId) {
      newErrors.id = statusId === 1 ? "User is Required" : "";
      isValid = false;
    }
    if (statusPassword) {
      newErrors.password =
        statusPassword === 1 ? "Password is Required" : "Invalid Password";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validator()) {
      LoginApi();
    }
  };

  return (
    <LoginComponent
      loginData={loginData}
      setLoginData={setLoginData}
      errors={errors}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
}

export default LoginController;
