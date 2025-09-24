import React from "react";
import { useEffect, useState } from "react";
import GlobalSettingComponent from "./GlobalSettingComponent";
import {
  UpdateCancellationLimit,
  CancellationTimeLimit,
} from "./GlobalSettingApis";
import {
  GetGlobalTimeLimit,
  UpdateGlobalTimeLimit,
} from "../TimeSlots/TimeSlotApis";
import { alertService, AlertType } from "../../utils/alert.service";

function GlobalSettingController() {
  const [cancellationTimeLimit, setCancellationTimeLimit] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [timelimit, setTimelimit] = useState("09:00");

  useEffect(() => {
    fetchData();
    fetchCancellationTimeLimit();
  }, []);

  const fetchCancellationTimeLimit = async () => {
    const Response: any = await CancellationTimeLimit();
    setCancellationTimeLimit(Response?.data?.data);
  };

  const handleTimeSlotController = async (cancellation_limit: string) => {
    const response = await UpdateCancellationLimit(
      cancellation_limit,
      setIsLoading
    );
    if (response?.status == 200) {
      fetchCancellationTimeLimit();
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

  const fetchData = async () => {
    const globalTimeLimit: any = await GetGlobalTimeLimit();
    setTimelimit(globalTimeLimit?.data?.data);
  };

  return (
    <div>
      <GlobalSettingComponent
        timelimit={timelimit}
        cancellationTimeLimit={cancellationTimeLimit}
        handleTimeSlotController={handleTimeSlotController}
        globalTimelimitSubmitHandler={globalTimelimitSubmitHandler}
        handleTimelimitChange={setTimelimit}
      />
    </div>
  );
}

export default GlobalSettingController;
