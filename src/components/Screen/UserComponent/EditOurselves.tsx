import { Button, DatePickerComponent, Input } from "../..";
import { useEffect, useState } from "react";
import { RolesList } from "../../../screens/RolesAndRights/RolesApis";

function EditOurselves({
  errors,
  dateOfBirth,
  setDateOfBirth,
  joiningDate,
  setJoiningDate,
  editItem,
  setEditItem,
  OurselvesEditFormSubmitHandler,
  toggleEditOurselvesPopup,
}: // isLoading,
any) {
  const [rolesListData, setRolesListData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    const rolesDataResponse = await RolesList(10, 1, "", setIsLoading);
    setRolesListData(rolesDataResponse?.data?.data?.roles || []);
  };
  return (
    <div className="popup-box-wrapper">
      <div className="popup-box-container">
        <div className="flex-col-div">
          <span className="popup-box-title">EDIT USER DETAILS</span>
        </div>
        <div className="underline" />
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <Input
                className={"add-details-input-container"}
                inputContainerClassName={"add-details-text-field-container"}
                label="First Name"
                type="text"
                placeholder="First Name"
                value={editItem.first_name}
                onChange={(e: any) => {
                  setEditItem((prevValue: any) => ({
                    ...prevValue,
                    first_name: e.target.value,
                  }));
                }}
                error={errors?.first_name}
              />
            </div>

            <div className="col-md-4">
              <Input
                className={"add-details-input-container"}
                inputContainerClassName={"add-details-text-field-container"}
                label="Last Name"
                type="text"
                placeholder="Last Name"
                value={editItem.last_name}
                onChange={(e: any) => {
                  setEditItem((prevValue: any) => ({
                    ...prevValue,
                    last_name: e.target.value,
                  }));
                }}
                error={errors?.last_name}
              />
            </div>

            <div className="col-md-4">
              <Input
                className={"add-details-input-container"}
                inputContainerClassName={"add-details-text-field-container"}
                label="Email"
                type="text"
                placeholder="Email"
                value={editItem.email}
                onChange={(e: any) => {
                  setEditItem((prevValue: any) => ({
                    ...prevValue,
                    email: e.target.value,
                  }));
                }}
              />
            </div>

            <div className="col-md-4">
              <DatePickerComponent
                label={"Date of Birth"}
                selected={dateOfBirth}
                onChange={(value: any) => setDateOfBirth(value)}
              />
            </div>

            <div className="col-md-4">
              <Input
                className={"add-details-input-container"}
                inputContainerClassName={"add-details-text-field-container"}
                label="Service Type"
                type="text"
                placeholder="Service Type"
                value={editItem.service_type}
                onChange={(e: any) => {
                  setEditItem((prevValue: any) => ({
                    ...prevValue,
                    service_type: e.target.value,
                  }));
                }}
              />
            </div>

            <div className="col-md-4">
              <DatePickerComponent
                label={"Joining Date"}
                selected={joiningDate}
                onChange={(value: any) => setJoiningDate(value)}
              />
            </div>
            <div className="col-md-4">
              <Input
                className={"add-details-input-container"}
                inputContainerClassName={"add-details-text-field-container"}
                label="Employee Type"
                type="text"
                placeholder="Employee Type"
                value={editItem.employee_type}
                onChange={(e: any) => {
                  setEditItem((prevValue: any) => ({
                    ...prevValue,
                    employee_type: e.target.value,
                  }));
                }}
              />
            </div>

            <div className="col-md-4">
              <div className="add-details-input-container">
                <div className="add-details-text-field-container">
                  <label className="input-label">Role</label>
                  <select
                    className="form-control custom-select"
                    value={editItem.role_id}
                    onChange={(e) => {
                      setEditItem((prev: any) => ({
                        ...prev,
                        role_id: e.target.value,
                      }));
                    }}
                  >
                    <option value="">Select Role</option>
                    {rolesListData?.map((role: any) => (
                      <option key={role.role_id} value={role.role_id}>
                        {role.role_name}
                      </option>
                    ))}
                  </select>
                </div>
                {errors?.role_id && (
                  <span className="error-message">{errors.role_id}</span>
                )}
              </div>
            </div>

            <div className="col-md-4">
              <Input
                className={"add-details-input-container"}
                inputContainerClassName={"add-details-text-field-container"}
                label="Id Number"
                type="text"
                placeholder="Id Number"
                value={editItem.id_card}
                onChange={(e: any) => {
                  setEditItem((prevValue: any) => ({
                    ...prevValue,
                    id_card: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="col-md-4">
              <Input
                className={"add-details-input-container"}
                inputContainerClassName={"add-details-text-field-container"}
                label="Phone Number"
                type="text"
                placeholder="Phone Number"
                maxLength={10}
                value={editItem.phone_number}
                disabled
              />
            </div>
          </div>
        </div>
        <div className="underline" />
        <div className="flex-row-cen-cen-div">
          <Button
            isLoading={isLoading}
            className="add-details-submit-btn"
            name="Submit"
            onClick={OurselvesEditFormSubmitHandler}
          />

          <Button
            className="add-details-cancel-btn"
            name="Cancel"
            onClick={toggleEditOurselvesPopup}
          />
        </div>
      </div>
    </div>
  );
}

export default EditOurselves;
