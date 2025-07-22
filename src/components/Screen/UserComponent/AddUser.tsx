import { useEffect, useState } from "react";
import { Button, DatePickerComponent, Input } from "../..";
import { RolesList } from "../../../screens/RolesAndRights/RolesApis";

function AddUser({
  userData,
  setUserData,
  errors,
  UserFormSubmitHandler,
  toggleUserPopup,
  dateOfBirth,
  setDateOfBirth,
  joiningDate,
  setJoiningDate,
  // isLoading,
  k,
}: any) {
  const [selectedPage, setSelectedPage] = useState(1);
  const [size, setSize] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rolesListData, setRolesListData] = useState<any>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const rolesDataResponse = await RolesList(
      size,
      selectedPage,
      searchInput,
      setIsLoading
    );
    setRolesListData(rolesDataResponse?.data?.data?.roles);
  };

  // console.log("rolesListData>>", rolesListData);

  return (
    <div className="popup-box-wrapper">
      <div className="popup-box-container">
        <div className="flex-col-div">
          <span className="popup-box-title">ADD USER DETAILS</span>
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
                value={userData.first_name}
                onChange={(e: any) => {
                  setUserData((prevValue: any) => ({
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
                value={userData.last_name}
                onChange={(e: any) => {
                  setUserData((prevValue: any) => ({
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
                value={userData.email}
                onChange={(e: any) => {
                  setUserData((prevValue: any) => ({
                    ...prevValue,
                    email: e.target.value,
                  }));
                }}
                error={errors?.email}
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
                value={userData.phone_number}
                onChange={(e: any) => {
                  setUserData((prevValue: any) => ({
                    ...prevValue,
                    phone_number: e.target.value,
                  }));
                }}
                error={errors?.phone_number}
              />
            </div>

            <div className="col-md-4">
              <Input
                className={"add-details-input-container"}
                inputContainerClassName={"add-details-text-field-container"}
                label="Password"
                type="password"
                placeholder="Password"
                value={userData.password}
                onChange={(e: any) => {
                  setUserData((prevValue: any) => ({
                    ...prevValue,
                    password: e.target.value,
                  }));
                }}
                error={errors?.password}
              />
            </div>

            <div className="col-md-4">
              <Input
                className={"add-details-input-container"}
                inputContainerClassName={"add-details-text-field-container"}
                label="Confirm Password"
                type="password"
                placeholder="Confirm Password"
                value={userData.confirm_password}
                onChange={(e: any) => {
                  setUserData((prevValue: any) => ({
                    ...prevValue,
                    confirm_password: e.target.value,
                  }));
                }}
                error={errors?.confirm_password}
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
                value={userData.service_type}
                onChange={(e: any) => {
                  setUserData((prevValue: any) => ({
                    ...prevValue,
                    service_type: e.target.value,
                  }));
                }}
                error={errors?.service_type}
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
                value={userData.employee_type}
                onChange={(e: any) => {
                  setUserData((prevValue: any) => ({
                    ...prevValue,
                    employee_type: e.target.value,
                  }));
                }}
                error={errors?.employee_type}
              />
            </div>

            <div className="col-md-4">
              <div className="add-details-input-container">
                <div className="add-details-text-field-container">
                  <label className="input-label">Role</label>
                  <select
                    className="form-control"
                    value={userData.role_id}
                    onChange={(e) => {
                      setUserData((prev: any) => ({
                        ...prev,
                        role_id: e.target.value,
                      }));
                    }}
                  >
                    <option value="">Select Role</option>
                    {rolesListData?.map((role: any) => (
                      <option value={role.role_id} key={role.role_id}>
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
                value={userData.id_card}
                onChange={(e: any) => {
                  setUserData((prevValue: any) => ({
                    ...prevValue,
                    id_card: e.target.value,
                  }));
                }}
                error={errors?.id_card}
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

export default AddUser;
