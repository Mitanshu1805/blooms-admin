import { useEffect, useState } from "react";
import TimeSlotComponent from "../TimeSlots/TimeSlotComponent";

import {
  format,
  addMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
} from "date-fns";
import { TimeSlotPopup } from "../../components";
import PinkDateComponent from "./PinkDateComponent";
import {
  PinkDateList,
  PinkDiscountUpdate,
  SpecializeServiceList,
  SpecializeTerritoryList,
  UpdatePinkDateList,
} from "./PinkDateApis";
import moment from "moment";
import { TimeSlotList } from "../TimeSlots/TimeSlotApis";

function PinkDateController() {
  const [location_id, setLocation_id] = useState<any>(null);
  const [serviceOptions, setServiceOptions] = useState<any>([]);
  const [territoryOptions, setTerritoryOptions] = useState<any>([]);
  const [service_id, setService_id] = useState<any>(null);
  const [selectedMonth, setSelectedMonth] = useState<any>(null);
  const [pinkTimeSlotsOld, setPinkTimeSlotsOld] = useState<any>([]);
  const [pinkTimeSlots, setPinkTimeSlots] = useState<any>({});
  const [currDiscount, setCurrDiscount] = useState(0);
  const [newDiscount, setNewDiscount] = useState(0);
  const [specificDate, setSpecificDate] = useState<any>(null);
  const [isOpenPop, setIsOpenPop] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [disabledTimeSlots, setDisabledTimeSlots] = useState<any>({});
  const [filteredTimeSlots, setFilteredTimeslots] = useState<any>([]);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (location_id) {
      ServiceDropDownApi();
    }
    setError(null);
  }, [location_id]);

  useEffect(() => {
    if (service_id && selectedMonth) {
      PinkDateListApi();
    }
    setError(null);
  }, [service_id, selectedMonth]);

  useEffect(() => {
    const service = serviceOptions?.find(
      (service: any) => service.value === service_id
    );
    setSelectedService(service);
  }, [service_id]);

  const currentMonth = new Date();
  const months = [
    currentMonth,
    addMonths(currentMonth, 1),
    addMonths(currentMonth, 2),
    addMonths(currentMonth, 3),
  ];

  const handleMonthSelect = (month: any) => {
    setSelectedMonth(month);
  };

  const fetchData = async () => {
    const SpecializeTerritory: any = await SpecializeTerritoryList();
    setTerritoryOptions(SpecializeTerritory?.data?.data);
  };

  const ServiceDropDownApi = async () => {
    const SpecializeService: any = await SpecializeServiceList(location_id);
    setServiceOptions(SpecializeService?.data?.data);
  };

  const PinkDateListApi = async () => {
    const PinkDate: any = await PinkDateList(service_id, selectedMonth);
    const timeSlotDataResponse: any = await TimeSlotList(
      service_id,
      selectedMonth
    );
    console.log(PinkDate?.data?.discount);
    console.log(PinkDate?.data?.pink_dates);
    setCurrDiscount(PinkDate?.data?.discount);
    setNewDiscount(PinkDate?.data?.discount);
    setPinkTimeSlotsOld(PinkDate?.data?.pink_dates);
    setDisabledTimeSlots(timeSlotDataResponse?.data?.disabled_timeslots);
  };

  const handleSave = () => {
    if (newDiscount && Math.floor(newDiscount) >= 0) {
      setError(null);
      PinkDiscountUpdate(service_id, newDiscount);
      setCurrDiscount(newDiscount);
    } else {
      setError("Invalid discount amount");
    }
  };

  const setToDefault = () => {
    setNewDiscount(currDiscount);
  };

  const toggleTimePopup = (day: Date) => {
    setSpecificDate(day);
    setPinkTimeSlots(
      pinkTimeSlotsOld &&
        Object.hasOwnProperty.call(pinkTimeSlotsOld, format(day, "dd-MM-yyyy"))
        ? pinkTimeSlotsOld[format(day, "dd-MM-yyyy")]
        : []
    );
    if (disabledTimeSlots[format(day, "dd-MM-yyyy")]) {
      setFilteredTimeslots(
        timeSlots.filter(
          (time: string) =>
            !disabledTimeSlots[format(day, "dd-MM-yyyy")].includes(time)
        )
      );
    } else {
      setFilteredTimeslots(timeSlots);
    }
    setIsOpenPop(!isOpenPop);
  };

  const renderDates = (month: any) => {
    const start = startOfMonth(month);
    const end = endOfMonth(month);
    const days = eachDayOfInterval({ start, end });

    return (
      <div className="dates-container">
        {days.map((day) => (
          <div
            onClick={() => toggleTimePopup(day)}
            className={"date-card"}
            key={format(day, "yyyy-MM-dd")}
          >
            {format(day, "dd-MM-yyyy")}
            <br />
            {format(day, "EEEE")}
            <br />
            {pinkTimeSlotsOld &&
            Object.hasOwnProperty.call(
              pinkTimeSlotsOld,
              format(day, "dd-MM-yyyy")
            ) ? (
              <div className="time-slots">
                {pinkTimeSlotsOld![format(day, "dd-MM-yyyy")]?.map(
                  (slot: any, index: number) => (
                    <div key={index} className="time-slot month-card selected">
                      {slot}
                    </div>
                  )
                )}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    );
  };

  const generateTimeSlots = () => {
    if (!selectedService || !selectedService.timing_of_each_slot) {
      return [];
    }

    const timeSlots = [];
    let currentTime = new Date(`2024-01-01T${selectedService.first_slot}:00`);
    const end = new Date(`2024-01-01T${selectedService.last_slot}:00`);
    const eachTimeParts = selectedService.timing_of_each_slot.split(":");
    const eachTimeHours = parseInt(eachTimeParts[0]);
    const eachTimeMinutes = parseInt(eachTimeParts[1]);

    while (currentTime <= end) {
      timeSlots.push(
        currentTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
      currentTime.setHours(currentTime.getHours() + eachTimeHours);
      currentTime.setMinutes(currentTime.getMinutes() + eachTimeMinutes);
    }

    return timeSlots;
  };

  const timeSlots = generateTimeSlots();

  const TimeSlotSubmitHandler = async () => {
    console.log(moment(specificDate).format("DD-MM-YYYY"));
    const response = await UpdatePinkDateList(
      service_id,
      moment(specificDate).format("DD-MM-YYYY"),
      pinkTimeSlots
    );

    if (response?.status === 200) {
      setIsOpenPop(!isOpenPop);
      const formatDate = moment(specificDate).format("DD-MM-YYYY");
      setPinkTimeSlotsOld((prev: any) => ({
        ...prev,
        [formatDate]: pinkTimeSlots.sort(),
      }));
    }
  };

  return (
    <div>
      <PinkDateComponent
        territoryOptions={territoryOptions}
        setLocation_id={setLocation_id}
        serviceOptions={serviceOptions}
        setService_id={setService_id}
        months={months}
        handleMonthSelect={handleMonthSelect}
        selectedMonth={selectedMonth}
        renderDates={renderDates}
        format={format}
        isNotSelected={location_id && service_id}
        location_id={location_id}
        setToDefault={setToDefault}
        isModified={Number(newDiscount) !== Number(currDiscount)}
        handleSave={handleSave}
        setDiscount={setNewDiscount}
        discount={newDiscount}
        error={error}
      />
      {isOpenPop && service_id && (
        <TimeSlotPopup
          TimeSlotSubmitHandler={TimeSlotSubmitHandler}
          timeSlots={filteredTimeSlots}
          disabledTimeSlots={pinkTimeSlots}
          setDisabledTimeSlots={setPinkTimeSlots}
          setIsOpenPop={setIsOpenPop}
          isOpenPop={isOpenPop}
          isDisableTimeslot={false}
          moduleName="pink_dates"
        />
      )}
    </div>
  );
}

export default PinkDateController;
