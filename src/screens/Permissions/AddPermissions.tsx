import React, { useState } from "react";
import { Button } from "../../components"; // Adjust the import path if needed

interface AddPermissionModalProps {
  onClose: () => void;
  onSubmit: (selectedPermissions: string[]) => Promise<void>;
  moduleName: string;
  moduleId: string;
}

const PERMISSIONS = ["read", "write", "update", "delete"];

const AddPermissionModal: React.FC<AddPermissionModalProps> = ({
  onClose,
  onSubmit,
  moduleName,
}) => {
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleToggle = (permission: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission]
    );
    setError("");
  };

  const handleSubmit = async () => {
    if (selectedPermissions.length === 0) {
      setError("Please select at least one permission.");
      return;
    }

    setLoading(true);
    await onSubmit(selectedPermissions.map((p) => p.trim()));
    setLoading(false);
    onClose();
  };

  return (
    <div className="popup-box-wrapper">
      <div className="popup-box-container narrow-modal">
        <div className="flex-col-div">
          <span className="popup-box-title">
            ASSIGN PERMISSIONS TO: {moduleName}
          </span>
        </div>

        <div className="underline" />

        <div className="mt-4 px-4">
          {PERMISSIONS.map((permission) => (
            <div key={permission} className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                id={permission}
                checked={selectedPermissions.includes(permission)}
                onChange={() => handleToggle(permission)}
              />
              <label htmlFor={permission} className="capitalize">
                {permission}
              </label>
            </div>
          ))}
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        <div className="underline mt-4" />

        <div className="flex-row-cen-cen-div mt-3 gap-2">
          <Button
            name="Submit"
            onClick={handleSubmit}
            // disabled={loading}
            className="add-details-submit-btn"
          />
          <Button
            name="Cancel"
            onClick={onClose}
            className="add-details-cancel-btn"
          />
        </div>
      </div>
    </div>
  );
};

export default AddPermissionModal;
