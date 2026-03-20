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
  tomorrowDisableTimeSubmitHandler: (val: any) => void;
  sameDayBookingChargeSubmitHandler: any;
  handleSwitchChange: any;
  sameDayBooking: any;
  setSameDayBooking: any;
  selectedService: any;
  chargeAmount: any;
  setChargeAmount: any;
  setTimelimit: any;
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
  tomorrowDisableTimeSubmitHandler,
  sameDayBookingChargeSubmitHandler,
  sameDayBooking,
  setSameDayBooking,
  selectedService,
  handleSwitchChange,
  chargeAmount,
  setChargeAmount,
  setTimelimit,
}: TimeSlotsProps) {
  const canUpdate = hasPermission("disable_timeslots", "update");
  const canDelete = hasPermission("disable_timeslots", "delete");
  const canView = hasPermission("disable_timeslots", "read");

  const [localCancellationLimit, setLocalCancellationLimit] = useState("");

  useEffect(() => {
    setLocalCancellationLimit(cancellationTimeLimit || "");
  }, [cancellationTimeLimit]);

  useEffect(() => {
    if (selectedService?.tomorrow_disable_time) {
      setTimelimit(selectedService.tomorrow_disable_time);
    }
  }, [selectedService]);
  if (!canView) {
    return <div>You do not have permission to view this page.</div>;
  }

  console.log(territoryOptions, serviceOptions, selectedService);

  return (
    <div>
      <div className="details-list-card card">
        <div className="details-list-top">
          <div className="details-list-top-left">
            <span className="details-list-top-left-title">TIME SLOTS</span>
          </div>
        </div>

        <div className="details-list-table">
          <div className="container">
            <div className="col">
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
                <>
                  <div className="d-flex flex-row flex-wrap">
                    <div style={{ width: "300px" }} className="mr-3">
                      <label
                        className="inputText-label d-flex"
                        htmlFor={"First Slot"}
                      >
                        Urgent booking charge
                      </label>
                      <div className="d-flex flex-row align-items-center gap-2 w-100">
                        <Input
                          type="number"
                          inputContainerClassName="w-100"
                          placeholder="Enter charge"
                          value={chargeAmount}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setChargeAmount(e.target.value)
                          }
                        />

                        {canUpdate && (
                          <button
                            onClick={() =>
                              sameDayBookingChargeSubmitHandler(
                                selectedService?.value,
                                location_id,
                                chargeAmount,
                              )
                            }
                            className="month-button"
                            style={{ marginBottom: "20px" }}
                          >
                            <div className="month-card selected mr-0">
                              Update
                            </div>
                          </button>
                        )}
                      </div>
                    </div>
                    <div style={{ width: "300px" }}>
                      <label
                        className="inputText-label d-flex"
                        htmlFor={"First Slot"}
                      >
                        Disable tomorrow's timeslots
                      </label>
                      <div className="d-flex flex-row align-items-center gap-2">
                        <TimePicker
                          className={"time-picker-input-container flex-grow-1"}
                          id="start-time"
                          value={timelimit}
                          // onChange={handleTimelimitChange}
                          onChange={(value: string | null) =>
                            setTimelimit(value || "")
                          }
                          format={"HH:mm"}
                          clockIcon={true}
                          disableClock={true}
                        />
                        {canUpdate && (
                          <button
                            onClick={tomorrowDisableTimeSubmitHandler}
                            className="month-button"
                          >
                            <div className="month-card selected mr-0">Save</div>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <span>Allow Same Day Booking:</span>
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
                </>
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
          </div>
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
