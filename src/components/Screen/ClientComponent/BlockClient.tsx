import { useEffect, useState } from "react";
import { Button, DatePickerComponent, Input } from "../..";
import { RolesList } from "../../../screens/RolesAndRights/RolesApis";

function BlockClient({
  blockClientData,
  setBlockClientData,
  errors,
  UserFormSubmitHandler,
  toggleUserPopup,
  UserBlockFormSubmitHandler,
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
          <span className="popup-box-title">BLOCK CLIENT</span>
        </div>
        <div className="underline" />
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <Input
                className={"add-details-input-container"}
                inputContainerClassName={"add-details-text-field-container"}
                label="Reason"
                type="text"
                placeholder="Reason"
                value={blockClientData.reason}
                onChange={(e: any) => {
                  setBlockClientData((prevValue: any) => ({
                    ...prevValue,
                    reason: e.target.value,
                  }));
                }}
                error={errors?.reason}
              />
            </div>

            <div className="col-md-4">
              <div className="add-details-input-container">
                <div className="add-details-text-field-container">
                  <label className="input-label">Time Period</label>
                  <div className="d-flex align-items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      className="form-control"
                      placeholder="Enter number"
                      value={blockClientData.time_value || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        setBlockClientData((prev: any) => ({
                          ...prev,
                          time_value: value,
                          time_period:
                            value && prev.time_unit
                              ? `${value} ${prev.time_unit}`
                              : "",
                        }));
                      }}
                    />
                    <select
                      className="form-control"
                      value={blockClientData.time_unit || ""}
                      onChange={(e) => {
                        const unit = e.target.value;
                        setBlockClientData((prev: any) => ({
                          ...prev,
                          time_unit: unit,
                          time_period: prev.time_value
                            ? `${prev.time_value} ${unit}`
                            : "",
                        }));
                      }}
                    >
                      <option value="">Select</option>
                      <option value="day">Day(s)</option>
                      <option value="week">Week(s)</option>
                      <option value="month">Month(s)</option>
                      <option value="year">Year(s)</option>
                    </select>
                  </div>
                </div>
                {errors?.time_period && (
                  <span className="error-message">{errors.time_period}</span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="underline" />
        <div className="flex-row-cen-cen-div">
          <Button
            isLoading={isLoading}
            className="add-details-submit-btn"
            name="Submit"
            onClick={UserBlockFormSubmitHandler}
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

export default BlockClient;
