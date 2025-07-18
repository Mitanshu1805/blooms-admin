import React, { useState } from "react";
import { Button, Input } from "../../components"; // Adjust the import path if needed

interface AddPermissionModalProps {
  onClose: () => void;
  onSubmit: (moduleName: string) => Promise<void>;
}

const AddPermissionModal: React.FC<AddPermissionModalProps> = ({
  onClose,
  onSubmit,
}) => {
  const [moduleName, setModuleName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!moduleName.trim()) {
      setError("Module name is required");
      return;
    }
    await onSubmit(moduleName.trim());
    onClose();
  };

  return (
    <div className="popup-box-wrapper">
      <div
        className="popup-box-container"
        style={{ maxWidth: "400px", width: "100%", margin: "auto" }}
      >
        <div className="flex-col-div">
          <span className="popup-box-title">ADD MODULE</span>
        </div>
        <div className="underline" />
        <div className="mt-3 px-4">
          <Input
            label="Module Name"
            type="text"
            placeholder="Enter module name"
            value={moduleName}
            onChange={(e: any) => {
              setModuleName(e.target.value);
              setError("");
            }}
            error={error}
            className="add-details-input-container"
            inputContainerClassName="add-details-text-field-container"
          />
        </div>
        <div className="underline mt-4" />
        <div className="flex-row-cen-cen-div mt-3 gap-2">
          <Button
            name="Submit"
            className="add-details-submit-btn"
            onClick={handleSubmit}
          />
          <Button
            name="Cancel"
            className="add-details-cancel-btn"
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default AddPermissionModal;
