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
    if (response?.status === 200) {
      sessionStorage.setItem("auth_token", response?.data?.auth_token);
      sessionStorage.setItem("phone_number", response?.data?.phone_number);
      navigate("/dashboard", { replace: true });
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
