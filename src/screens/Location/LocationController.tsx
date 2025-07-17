import { useEffect, useState } from "react";
import { AddLocation, DeletePopup, EditLocation } from "../../components";
import {
  ValidateEmail,
  ValidateMobile,
  ValidateName,
} from "../../helpers/Validators";
import {
  AddLocationA,
  DeleteLocation,
  EditLocationA,
  LocationList,
} from "./LocationApis";
import LocationComponent from "./LocationComponent";

function LocationController() {
  const initialValue = {
    location_name: "",
    template: "",
    share_count: "",
    currency: "",
    phone_number: "",
    email: "",
  };
  const imageValue = {
    preview: "",
    raw: "",
  };
  const [locationData, setLocationData] = useState(initialValue);
  const [errors, setErrors] = useState(initialValue);
  const [locationListData, setLocationListData] = useState<any>([]);
  const [selectedPage, setSelectedPage] = useState(1);
  const [size, setSize] = useState(10);
  const [location_image, setLocation_image] = useState(imageValue);
  const [isLoading, setIsLoading] = useState(false);
  const [openLocationForm, setOpenLocationForm] = useState(false);
  const [openEditLocationPop, setOpenEditLocationPop] = useState(false);
  const [editItem, setEditItem] = useState<any>("");
  const [openDeleteLocationPop, setOpenDeleteLocationPop] = useState(false);
  const [deleteItem, setDeleteItem] = useState<any>("");
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    fetchData();
  }, [size, selectedPage, searchInput]);

  const fetchData = async () => {
    const crewDataResponse: any = await LocationList(
      size,
      selectedPage,
      searchInput,
      setIsLoading
    );
    setLocationListData(crewDataResponse?.data);
  };

  const AddLocationApi = async () => {
    const response = await AddLocationA(
      locationData,
      location_image,
      setIsLoading
    );
    if (response?.status === 201) {
      fetchData();
      toggleLocationPopup();
    }
  };

  const EditLocationApi = async () => {
    const response = await EditLocationA(editItem, setIsLoading);
    if (response?.status === 200) {
      fetchData();
      toggleEditPopup();
    }
  };

  const DeleteCrewApi = async () => {
    const response = await DeleteLocation(deleteItem, setIsLoading);
    if (response?.status === 200) {
      fetchData();
    }
  };

  const AddLocationValidator = () => {
    let newErrors: any = {};
    let isValid: boolean = true;
    const statusLocationName = ValidateName(locationData.location_name);
    const statusPhoneNumber = ValidateMobile(locationData.phone_number);
    const statusEmail = ValidateEmail(locationData.email);
    const statusTemplateName = ValidateName(locationData.template);
    const statusShareCount = ValidateName(locationData.share_count);
    const statusCurrency = ValidateName(locationData.currency);
    const statusImage = ValidateName(location_image.preview);

    if (statusLocationName) {
      newErrors.location_name =
        statusLocationName === 1 ? "Location Name is Required" : "";
      isValid = false;
    }

    if (statusPhoneNumber) {
      newErrors.phone_number =
        statusPhoneNumber === 1 ? "Phone Number is Required" : "";
      isValid = false;
    }

    if (statusEmail) {
      newErrors.email =
        statusEmail === 1 ? "Email is Required" : "Invalid Email";
      isValid = false;
    }
    if (statusTemplateName) {
      newErrors.template =
        statusTemplateName === 1 ? "Template Name is Required" : "";
      isValid = false;
    }

    if (statusShareCount) {
      newErrors.share_count =
        statusShareCount === 1 ? "Share Count is Required" : "";
      isValid = false;
    }

    if (statusCurrency) {
      newErrors.currency = statusCurrency === 1 ? "Currency is Required" : "";
      isValid = false;
    }

    if (statusImage) {
      newErrors.image = statusImage === 1 ? "Location Image is Required" : "";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const toggleLocationPopup = () => {
    setOpenLocationForm(!openLocationForm);
    setLocationData(initialValue);
    setErrors(initialValue);
    setLocation_image(imageValue);
  };

  const onChangeLocation = (e: any) => {
    if (e.target.files.length) {
      setLocation_image({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const removePreviewProfile = () => {
    setLocation_image(imageValue);
  };

  const updateLocation = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const newLogoPath = URL.createObjectURL(file);
      setEditItem((prevState: any) => ({
        ...prevState,
        location_image: newLogoPath,
        raw: file,
      }));
    }
  };

  const LocationFormSubmitHandler = () => {
    if (AddLocationValidator()) {
      AddLocationApi();
    }
  };

  const toggleEditPopup = () => {
    setOpenEditLocationPop(!openEditLocationPop);
  };

  const onEditHandler = (value: any) => {
    setEditItem(value);
    toggleEditPopup();
  };

  const CrewEditSubmitHandler = () => {
    EditLocationApi();
  };

  const toggleDeletePopup = () => {
    setOpenDeleteLocationPop(!openDeleteLocationPop);
  };

  const onDeleteHandler = (value: any) => {
    setDeleteItem(value);
    toggleDeletePopup();
  };

  const DeleteSubmitHandler = () => {
    DeleteCrewApi();
    toggleDeletePopup();
  };

  const handleChangeSearch = (e: any) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  return (
    <div>
      <LocationComponent
        crewListData={locationListData}
        isLoading={isLoading}
        onEditHandler={onEditHandler}
        onDeleteHandler={onDeleteHandler}
        toggleCrewPopup={toggleLocationPopup}
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
        size={size}
        setSize={setSize}
        searchInput={searchInput}
        handleChangeSearch={handleChangeSearch}
      />
      {openLocationForm ? (
        <AddLocation
          userData={locationData}
          setUserData={setLocationData}
          errors={errors}
          UserFormSubmitHandler={LocationFormSubmitHandler}
          location_image={location_image}
          toggleUserPopup={toggleLocationPopup}
          onChangeLocation={onChangeLocation}
          removePreviewProfile={removePreviewProfile}
          isLoading={isLoading}
        />
      ) : null}
      {openEditLocationPop ? (
        <EditLocation
          editItem={editItem}
          setEditItem={setEditItem}
          errors={errors}
          UserFormSubmitHandler={CrewEditSubmitHandler}
          toggleUserPopup={toggleEditPopup}
          isLoading={isLoading}
          onChangeUpdateLocation={updateLocation}
        />
      ) : null}
      {openDeleteLocationPop ? (
        <DeletePopup
          isLoading={isLoading}
          category={"Location"}
          name={deleteItem?.location_name}
          DeleteSubmitHandler={DeleteSubmitHandler}
          CancelDeleteSubmitHandler={toggleDeletePopup}
        />
      ) : null}
    </div>
  );
}

export default LocationController;
