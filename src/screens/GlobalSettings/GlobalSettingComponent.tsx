import moment from "moment";
import { DropDown, Input } from "../../components";

import TimePicker from "react-time-picker";
import { hasPermission } from "../../utils/permissions.utils";
import { useState, useEffect } from "react";

interface GlobalSettingProps {
  timelimit: any;
  cancellationTimeLimit: any;
  handleTimelimitChange: (val: any) => void;
  handleTimeSlotController: (val: any) => void;
  globalTimelimitSubmitHandler: (val: any) => void;
  chargeAmountList: any;
  toggleUserPopup: any;
  onDeleteHandler: any;
  onEditHandler: any;
}

function GlobalSettingComponent({
  timelimit,
  cancellationTimeLimit,
  handleTimeSlotController,
  handleTimelimitChange,
  globalTimelimitSubmitHandler,
  chargeAmountList,
  toggleUserPopup,
  onDeleteHandler,
  onEditHandler,
}: GlobalSettingProps) {
  const canUpdate = hasPermission("setting", "update");
  const canDelete = hasPermission("setting", "delete");
  const canView = hasPermission("setting", "read");

  const [localCancellationLimit, setLocalCancellationLimit] = useState("");

  useEffect(() => {
    setLocalCancellationLimit(cancellationTimeLimit || "");
  }, [cancellationTimeLimit]);

  if (!canView) {
    return <div>You do not have permission to view this page.</div>;
  }

  console.log(cancellationTimeLimit);
  console.log(localCancellationLimit);
  console.log(chargeAmountList);

  return (
    <div>
      <div className="details-list-card card">
        <div className="details-list-top">
          <div className="details-list-top-left">
            <span className="details-list-top-left-title">TIME SLOTS</span>
          </div>
        </div>
        <div className="selected-month">
          <label className="inputText-label" htmlFor={"First Slot"}>
            Global Booking Time Limit
          </label>
          <div className="add-details-input-container">
            <TimePicker
              className={"time-picker-input-container"}
              id="start-time"
              value={timelimit}
              onChange={handleTimelimitChange}
              format={"HH:mm"}
              clockIcon={true}
              disableClock={true}
            />
            {canUpdate && (
              <button
                onClick={globalTimelimitSubmitHandler}
                className="month-button"
              >
                <div className="month-card selected">Save</div>
              </button>
            )}
          </div>
        </div>
      </div>
      <div>
        {/* ---------------- CANCELLATION LIMIT ---------------- */}
        <div className="details-list-card card">
          <div className="details-list-top">
            <div className="details-list-top-left">
              <span className="details-list-top-left-title">
                Cancellation Limit
              </span>
            </div>
          </div>

          <div className="details-list-table">
            <div className="add-details-input-container">
              <div className="d-flex flex-row align-items-center gap-2">
                <Input
                  // type="number"
                  style={{ width: "80px" }}
                  placeholder={"Enter Cancellation time slot"}
                  value={localCancellationLimit.replace("d", "")}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setLocalCancellationLimit(e.target.value)
                  }
                />
                <span style={{ paddingBottom: "20px" }}>Days</span>

                {canUpdate && (
                  <button
                    onClick={() =>
                      handleTimeSlotController(
                        localCancellationLimit
                          ? `${localCancellationLimit}d`
                          : "",
                      )
                    }
                    className="month-button"
                    style={{ marginBottom: "20px" }} // aligns with Days
                  >
                    <div className="month-card selected">Update</div>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="details-list-card card">
        <div className="details-list-top">
          <div className="details-list-top-left">
            <div className="d-flex justify-content-between align-items-center w-100">
              <span className="details-list-top-left-title">
                CHARGE AMOUNTS
              </span>

              {canUpdate && (
                <div
                  className="month-card selected"
                  onClick={() => toggleUserPopup()}
                >
                  Add
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="details-list-table">
          <table className="table">
            <thead
              style={{
                backgroundColor: "#fd8f82",
                color: "#ffffff",
                borderColor: "#343a40",
              }}
            >
              <tr>
                <th style={{ border: "1px solid #454d55", padding: "10px" }}>
                  #
                </th>
                <th style={{ border: "1px solid #454d55", padding: "10px" }}>
                  Charge Name
                </th>
                <th style={{ border: "1px solid #454d55", padding: "10px" }}>
                  Charge Amount
                </th>
                <th style={{ border: "1px solid #454d55", padding: "10px" }}>
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {chargeAmountList?.data?.length > 0 ? (
                chargeAmountList?.data?.map((charge: any, index: number) => (
                  <tr key={charge.charge_id}>
                    <td>{index + 1}</td>
                    <td>{charge.charge_name}</td>
                    <td>{charge.charge_amount}</td>
                    <td>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button
                          className="btn btn-sm btn-primary"
                          style={{
                            backgroundColor: "#2196f3",
                            padding: "0px 15px",
                          }}
                          onClick={() => onEditHandler(charge)}
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-sm btn-danger"
                          style={{ backgroundColor: "#f44336" }}
                          onClick={() => onDeleteHandler(charge)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center">
                    No charges found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default GlobalSettingComponent;
