import moment from "moment";
import { DropDown, Input } from "../../components";
import "./TimeSlot.scss";
import TimePicker from "react-time-picker";
import { hasPermission } from "../../utils/permissions.utils";
import { useState, useEffect } from "react";
// import ToggleComponent from "../../components/Toggle/Toggle";
import ToggleComp from "../../components/Toggle/ToggleComp";

interface TimeSlotsProps {
  territoryOptions: any;
  setLocation_id: (val: any) => void;
  serviceOptions: any;
  setService_id: (val: any) => void;
  months: any;
  handleMonthSelect: any;
  selectedMonth: any;
  renderDates: any;
  format: any;
  isNotSelected: boolean;
  location_id: any;
  timelimit: any;
  cancellationTimeLimit: any;
  handleTimelimitChange: (val: any) => void;
  handleTimeSlotController: (val: any) => void;
  globalTimelimitSubmitHandler: (val: any) => void;
  handleSwitchChange: any;
  sameDayBooking: any;
  setSameDayBooking: any;
  selectedService: any;
}

function TimeSlotComponent({
  territoryOptions,
  setLocation_id,
  serviceOptions,
  setService_id,
  months,
  handleMonthSelect,
  selectedMonth,
  renderDates,
  format,
  isNotSelected,
  location_id,
  timelimit,
  cancellationTimeLimit,
  handleTimeSlotController,
  handleTimelimitChange,
  globalTimelimitSubmitHandler,
  sameDayBooking,
  setSameDayBooking,
  selectedService,
  handleSwitchChange,
}: TimeSlotsProps) {
  const canUpdate = hasPermission("disable_timeslots", "update");
  const canDelete = hasPermission("disable_timeslots", "delete");
  const canView = hasPermission("disable_timeslots", "read");

  const [localCancellationLimit, setLocalCancellationLimit] = useState("");

  useEffect(() => {
    setLocalCancellationLimit(cancellationTimeLimit || "");
  }, [cancellationTimeLimit]);

  if (!canView) {
    return <div>You do not have permission to view this page.</div>;
  }

  console.log(serviceOptions, selectedService);

  return (
    <div>
      <div className="details-list-card card">
        <div className="details-list-top">
          <div className="details-list-top-left">
            <span className="details-list-top-left-title">TIME SLOTS</span>
          </div>
        </div>

        <div className="details-list-table">
          <div className="dropdown-container">
            <DropDown
              style={{ width: "300px" }}
              label={"Select Territory"}
              onChange={(e: any) => {
                setLocation_id(e.target.value);
              }}
              data={territoryOptions}
            />
            <div className="second-dropdown">
              <DropDown
                style={{ width: "300px" }}
                label={"Select Service"}
                onChange={(e: any) => {
                  setService_id(e.target.value);
                }}
                data={location_id ? serviceOptions : ""}
              />
            </div>
          </div>
          {location_id && selectedService?.value && (
            <div
              style={{
                marginTop: "15px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              {/* <span>Allow Same Day Booking:</span> */}

              <ToggleComp
                checked={selectedService?.sameday_booking}
                onChange={(value: boolean) => {
                  setSameDayBooking(value);
                  handleSwitchChange(
                    selectedService?.value,
                    location_id,
                    value,
                  );
                }}
              />
            </div>
          )}

          {isNotSelected && (
            <div className="months-container">
              {months.map((month: any, index: number) => (
                <button
                  key={index}
                  onClick={() => handleMonthSelect(month)}
                  className="month-button"
                >
                  <div
                    className={
                      moment(selectedMonth).format("DD-MM-YYYY") ===
                      moment(month).format("DD-MM-YYYY")
                        ? "month-card selected"
                        : "month-card"
                    }
                  >
                    {format(month, "MMMM yyyy")}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
        {selectedMonth && (
          <div className="selected-month">
            <h4>{format(selectedMonth, "MMMM yyyy")}</h4>
            {renderDates(selectedMonth)}
          </div>
        )}

        {selectedMonth && (
          <div className="selected-month">
            <h4>{format(selectedMonth, "MMMM yyyy")}</h4>
            {renderDates(selectedMonth)}
          </div>
        )}
      </div>
      <div></div>
    </div>
  );
}

export default TimeSlotComponent;
