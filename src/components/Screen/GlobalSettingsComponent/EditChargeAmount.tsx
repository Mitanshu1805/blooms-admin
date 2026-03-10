import { useEffect, useState } from "react";
import { Button, DatePickerComponent, Input } from "../..";
import { RolesList } from "../../../screens/RolesAndRights/RolesApis";

function AddChargeAmount({
  errors,
  editCharge,
  setEditCharge,
  ChargeEditFormSubmitHandler,
  toggleEditChargePopup,
  // isLoading,
  k,
}: any) {
  const [isLoading, setIsLoading] = useState(false);

  console.log("edit CHARGE >>");

  return (
    <div className="popup-box-wrapper">
      <div className="popup-box-container">
        <div className="flex-col-div">
          <span className="popup-box-title">EDIT CHARGE AMOUNT</span>
        </div>
        <div className="underline" />
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <Input
                className={"add-details-input-container"}
                inputContainerClassName={"add-details-text-field-container"}
                label="Charge Name"
                type="text"
                placeholder="Charge Name"
                value={editCharge?.charge_name}
                onChange={(e: any) => {
                  setEditCharge((prevValue: any) => ({
                    ...prevValue,
                    charge_name: e.target.value,
                  }));
                }}
                error={errors?.charge_name}
              />
            </div>

            <div className="col-md-4">
              <Input
                className={"add-details-input-container"}
                inputContainerClassName={"add-details-text-field-container"}
                label="Charge Amount"
                type="text"
                placeholder="Charge Amount"
                maxLength={10}
                value={editCharge?.charge_amount}
                onChange={(e: any) => {
                  setEditCharge((prevValue: any) => ({
                    ...prevValue,
                    charge_amount: e.target.value,
                  }));
                }}
                error={errors?.charge_amount}
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
            onClick={ChargeEditFormSubmitHandler}
          />

          <Button
            className="add-details-cancel-btn"
            name="Cancel"
            onClick={toggleEditChargePopup}
          />
        </div>
      </div>
    </div>
  );
}

export default AddChargeAmount;
