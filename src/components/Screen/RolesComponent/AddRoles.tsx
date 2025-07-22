import { useState } from "react";
import { Button, Input } from "../..";
import RolesPermissionTable from "./RolesPermissionTable"; // create this

function AddRoles({
  userData,
  setUserData,
  errors,
  UserFormSubmitHandler,
  toggleUserPopup,
  isLoading,
  selectedPermissions,
  setSelectedPermissions,
  handleCheckboxChange,
}: any) {
  const handleSelectAll = () => {
    const permissionModules = [
      "sub_services",
      "roles",
      "pink_dates",
      "disable_timeslots",
    ];

    const allPermissions: Record<string, string[]> = {};

    permissionModules.forEach((module) => {
      allPermissions[module] = ["create", "read", "update", "delete"];
    });

    setSelectedPermissions(allPermissions);
    console.log("Selected All Permissions:", allPermissions);
  };

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
              <Input
                className={"add-details-input-container"}
                inputContainerClassName={"add-details-text-field-container"}
                label="Role Name"
                type="text"
                placeholder="Role Name"
                value={userData.role_name}
                onChange={(e: any) => {
                  setUserData((prev: any) => ({
                    ...prev,
                    role_name: e.target.value,
                  }));
                }}
                error={errors?.role_name}
              />
            </div>
          </div>

          {/* <div className="row justify-content-end mt-3">
            <div className="col-auto">
              <Button name="Select All" onClick={handleSelectAll} />
            </div>
          </div> */}
          <RolesPermissionTable
            handleCheckboxChange={handleCheckboxChange}
            selectedPermissions={selectedPermissions}
          />
        </div>

        <div className="underline" />
        <div className="flex-row-cen-cen-div">
          <Button
            isLoading={isLoading}
            className="add-details-submit-btn"
            name="Submit"
            onClick={UserFormSubmitHandler}
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
