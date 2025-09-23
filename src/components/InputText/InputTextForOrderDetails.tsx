import React, { useState } from "react";
import "./InputText.scss";
import { RemoveIcon } from "../../assets";
import Image from "../Image/Image";

export default function InputText({
  type,
  placeholder,
  value,
  onChange,
  className,
  label,
  disabled,
  error,
  src,
  style,
  min,
  max,
  inputContainerClassName,
}: any) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className={`inputText-input-wrapper-odc ${className ? className : ""}`}
    >
      <label className="inputText-label-odc" htmlFor={label}>
        {label}
      </label>
      <div
        className={`inputText-input-container ${inputContainerClassName ?? ""}`}
        style={style}
      >
        <Image src={src} />
        <input
          className="inputText-input"
          type={type === "password" ? (showPassword ? "text" : type) : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          maxLength={max}
          minLength={min}
        />
        {type === "password" && (
          <i
            className={`fa  password-eye ${
              showPassword ? "fa-eye" : "fa-eye-slash"
            }`}
            onClick={togglePassword}
          />
        )}
      </div>
      {error ? (
        <div className="inputText-error-container">
          <Image className="inputText-img" src={RemoveIcon} />
          <span>{error}</span>
        </div>
      ) : null}
    </div>
  );
}
