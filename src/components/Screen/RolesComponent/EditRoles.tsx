import { Button, DropDown, Input } from "../..";
import RolesPermissionTable from "./RolesPermissionTable";

function EditRoles({
  editItem,
  setEditItem,
  errors,
  UserFormSubmitHandler,
  toggleUserPopup,
  isLoading,
  handleCheckboxChange,
  selectedPermissions,
}: any) {
  // console.log("editItem>>", editItem);
  return (
    <div className="popup-box-wrapper">
      <div className="popup-box-container">
        <div className="flex-col-div">
          <span className="popup-box-title">EDIT ROLES AND RIGHTS DETAILS</span>
        </div>
        <div className="underline" />
        <div className="container">
          <div className="row">
            <div className="row justify-content-center">
              <div className="col-md-4">
                <Input
                  className={"add-details-input-container"}
                  inputContainerClassName={"add-details-text-field-container"}
                  label="Role Name"
                  type="text"
                  placeholder="Role Name"
                  value={editItem.role_name}
                  onChange={(e: any) => {
                    setEditItem((prevValue: any) => ({
                      ...prevValue,
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

export default EditRoles;
