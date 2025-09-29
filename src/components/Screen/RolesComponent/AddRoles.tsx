import { useState } from "react";
import { Button, Input } from "../..";
import RolesPermissionTable from "./RolesPermissionTable"; // create this

function AddRoles({
  userData,
  setUserData,
  errors,
  handleSubmit,
  toggleUserPopup,
  isLoading,
  selectedPermissions,
  setSelectedPermissions,
  handleCheckboxChange,
  mode,
  editItem,
  setEditItem,
}: any) {
  console.log(editItem);

  return (
    <div className="popup-box-wrapper">
      <div className="popup-box-container">
        <div className="flex-col-div">
          <span className="popup-box-title">ADD ROLES AND RIGHTS DETAILS</span>
        </div>
        <div className="underline" />

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-4">
              <h2>{mode === "edit" ? "Edit Role" : "Add Role"}</h2>
              <Input
                className={"add-details-input-container"}
                inputContainerClassName={"add-details-text-field-container"}
                label="Role Name"
                type="text"
                placeholder="Role Name"
                value={editItem.role_name || ""}
                onChange={(e: any) => {
                  setEditItem((prev: any) => ({
                    ...prev,
                    role_name: e.target.value,
                  }));
                }}
                error={errors?.role_name}
              />
            </div>
          </div>
          <RolesPermissionTable
            handleCheckboxChange={handleCheckboxChange}
            selectedPermissions={selectedPermissions}
            editItem={editItem}
          />
        </div>

        <div className="underline" />
        <div className="flex-row-cen-cen-div">
          <Button
            isLoading={isLoading}
            className="add-details-submit-btn"
            name="Submit"
            onClick={handleSubmit}
          />
          <Button
            className="add-details-cancel-btn"
            name="Cancel"
            onClick={toggleUserPopup}
          />
        </div>
      </div>
    </div>
  );
}

export default AddRoles;
