import React from "react";
import { useEffect, useState } from "react";
import GlobalSettingComponent from "./GlobalSettingComponent";
import {
  UpdateCancellationLimit,
  CancellationTimeLimit,
  ChargeAmountList,
  ChargeAmountAdd,
  ChargeAmountDelete,
  ChargeAmountUpdate,
} from "./GlobalSettingApis";
import {
  GetGlobalTimeLimit,
  UpdateGlobalTimeLimit,
} from "../TimeSlots/TimeSlotApis";
import { alertService, AlertType } from "../../utils/alert.service";
import AddChargeAmount from "../../components/Screen/GlobalSettingsComponent/AddChargeAmount";
import { DeletePopup } from "../../components";
import { log } from "console";
import EditChargeAmount from "../../components/Screen/GlobalSettingsComponent/EditChargeAmount";

function GlobalSettingController() {
  const initialValue = {
    charge_name: "",
    charge_amount: "",
  };

  const [cancellationTimeLimit, setCancellationTimeLimit] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [timelimit, setTimelimit] = useState("09:00");
  const [chargeAmountList, setChargeAmountList] = useState<any>();
  const [openChargeAmountPopup, setOpenChargeAmountPopup] = useState(false);
  const [chargeAmountValue, setChargeAmountValue] = useState(initialValue);
  const [errors, setErrors] = useState(initialValue);
  const [openDeleteChargePopup, setOpenDeleteChargePopup] = useState(false);
  const [deleteCharge, setDeleteCharge] = useState<any>("");
  const [editCharge, setEditCharge] = useState<any>("");
  const [openEditChargePop, setOpenEditChargePop] = useState(false);

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
      setIsLoading,
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
    const chargeAmountListRes: any = await ChargeAmountList(setIsLoading);
    setTimelimit(globalTimeLimit?.data?.data);
    setChargeAmountList(chargeAmountListRes?.data);
    console.log(chargeAmountList);
  };

  const toggleUserPopup = () => {
    setOpenChargeAmountPopup(!openChargeAmountPopup);
  };

  const AddChargeAmountApi = async () => {
    const response = await ChargeAmountAdd(chargeAmountValue, setIsLoading);
    if (response?.status === 200 || response?.status === 201) {
      fetchData();
      toggleUserPopup();
    }
  };

  const FormSubmitHandler = () => {
    AddChargeAmountApi();
  };

  const toggleDeletePopup = () => {
    setOpenDeleteChargePopup(!openDeleteChargePopup);
  };

  const DeleteSubmitHandler = () => {
    DeleteChargeApi();
  };

  const DeleteChargeApi = async () => {
    const response = await ChargeAmountDelete(deleteCharge, setIsLoading);
    if (response?.status === 200) {
      fetchData();
      toggleDeletePopup();
    }
  };

  const onDeleteHandler = (charge: any) => {
    console.log(charge);

    setDeleteCharge(charge);
    toggleDeletePopup();
  };

  const onEditHandler = (charge: any) => {
    setEditCharge(charge);
    toggleEditChargePopup();
  };

  const toggleEditChargePopup = () => {
    setOpenEditChargePop(!openEditChargePop);
  };

  const ChargeEditFormSubmitHandler = () => {
    ChargeEditApi();
  };

  const ChargeEditApi = async () => {
    const response = await ChargeAmountUpdate(editCharge, setIsLoading);
    if (response?.status === 200 || response?.status === 201) {
      fetchData();
      toggleEditChargePopup();
    }
  };

  return (
    <div>
      <GlobalSettingComponent
        timelimit={timelimit}
        cancellationTimeLimit={cancellationTimeLimit}
        handleTimeSlotController={handleTimeSlotController}
        globalTimelimitSubmitHandler={globalTimelimitSubmitHandler}
        handleTimelimitChange={setTimelimit}
        chargeAmountList={chargeAmountList}
        toggleUserPopup={toggleUserPopup}
        onDeleteHandler={onDeleteHandler}
        onEditHandler={onEditHandler}
      />
      {openChargeAmountPopup ? (
        <AddChargeAmount
          chargeAmountValue={chargeAmountValue}
          setChargeAmountValue={setChargeAmountValue}
          errors={errors}
          FormSubmitHandler={FormSubmitHandler}
          toggleUserPopup={toggleUserPopup}
          isLoading={isLoading}
        />
      ) : null}

      {openDeleteChargePopup ? (
        <DeletePopup
          isLoading={isLoading}
          category={"Charge"}
          name={deleteCharge?.charge_name}
          DeleteSubmitHandler={DeleteSubmitHandler}
          CancelDeleteSubmitHandler={toggleDeletePopup}
        />
      ) : null}

      {openEditChargePop ? (
        <EditChargeAmount
          editCharge={editCharge}
          setEditCharge={setEditCharge}
          errors={errors}
          ChargeEditFormSubmitHandler={ChargeEditFormSubmitHandler}
          toggleEditChargePopup={toggleEditChargePopup}
          isLoading={isLoading}
        />
      ) : null}
    </div>
  );
}

export default GlobalSettingController;
