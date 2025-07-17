import { useEffect, useState } from "react";
import { AddCrew, CrewDetails, DeletePopup, EditCrew } from "../../components";
import { ValidateMobile, ValidateName } from "../../helpers/Validators";
import {
  AddCrewA,
  CrewList,
  DeleteCrew,
  EditCrewA,
  SpecializeServiceList,
  updateCrewStatus,
} from "./CrewApis";
import CrewComponent from "./CrewComponent";
import { useNavigate } from "react-router-dom";

function CrewController() {
  const navigation = useNavigate();
  const initialValue = {
    crew_name: "",
    preferred_work_territory: "",
    address: "",
    phone_number: "",
  };
  const imageValue = {
    preview: "",
    raw: "",
  };
  const [crewData, setCrewData] = useState(initialValue);
  const [workingDate, setWorkingDate] = useState(new Date());
  const [errors, setErrors] = useState(initialValue);
  const [crewListData, setCrewListData] = useState<any>([]);
  const [profileImage, setProfileImage] = useState(imageValue);
  const [vehicleImage, setVehicleImage] = useState(imageValue);
  const [certificateImage, setCertificateImage] = useState(imageValue);
  const [companyImage, setCompanyImage] = useState(imageValue);
  const [isLoading, setIsLoading] = useState(false);
  const [openCrewForm, setOpenCrewForm] = useState(false);
  const [openEditCrewPop, setOpenEditCrewPop] = useState(false);
  const [editItem, setEditItem] = useState<any>("");
  const [openDeleteCrewPop, setOpenDeleteCrewPop] = useState(false);
  const [deleteItem, setDeleteItem] = useState<any>("");
  const [crewDetails, setCrewDetails] = useState<any>("");
  const [openCrewDetailsPop, setOpenCrewDetailsPop] = useState(false);
  const [selectedPage, setSelectedPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const [serviceOptions, setServiceOptions] = useState<any>([]);
  const [specializeOptions, setSpecializeOptions] = useState<any>([]);
  const [openCrewPaymentPop, setOpenCrewPaymentPop] = useState(false);

  useEffect(() => {
    fetchData();
  }, [selectedPage, limit, searchInput]);

  useEffect(() => {
    if (editItem) {
      setWorkingDate(new Date(editItem?.preferred_start_work_date));
    }
  }, [editItem]);

  const fetchData = async () => {
    const crewDataResponse: any = await CrewList(
      selectedPage,
      limit,
      searchInput,
      setIsLoading
    );
    setCrewListData(crewDataResponse?.data);
    const SpecializeServiceListResponse: any = await SpecializeServiceList();
    setServiceOptions(SpecializeServiceListResponse?.data?.data);
  };

  const AddCrewApi = async () => {
    const response = await AddCrewA(
      crewData,
      profileImage,
      vehicleImage,
      certificateImage,
      companyImage,
      workingDate,
      setIsLoading,
      specializeOptions
    );
    if (response?.status === 201) {
      fetchData();
      toggleCrewPopup();
    }
  };

  const EditCrewApi = async () => {
    const response = await EditCrewA(editItem, workingDate, setIsLoading);
    if (response?.status === 200) {
      fetchData();
      toggleEditPopup();
    }
  };

  const DeleteCrewApi = async () => {
    const response = await DeleteCrew(deleteItem, setIsLoading);
    if (response?.status === 200) {
      fetchData();
    }
  };

  const AddCrewValidator = () => {
    let newErrors: any = {};
    let isValid: boolean = true;
    const statusCrewName = ValidateName(crewData.crew_name);
    const statusPrefWork = ValidateName(crewData.preferred_work_territory);
    const statusPhone = ValidateMobile(crewData.phone_number);
    const statusAddress = ValidateName(crewData.address);
    const statusProfile = ValidateName(profileImage.preview);
    const statusVehicle = ValidateName(vehicleImage.preview);
    const statusCertificate = ValidateName(certificateImage.preview);
    const statusCompany = ValidateName(companyImage.preview);

    if (statusCrewName) {
      newErrors.crew_name = statusCrewName === 1 ? "Crew Name is Required" : "";
      isValid = false;
    }

    if (statusPrefWork) {
      newErrors.preferred_work_territory =
        statusPrefWork === 1 ? "Work Territory is Required" : "";
      isValid = false;
    }

    if (statusPhone) {
      newErrors.phone_number =
        statusPhone === 1 ? "Phone Number is Required" : "";
      isValid = false;
    }

    if (statusAddress) {
      newErrors.address = statusAddress === 1 ? "Address is Required" : "";
      isValid = false;
    }

    if (statusProfile) {
      newErrors.profileImage =
        statusProfile === 1 ? "Profile Image is Required" : "";
      isValid = false;
    }

    if (statusVehicle) {
      newErrors.vehicleImage =
        statusVehicle === 1 ? "Vehicle Image is Required" : "";
      isValid = false;
    }

    if (statusCertificate) {
      newErrors.certificateImage =
        statusCertificate === 1 ? "Certificate Image is Required" : "";
      isValid = false;
    }

    if (statusCompany) {
      newErrors.companyImage =
        statusCompany === 1 ? "Company Information Image is Required" : "";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const toggleCrewPopup = () => {
    setOpenCrewForm(!openCrewForm);
    setCrewData(initialValue);
    setErrors(initialValue);
    setProfileImage(imageValue);
    setVehicleImage(imageValue);
    setCertificateImage(imageValue);
    setCompanyImage(imageValue);
    setWorkingDate(new Date());
  };

  const onChangeProfile = (e: any) => {
    if (e.target.files.length) {
      setProfileImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const removePreviewProfile = () => {
    setProfileImage(imageValue);
  };

  const onChangeVehicle = (e: any) => {
    if (e.target.files.length) {
      setVehicleImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const removePreviewVehicle = () => {
    setVehicleImage(imageValue);
  };

  const onChangeCertificate = (e: any) => {
    if (e.target.files.length) {
      setCertificateImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const removePreviewCertificate = () => {
    setCertificateImage(imageValue);
  };

  const onChangeCompany = (e: any) => {
    if (e.target.files.length) {
      setCompanyImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const removePreviewCompany = () => {
    setCompanyImage(imageValue);
  };

  const updateProfile = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const newLogoPath = URL.createObjectURL(file);
      setEditItem((prevState: any) => ({
        ...prevState,
        applicant_personal_portrait: {
          preview: newLogoPath,
          raw: file,
        },
      }));
    }
  };

  const updateVehicle = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const newLogoPath = URL.createObjectURL(file);
      setEditItem((prevState: any) => ({
        ...prevState,
        work_vehicle_photo: {
          preview: newLogoPath,
          raw: file,
        },
      }));
    }
  };

  const updateCertificate = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const newLogoPath = URL.createObjectURL(file);
      setEditItem((prevState: any) => ({
        ...prevState,
        certificate_credentials: {
          preview: newLogoPath,
          raw: file,
        },
      }));
    }
  };

  const updateCompany = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const newLogoPath = URL.createObjectURL(file);
      setEditItem((prevState: any) => ({
        ...prevState,
        company_information: {
          preview: newLogoPath,
          raw: file,
        },
      }));
    }
  };

  const CrewFormSubmitHandler = () => {
    if (AddCrewValidator()) {
      AddCrewApi();
    }
  };

  const toggleEditPopup = () => {
    setOpenEditCrewPop(!openEditCrewPop);
  };

  const onEditHandler = (value: any) => {
    setEditItem(value);
    toggleEditPopup();
  };

  const CrewEditSubmitHandler = () => {
    EditCrewApi();
  };

  const toggleDeletePopup = () => {
    setOpenDeleteCrewPop(!openDeleteCrewPop);
  };

  const onDeleteHandler = (value: any) => {
    setDeleteItem(value);
    toggleDeletePopup();
  };

  const DeleteSubmitHandler = () => {
    DeleteCrewApi();
    toggleDeletePopup();
  };

  const toggleCrewDetailsPopup = () => {
    setOpenCrewDetailsPop(!openCrewDetailsPop);
  };

  const onDetailsViewHandler = (value: any) => {
    setCrewDetails(value);
    toggleCrewDetailsPopup();
  };

  const toggleCrewPaymentPopup = () => {
    setOpenCrewPaymentPop(!openCrewPaymentPop);
  };

  const handleSwitchChange = async (value: any) => {
    const response = await updateCrewStatus(value, setIsLoading);
    if (response?.status === 200) {
      fetchData();
    }
  };

  const handleChangeSearch = (e: any) => {
    setSearchInput(e.target.value);
  };

  const handleServiceDropdownChange = (selectedOptions: any) => {
    if (selectedOptions.length <= 3) {
      setSpecializeOptions(selectedOptions);
    }
  };

  const handleEditServiceDropdownChange = (selectedOptions: any) => {
    if (selectedOptions.length <= 3) {
      const updatedData: any = { ...editItem };
      updatedData.services = selectedOptions.map((option: any) => ({
        service_id: option.value,
        service_name: option.label,
      }));
      setEditItem(updatedData);
    }
  };

  return (
    <div>
      <CrewComponent
        crewListData={crewListData}
        isLoading={isLoading}
        onEditHandler={onEditHandler}
        onDeleteHandler={onDeleteHandler}
        toggleCrewPopup={toggleCrewPopup}
        handleSwitchChange={handleSwitchChange}
        onDetailsViewHandler={onDetailsViewHandler}
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
        size={limit}
        setSize={setLimit}
        handleChangeSearch={handleChangeSearch}
        searchInput={searchInput}
        navigation={navigation}
      />
      {openCrewForm ? (
        <AddCrew
          crewData={crewData}
          setCrewData={setCrewData}
          errors={errors}
          CrewFormSubmitHandler={CrewFormSubmitHandler}
          toggleCrewPopup={toggleCrewPopup}
          onChangeProfile={onChangeProfile}
          removePreviewProfile={removePreviewProfile}
          onChangeVehicle={onChangeVehicle}
          removePreviewVehicle={removePreviewVehicle}
          onChangeCertificate={onChangeCertificate}
          removePreviewCertificate={removePreviewCertificate}
          onChangeCompany={onChangeCompany}
          removePreviewCompany={removePreviewCompany}
          profileImage={profileImage}
          vehicleImage={vehicleImage}
          certificateImage={certificateImage}
          companyImage={companyImage}
          workingDate={workingDate}
          setWorkingDate={setWorkingDate}
          isLoading={isLoading}
          serviceOptions={serviceOptions}
          handleServiceDropdownChange={handleServiceDropdownChange}
        />
      ) : null}
      {openEditCrewPop ? (
        <EditCrew
          editItem={editItem}
          setEditItem={setEditItem}
          errors={errors}
          CrewEditSubmitHandler={CrewEditSubmitHandler}
          toggleEditPopup={toggleEditPopup}
          workingDate={workingDate}
          setWorkingDate={setWorkingDate}
          isLoading={isLoading}
          onChangeProfile={updateProfile}
          onChangeVehicle={updateVehicle}
          onChangeCertificate={updateCertificate}
          onChangeCompany={updateCompany}
          serviceOptions={serviceOptions}
          handleServiceDropdownChange={handleEditServiceDropdownChange}
        />
      ) : null}
      {openDeleteCrewPop ? (
        <DeletePopup
          isLoading={isLoading}
          category={"Crew"}
          name={deleteItem?.crew_name}
          DeleteSubmitHandler={DeleteSubmitHandler}
          CancelDeleteSubmitHandler={toggleDeletePopup}
        />
      ) : null}
      {openCrewDetailsPop ? (
        <CrewDetails
          crewDetails={crewDetails}
          toggleCrewDetailsPopup={toggleCrewDetailsPopup}
          center={{
            lat: parseFloat(crewDetails?.latitude ?? 20.5937),
            lng: parseFloat(crewDetails?.longitude ?? 78.9629),
          }}
        />
      ) : null}
    </div>
  );
}

export default CrewController;
