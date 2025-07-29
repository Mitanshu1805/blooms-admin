import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AddService, DeletePopup, EditService } from "../../components";
import {
  AddServiceA,
  DeleteService,
  EditServiceA,
  ServiceList,
} from "./ServiceApis";
import ServiceComponent from "./ServiceComponent";
import { AddServiceValidator } from "./ServiceValidator";

function ServiceController() {
  const { state } = useLocation();

  const initialValue = {
    service_name: "",
    timing_of_each_slot: "00:30",
    base_price: "",
    web_page_service_key: "",
    property_type: {
      label: "",
      description: "",
      options: [
        {
          label: "",
          order_label: "",
          cost: "",
        },
      ],
    },
    waiver: 10,
  };
  const subInitialValue = {
    quantity_base: "",
    quantity_default: "",
    quantity_increment: "",
    quantity_max: "",
    quantity_min: "",
    quantity_label: "",
    description: "",
    order_label: "",
    label: "",
    transport_fees: "required",
    base_price: "",
    handle: "",
  };
  const [serviceData, setServiceData] = useState(initialValue);
  const [errors, setErrors] = useState(initialValue && subInitialValue);
  const [serviceImage, setServiceImage] = useState({ preview: "", raw: "" });
  const [accordionData, setAccordionData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openServiceForm, setOpenServiceForm] = useState(false);
  const [openEditServicePop, setOpenEditServicePop] = useState(false);
  const [editItem, setEditItem] = useState<any>("");
  const [openDeleteServicePop, setOpenDeleteServicePop] = useState(false);
  const [deleteItem, setDeleteItem] = useState<any>("");
  const [searchInput, setSearchInput] = useState("");
  const [error, setError] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("16:30");
  const [removedTimeSlots, setRemovedTimeSlots] = useState<any[]>([]);

  const [isBrand, setIsBrand] = useState(false);

  useEffect(() => {
    serviceFetchData();
  }, [searchInput]);

  const serviceFetchData = async () => {
    const serviceDataResponse: any = await ServiceList(
      state?.data?.location_id,
      searchInput,
      setIsLoading
    );
    setAccordionData(serviceDataResponse?.data);
    console.log(
      "🚀 => serviceFetchData => serviceDataResponse?.data:",
      serviceDataResponse?.data
    );
  };

  // console.log("serviceData>>>>", serviceData);

  const AddServiceApi = async () => {
    console.log("serviceData>>>>", serviceData);
    const response = await AddServiceA(
      state?.data?.location_id,
      serviceData,
      serviceImage,
      startTime,
      endTime,
      isBrand,
      setIsLoading
    );
    console.log("serviceData>>>>", serviceData);
    console.log("response>>>>>", response);

    if (response?.status === 201) {
      serviceFetchData();
      toggleServicePopup();
    }
  };

  const EditServiceApi = async () => {
    const response = await EditServiceA(editItem, setIsLoading);
    if (response?.status === 200) {
      serviceFetchData();
      toggleEditServicePopup();
      setEditItem("");
    }
  };

  const DeleteServiceApi = async () => {
    const response = await DeleteService(deleteItem, setIsLoading);
    if (response?.status === 200) {
      serviceFetchData();
      toggleDeletePopup();
    }
  };

  const handleStartTimeChange = (value: any) => {
    setStartTime(value);
  };

  const handleEndTimeChange = (value: any) => {
    setEndTime(value);
  };

  const toggleServicePopup = () => {
    setOpenServiceForm(!openServiceForm);
    setServiceData(initialValue);
    setErrors(initialValue && subInitialValue);
    setStartTime("09:00");
    setEndTime("16:30");
    setRemovedTimeSlots([]);
    setServiceImage({ preview: "", raw: "" });
  };

  // const ServiceFormSubmitHandler = () => {
  //   if (
  //     AddServiceValidator(
  //       serviceData,
  //       endTime,
  //       startTime,
  //       serviceImage,
  //       setErrors
  //     )
  //   ) {
  //     AddServiceApi();
  //   }
  // };

  const ServiceFormSubmitHandler = () => {
    const isValid = AddServiceValidator(
      serviceData,
      endTime,
      startTime,
      serviceImage,
      setErrors
    );
    console.log("Validation result:", isValid);
    if (isValid) {
      AddServiceApi();
    }
  };

  const toggleEditServicePopup = () => {
    setOpenEditServicePop(!openEditServicePop);
  };

  const ServiceEditFormSubmitHandler = () => {
    EditServiceApi();
  };

  const toggleDeletePopup = () => {
    setOpenDeleteServicePop(!openDeleteServicePop);
  };

  const DeleteSubmitHandler = () => {
    DeleteServiceApi();
  };

  const onChangeService = (e: any) => {
    if (e.target.files.length) {
      setServiceImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const removePreview = () => {
    setServiceImage({ preview: "", raw: "" });
  };

  const handleChangeSearch = (e: any) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const generateTimeSlots = () => {
    const timeSlots = [];
    let currentTime = new Date(
      `2024-01-01T${editItem ? editItem?.first_slot : startTime}:00`
    );
    const end = new Date(
      `2024-01-01T${editItem ? editItem?.last_slot : endTime}:00`
    );
    const eachTimeParts = (
      editItem?.timing_of_each_slot
        ? editItem?.timing_of_each_slot
        : serviceData.timing_of_each_slot
    ).split(":");
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

  const onChangeUpdateService = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const newLogoPath = URL.createObjectURL(file);
      setEditItem((prevState: any) => ({
        ...prevState,
        service_icon: {
          preview: newLogoPath,
          raw: file,
        },
      }));
    }
  };

  const handleEachTimeChange = (e: any) => {
    const inputValue = e.target.value;
    if (validateTimeFormat(inputValue)) {
      setServiceData((prevValue: any) => ({
        ...prevValue,
        timing_of_each_slot: inputValue,
      }));
      setError("");
    } else {
      setError("Invalid time format. Please use the format HH:mm.");
    }
  };

  const validateTimeFormat = (time: any) => {
    const regex = /^(?:[0-9]|0[0-9]|1[0-9]|2[0-3]):[0-9]|0[0-9]|1[0-9]|2[0-3]$/;
    return regex.test(time);
  };

  const handleCheckboxChange = (event: any) => {
    setIsBrand(event.target.checked);
  };

  return (
    <div>
      <ServiceComponent
        accordionData={accordionData}
        isLoading={isLoading}
        searchInput={searchInput}
        location_name={state?.data?.location_name}
        toggleUserPopup={toggleServicePopup}
        handleChangeSearch={handleChangeSearch}
      />
      {openServiceForm ? (
        <AddService
          userData={serviceData}
          setUserData={setServiceData}
          errors={errors}
          handleSubmit={ServiceFormSubmitHandler}
          toggleServicePopup={toggleServicePopup}
          serviceImage={serviceImage}
          onChangeService={onChangeService}
          removePreview={removePreview}
          timeSlots={timeSlots}
          handleEachTimeChange={handleEachTimeChange}
          error={error}
          handleStartTimeChange={handleStartTimeChange}
          handleEndTimeChange={handleEndTimeChange}
          startTime={startTime}
          endTime={endTime}
          isLoading={isLoading}
          isBrand={isBrand}
          handleCheckboxChange={handleCheckboxChange}
          removedTimeSlots={removedTimeSlots}
          setRemovedTimeSlots={setRemovedTimeSlots}
        />
      ) : null}
      {openEditServicePop ? (
        <EditService
          editItem={editItem}
          setEditItem={setEditItem}
          errors={errors}
          UserFormSubmitHandler={ServiceEditFormSubmitHandler}
          toggleUserPopup={() => {
            toggleEditServicePopup();
            setEditItem("");
          }}
          timeSlots={timeSlots}
          onChangeService={onChangeUpdateService}
        />
      ) : null}
      {openDeleteServicePop ? (
        <DeletePopup
          isLoading={isLoading}
          category={"Service"}
          name={deleteItem?.service_name}
          DeleteSubmitHandler={DeleteSubmitHandler}
          CancelDeleteSubmitHandler={toggleDeletePopup}
        />
      ) : null}
    </div>
  );
}

export default ServiceController;
