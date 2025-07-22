import { useEffect, useState } from "react";
import TimeSlotComponent from "./TimeSlotComponent";
import {
  GetGlobalTimeLimit,
  SpecializeServiceList,
  SpecializeTerritoryList,
  TimeSlotList,
  UpdateGlobalTimeLimit,
  UpdateTimeSlotList,
} from "./TimeSlotApis";
import {
  format,
  addMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
} from "date-fns";
import { TimeSlotPopup } from "../../components";
import { alertService, AlertType } from "../../utils/alert.service";

function TimeSlotController() {
  const [territoryOptions, setTerritoryOptions] = useState<any>([]);
  const [location_id, setLocation_id] = useState<any>(null);
  const [serviceOptions, setServiceOptions] = useState<any>([]);
  const [service_id, setService_id] = useState<any>(null);
  const [selectedMonth, setSelectedMonth] = useState<any>(null);
  const [isOpenPop, setIsOpenPop] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [disabledTimeSlots, setDisabledTimeSlots] = useState<any[]>([]);
  const [specificDate, setSpecificDate] = useState<any>(null);
  const [timeSlotList, setTimeSlotList] = useState<any>({});
  const [timelimit, setTimelimit] = useState("09:00");

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (location_id) {
      ServiceDropDownApi();
    }
  }, [location_id]);

  useEffect(() => {
    const service = serviceOptions?.find(
      (service: any) => service.value === service_id
    );
    setSelectedService(service);
  }, [service_id]);

  const fetchData = async () => {
    const SpecializeTerritory: any = await SpecializeTerritoryList();
    setTerritoryOptions(SpecializeTerritory?.data?.data);

    const globalTimeLimit: any = await GetGlobalTimeLimit();
    setTimelimit(globalTimeLimit?.data?.data);
  };

  const ServiceDropDownApi = async () => {
    const SpecializeService: any = await SpecializeServiceList(location_id);
    setServiceOptions(SpecializeService?.data?.data);
  };

  const TimeSlotListApi = async (month: any) => {
    const timeSlotDataResponse: any = await TimeSlotList(service_id, month);
    setTimeSlotList(timeSlotDataResponse?.data?.disabled_timeslots);
    console.log(timeSlotDataResponse?.data?.disabled_timeslots);
  };

  const currentMonth = new Date();
  const months = [
    currentMonth,
    addMonths(currentMonth, 1),
    addMonths(currentMonth, 2),
    addMonths(currentMonth, 3),
  ];

  const handleMonthSelect = (month: any) => {
    setSelectedMonth(month);
    TimeSlotListApi(month);
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
            className="date-card"
            key={format(day, "yyyy-MM-dd")}
          >
            {format(day, "dd-MM-yyyy")}
            <br />
            {format(day, "EEEE")}
            <br />
            {timeSlotList &&
            Object.hasOwnProperty.call(
              timeSlotList,
              format(day, "dd-MM-yyyy")
            ) ? (
              <div className="time-slots">
                {timeSlotList![format(day, "dd-MM-yyyy")]?.map(
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

  const toggleTimePopup = (day: Date) => {
    setSpecificDate(day);
    setDisabledTimeSlots(
      timeSlotList &&
        Object.hasOwnProperty.call(timeSlotList, format(day, "dd-MM-yyyy"))
        ? timeSlotList[format(day, "dd-MM-yyyy")]
        : []
    );
    setIsOpenPop(!isOpenPop);
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
    const response = await UpdateTimeSlotList(
      service_id,
      location_id,
      specificDate,
      disabledTimeSlots
    );
    if (response?.status === 200) {
      toggleTimePopup(new Date());
      TimeSlotListApi(new Date());
    }
  };

  const globalTimelimitSubmitHandler = async () => {
    if (timelimit) {
      UpdateGlobalTimeLimit(timelimit);
    } else {
      alertService.alert({
        type: AlertType.Error,
        message: "Enter valid time",
      });
    }
  };

  return (
    <div>
      <TimeSlotComponent
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
        timelimit={timelimit}
        handleTimelimitChange={setTimelimit}
        globalTimelimitSubmitHandler={globalTimelimitSubmitHandler}
      />
      {isOpenPop && service_id ? (
        <TimeSlotPopup
          TimeSlotSubmitHandler={TimeSlotSubmitHandler}
          timeSlots={timeSlots}
          disabledTimeSlots={disabledTimeSlots}
          setDisabledTimeSlots={setDisabledTimeSlots}
          setIsOpenPop={setIsOpenPop}
          isOpenPop={isOpenPop}
          moduleName="disable_timeslots"
        />
      ) : null}
    </div>
  );
}

export default TimeSlotController;
