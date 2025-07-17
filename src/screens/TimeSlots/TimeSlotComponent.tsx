import moment from "moment";
import { DropDown } from "../../components";
import "./TimeSlot.scss";
import TimePicker from "react-time-picker";

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
  handleTimelimitChange: (val: any) => void;
  globalTimelimitSubmitHandler: (val: any) => void;
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
  handleTimelimitChange,
  globalTimelimitSubmitHandler,
}: TimeSlotsProps) {
  return (
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
          <button
            onClick={globalTimelimitSubmitHandler}
            className="month-button"
          >
            <div className="month-card selected">Save</div>
          </button>
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
    </div>
  );
}

export default TimeSlotComponent;
