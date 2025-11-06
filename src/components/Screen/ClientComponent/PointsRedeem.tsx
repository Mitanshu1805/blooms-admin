import { useState } from "react";
import { Button, Input } from "../..";

function BlockClient({
  errors,
  UserPointsRedeemSubmitHandler,
  selectedClient,
  closeForm,
}: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [redeemPoints, setRedeemPoints] = useState<number | "">("");
  const [error, setError] = useState<string>("");

  const TotalPoints = selectedClient?.data?.loyalty_points?.total_points ?? 0;

  const handleRedeemSubmit = () => {
    if (!redeemPoints) {
      setError("Please enter points to redeem");
      return;
    }

    if (redeemPoints > TotalPoints) {
      setError(`You cannot redeem more than ${TotalPoints} points`);
      return;
    }

    setError("");
    setIsLoading(true);

    // Proceed with redeem action
    UserPointsRedeemSubmitHandler(
      redeemPoints,
      selectedClient?.data?.client_id
    );

    // Close popup or stop loader based on your flow
    setIsLoading(false);
    closeForm();
  };

  return (
    <div className="popup-box-wrapper">
      <div className="popup-box-container">
        <div className="flex-col-div">
          <span className="popup-box-title">REDEEM POINTS</span>
        </div>

        <div className="underline" />

        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <Input
                className="add-details-input-container"
                inputContainerClassName="add-details-text-field-container"
                label={`Points to Redeem (Available: ${TotalPoints})`}
                type="number"
                placeholder="Enter Points"
                value={redeemPoints}
                onChange={(e: any) => {
                  const value = e.target.value;
                  if (value === "") {
                    setRedeemPoints("");
                  } else {
                    setRedeemPoints(Number(value));
                  }
                  setError("");
                }}
                error={error}
              />
              {/* {error && (
                <span style={{ color: "red", fontSize: "13px" }}>{error}</span>
              )} */}
            </div>
          </div>
        </div>

        <div className="underline" />

        <div className="flex-row-cen-cen-div">
          <Button
            isLoading={isLoading}
            className="add-details-submit-btn"
            name="Submit"
            onClick={handleRedeemSubmit}
          />

          <Button
            className="add-details-cancel-btn"
            name="Cancel"
            onClick={closeForm}
          />
        </div>
      </div>
    </div>
  );
}

export default BlockClient;
