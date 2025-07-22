import React, { useState } from "react";
import "./ChangePassModal.scss";
import { Eye, EyeOff } from "lucide-react";
import { ChangePass } from "../../screens/Login/LoginApis";

const ChangePasswordModal = ({ isOpen, onClose }: any) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [errors, setErrors] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleSave = async () => {
    const newErrors = { current: "", new: "", confirm: "" };
    let hasError = false;

    if (newPassword !== confirmPassword) {
      newErrors.confirm = "New and Confirm Passwords do not match.";
      hasError = true;
    }

    if (
      !/^(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}$/.test(
        newPassword
      )
    ) {
      newErrors.new = "Invalid Password ";
      hasError = true;
    }

    if (currentPassword === newPassword) {
      newErrors.new = "New password cannot be same as current.";
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) return;

    const userData = {
      old_pass: currentPassword,
      new_pass: newPassword,
    };

    await ChangePass(userData, () => {});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Change Password</h3>

        <div className="modal-form">
          <label>Current Password</label>
          <div className="input-icon-wrapper">
            <input
              type={showCurrentPass ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
            />

            <span
              className="eye-icon"
              onClick={() => setShowCurrentPass((prev) => !prev)}
            >
              {showCurrentPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>
          {errors.current && <p className="error-text">{errors.current}</p>}
          <label>New Password</label>
          <div className="input-icon-wrapper">
            <input
              type={showNewPass ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />

            <span
              className="eye-icon"
              onClick={() => setShowNewPass((prev) => !prev)}
            >
              {showNewPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>
          {errors.new && <p className="error-text">{errors.new}</p>}
          <label>Confirm New Password</label>
          <div className="input-icon-wrapper">
            <input
              type={showConfirmPass ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
            />

            <span
              className="eye-icon"
              onClick={() => setShowConfirmPass((prev) => !prev)}
            >
              {showConfirmPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>
          {errors.confirm && <p className="error-text">{errors.confirm}</p>}
          <div className="modal-actions">
            {/* <button onClick={onClose} className="cancel-btn">
              Cancel
            </button> */}
            <button
              onClick={() => {
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
                setErrors({ current: "", new: "", confirm: "" });
                onClose();
              }}
              className="cancel-btn"
            >
              Cancel
            </button>

            <button onClick={handleSave} className="save-btn">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
