import React, { useState } from "react";
import Button from "../../Button/Button"; // Assuming you have a separate CSS file for styling

function TimeSlotPopup({
  isLoading,
  TimeSlotSubmitHandler,
  timeSlots,
  disabledTimeSlots,
  setDisabledTimeSlots,
  setIsOpenPop,
  isOpenPop,
  isDisableTimeslot = true,
}: any) {
  const [activeTimeSlots, setActiveTimeSlots] = useState(timeSlots);

  const handleToggleTimeSlot = (slot: any) => {
    if (disabledTimeSlots.includes(slot)) {
      setDisabledTimeSlots(
        disabledTimeSlots.filter((timeSlot: any) => timeSlot !== slot)
      );
      setActiveTimeSlots([...activeTimeSlots, slot]);
    } else {
      setActiveTimeSlots(
        activeTimeSlots.filter((timeSlot: any) => timeSlot !== slot)
      );
      setDisabledTimeSlots([...disabledTimeSlots, slot]);
    }
  };

  return (
    <div className="popup-box-wrapper">
      <div className="popup-box-container">
        <div className="flex-col-div">
          <span className="popup-box-title">TIME SLOTS DETAILS</span>
        </div>
        <div className="underline" />
        <div className="add-details-input-rows">
          <div className="time-slots">
            {timeSlots?.map((slot: any, index: number) => (
              <div
                onClick={() => handleToggleTimeSlot(slot)}
                key={index}
                className={`time-slot ${
                  disabledTimeSlots.includes(slot)
                    ? isDisableTimeslot
                      ? "disabled"
                      : "pinkdate"
                    : ""
                }`}
              >
                {slot}
              </div>
            ))}
          </div>
        </div>
        <div className="underline" />
        <div className="flex-row-cen-cen-div mb-4">
          <Button
            isLoading={isLoading}
            className="add-details-submit-btn"
            name="Select All"
            onClick={() => {
              setActiveTimeSlots([]);
              setDisabledTimeSlots(timeSlots);
            }}
          />
          <Button
            isLoading={false}
            className="add-details-cancel-btn"
            name="Deselect All"
            onClick={() => {
              setActiveTimeSlots(timeSlots);
              setDisabledTimeSlots([]);
            }}
          />
        </div>
        <div className="flex-row-cen-cen-div">
          <Button
            isLoading={isLoading}
            className="add-details-submit-btn"
            name="Submit"
            onClick={TimeSlotSubmitHandler}
          />
          <Button
            isLoading={false}
            className="add-details-cancel-btn"
            name="Cancel"
            onClick={() => setIsOpenPop(!isOpenPop)}
          />
        </div>
      </div>
    </div>
  );
}

export default TimeSlotPopup;
