import { PassIcon, UserIcon } from "../../assets";
import { Input, SpinLoading } from "../../components";
import "./Login.scss";

function LoginComponent({
  handleSubmit,
  loginData,
  setLoginData,
  errors,
  isLoading,
}: any) {
  return (
    <div>
      <section className="login-main-container">
        <div className="card">
          <h2 className="al-title">Log In</h2>

          <Input
            label="Phone Number"
            type="text"
            placeholder="Phone Number"
            src={UserIcon}
            value={loginData.id}
            onChange={(e: any) =>
              setLoginData((prevValue: any) => ({
                ...prevValue,
                id: e.target.value,
              }))
            }
            error={errors?.id}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Password"
            src={PassIcon}
            value={loginData.password}
            onChange={(e: any) =>
              setLoginData((prevValue: any) => ({
                ...prevValue,
                password: e.target.value,
              }))
            }
            error={errors?.password}
          />
          <div className="button-container">
            <button className="button" onClick={handleSubmit}>
              {isLoading ? <SpinLoading /> : "LOG IN"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LoginComponent;
