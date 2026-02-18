import moment from "moment";
import { useState } from "react";

interface EditTimeSlotProps {
  item: any;
  orderId: string;
  setEditableOrders: any;
  onClose: () => void;
  selectedSlot: any;
  editableOrders: any;
}

function EditTimeSlot({
  item,
  onClose,
  orderId,
  setEditableOrders,
}: EditTimeSlotProps) {
  // 🔥 Month controller (based on existing time_slot)
  const [currentMonth, setCurrentMonth] = useState<moment.Moment>(
    item?.time_slot ? moment.utc(item.time_slot) : moment(),
  );

  // 🔥 Active Date
  const [activeDate, setActiveDate] = useState<string>(
    item?.time_slot
      ? moment.utc(item.time_slot).format("YYYY-MM-DD")
      : moment().format("YYYY-MM-DD"),
  );

  // 🔥 Active Time Slot
  const [activeSlot, setActiveSlot] = useState<string>(
    item?.time_slot ? moment.utc(item.time_slot).format("HH:mm") : "",
  );

  // 🔥 Generate time slots
  const generateTimeSlots = () => {
    const timeSlots: string[] = [];

    const firstSlot = moment(item?.first_slot, "HH:mm");
    const lastSlot = moment(item?.last_slot, "HH:mm");

    const [hours, minutes] = item?.timing_of_each_slot.split(":").map(Number);

    const interval = moment.duration(hours, "hours").add(minutes, "minutes");

    let currentTime = moment(firstSlot);

    while (currentTime.isSameOrBefore(lastSlot)) {
      timeSlots.push(currentTime.format("HH:mm"));
      currentTime.add(interval);
    }

    return timeSlots;
  };

  const slots = generateTimeSlots();

  // 🔥 Generate dates of selected month
  const generateMonthDates = () => {
    const startOfMonth = currentMonth.clone().startOf("month");
    const endOfMonth = currentMonth.clone().endOf("month");

    const dates: string[] = [];
    const day = startOfMonth.clone();

    while (day.isSameOrBefore(endOfMonth)) {
      dates.push(day.format("YYYY-MM-DD"));
      day.add(1, "day");
    }

    return dates;
  };

  const dates = generateMonthDates();

  // 🔥 Month navigation
  const goToPrevMonth = () => {
    setCurrentMonth((prev) => prev.clone().subtract(1, "month"));
  };

  const goToNextMonth = () => {
    setCurrentMonth((prev) => prev.clone().add(1, "month"));
  };

  // 🔥 Save handler
  const handleSave = () => {
    if (!activeSlot || !activeDate) return;

    const combinedDateTime = moment
      .utc(`${activeDate} ${activeSlot}`, "YYYY-MM-DD HH:mm")
      .toISOString();

    setEditableOrders((prevOrders: any[]) =>
      prevOrders.map((order) =>
        order.order_id === orderId
          ? { ...order, time_slot: combinedDateTime }
          : order,
      ),
    );

    onClose();
  };

  return (
    <div className="popup-box-wrapper">
      <div className="popup-box-container">
        <div className="flex-col-div">
          <span className="popup-box-title">EDIT DATE & TIME</span>
        </div>

        <div className="underline" />

        {/* 🔥 MONTH HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem",
          }}
        >
          <button onClick={goToPrevMonth}>◀</button>

          <span style={{ fontWeight: "600" }}>
            {currentMonth.format("MMMM YYYY")}
          </span>

          <button onClick={goToNextMonth}>▶</button>
        </div>

        <div className="underline" />

        {/* 🔥 DATE GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))",
            gap: "10px",
            padding: "1rem",
            maxHeight: "150px",
            overflowY: "auto",
          }}
        >
          {dates.map((date) => {
            const isSelected = activeDate === date;

            return (
              <button
                key={date}
                onClick={() => {
                  setActiveDate(date);
                  //   setActiveSlot("");
                }}
                style={{
                  padding: "8px",
                  borderRadius: "6px",
                  border: isSelected ? "2px solid #2196f3" : "1px solid #ccc",
                  background: isSelected ? "#2196f370" : "#fff",
                  cursor: "pointer",
                }}
              >
                {moment(date).format("DD MMM")}
              </button>
            );
          })}
        </div>

        <div className="underline" />

        {/* 🔥 TIME SLOTS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))",
            gap: "10px",
            padding: "1rem",
            maxHeight: "250px",
            overflowY: "auto",
          }}
        >
          {slots.map((slot) => {
            const isSelected = activeSlot === slot;

            return (
              <button
                key={slot}
                onClick={() => setActiveSlot(slot)}
                style={{
                  padding: "8px",
                  borderRadius: "6px",
                  border: isSelected ? "2px solid #4caf50" : "1px solid #ccc",
                  background: isSelected ? "#4caf5070" : "#fff",
                  cursor: "pointer",
                }}
              >
                {slot}
              </button>
            );
          })}
        </div>

        <div className="underline" />

        {/* 🔥 ACTION BUTTONS */}
        <div className="flex-row-cen-cen-div">
          <button
            className="add-details-submit-btn"
            onClick={handleSave}
            disabled={!activeDate || !activeSlot}
            style={{ marginRight: "10px" }}
          >
            Save
          </button>

          <button className="add-details-cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditTimeSlot;
