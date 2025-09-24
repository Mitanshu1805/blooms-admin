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
}

function GlobalSettingComponent({
  timelimit,
  cancellationTimeLimit,
  handleTimeSlotController,
  handleTimelimitChange,
  globalTimelimitSubmitHandler,
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
                          : ""
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
    </div>
  );
}

export default GlobalSettingComponent;
