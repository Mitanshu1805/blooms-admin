import moment from "moment";
import { DropDown, Input } from "../../components";
import "./PinkDate.scss";

interface PinkDateProps {
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
  setToDefault: () => void;
  isModified: boolean;
  handleSave: () => void;
  setDiscount: (val: number) => void;
  discount: number;
  error: string;
}

function PinkDateComponent({
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
  setToDefault,
  isModified,
  handleSave,
  setDiscount,
  discount,
  error,
}: PinkDateProps) {
  return (
    <div className="details-list-card card">
      <div className="details-list-top">
        <div className="details-list-top-left">
          <span className="details-list-top-left-title">PINK DATES</span>
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
          <Input
            className={"input-width"}
            label="Discount Amount"
            type={"number"}
            placeholder="Enter Discount Amount"
            value={discount}
            onChange={(e: any) => {
              setDiscount(e.target.value);
            }}
            error={error}
          />
          {isModified && (
            <div>
              <button
                onClick={() => {
                  handleSave();
                }}
                className="month-button"
              >
                <div className="month-card selected">Save</div>
              </button>
              <button
                onClick={() => {
                  setToDefault();
                }}
                className="month-button"
              >
                <div className="month-card">Cancel</div>
              </button>
            </div>
          )}
          {renderDates(selectedMonth)}
        </div>
      )}
    </div>
  );
}

export default PinkDateComponent;
