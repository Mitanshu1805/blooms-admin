import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  AddBrand,
  AddLocationS,
  AddModal,
  AddService,
  AddSubService,
  DeletePopup,
  EditBrand,
  EditModal,
  EditProperty,
  EditService,
  EditSubService,
} from '../../components';
import {
  AddBrandA,
  AddLocationSA,
  AddModalA,
  AddServiceA,
  AddSubServiceA,
  BrandList,
  DeleteBrand,
  DeleteModal,
  DeleteProperty,
  DeleteService,
  DeleteSubService,
  EditBrandA,
  EditModalA,
  EditPropertyA,
  EditServiceA,
  EditSubServiceA,
  LocationListS,
  ModalList,
  ServiceList,
  SubServiceList,
  updatePropertyStatus,
  updateServiceStatusA,
  updateSubServiceStatus,
} from './ServiceApis';
import ServiceComponent from './ServiceComponent';
import {
  AddBrandValidator,
  AddLocationValidator,
  AddModalValidator,
  AddServiceValidator,
  AddSubServiceValidator,
} from './ServiceValidator';

function ServiceController() {
  const { state } = useLocation();

  const initialValue = {
    service_name: '',
    timing_of_each_slot: '00:30',
    base_price: '',
    web_page_service_key: '',
    property_types: {
      property_label: '',
      property_order_label: '',
      options: [
        {
          label: '',
          order_label: '',
          cost: '',
        },
      ],
    },
  };
  const subInitialValue = {
    quantity_base: '',
    quantity_default: '',
    quantity_increment: '',
    quantity_max: '',
    quantity_min: '',
    quantity_label: '',
    description: '',
    order_label: '',
    label: '',
    transport_fees: 'required',
    base_price: '',
    handle: '',
  };
  const locationValue = {
    order_label: '',
    label: '',
    base_price: '',
  };
  const [openServiceAccordion, setIsOpenServiceAccordion] = useState(false);
  const [serviceData, setServiceData] = useState(initialValue);
  const [errors, setErrors] = useState(initialValue && subInitialValue);
  const [serviceImage, setServiceImage] = useState({ preview: '', raw: '' });
  const [subServiceList, setSubServiceList] = useState([]);
  const [selectedPage, setSelectedPage] = useState(1);
  const [accordionData, setAccordionData] = useState<any>([]);
  const [selectedAccordion, setSelectedAccordion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [openServiceForm, setOpenServiceForm] = useState(false);
  const [openBrandForm, setOpenBrandForm] = useState(false);
  const [openModalForm, setOpenModalForm] = useState(false);
  const [openEditServicePop, setOpenEditServicePop] = useState(false);
  const [editItem, setEditItem] = useState<any>('');
  const [openDeleteServicePop, setOpenDeleteServicePop] = useState(false);
  const [deleteItem, setDeleteItem] = useState<any>('');
  const [searchInput, setSearchInput] = useState('');
  const [error, setError] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('16:30');
  const [removedTimeSlots, setRemovedTimeSlots] = useState<any[]>([]);

  const [isPropertyLoading, setIsPropertyLoading] = useState(false);
  const [subServiceData, setSubServiceData] = useState(subInitialValue);
  const [openSubServiceForm, setOpenSubServiceForm] = useState(false);
  const [openEditSubServicePop, setOpenEditSubServicePop] = useState(false);
  const [editSubItem, setEditSubItem] = useState<any>('');
  const [openDeleteSubServicePop, setOpenDeleteSubServicePop] = useState(false);
  const [deleteSubItem, setDeleteSubItem] = useState<any>('');
  const [serviceId, setServiceId] = useState<any>('');
  const [isSubServiceLoading, setIsSubServiceLoading] = useState(false);

  const [openPropertyAccordion, setIsOpenPropertyAccordion] = useState(false);
  const [locationListData, setLocationListData] = useState<any>([]);
  const [locationForm, setLocationForm] = useState(false);
  const [locationData, setLocationData] = useState(locationValue);
  const [openEditPropertyPop, setOpenEditPropertyPop] = useState(false);
  const [openDeletePropertyPop, setOpenDeletePropertyPop] = useState(false);
  const [deletePropertyItem, setDeletePropertyItem] = useState<any>('');
  const [propertySearchInput, setPropertySearchInput] = useState('');
  const [propertySelectedPage, setPropertySelectedPage] = useState(1);
  const [isBrand, setIsBrand] = useState(false);
  const [limit, setLimit] = useState(10);

  const [brandData, setBrandData] = useState('');
  const [brandImage, setBrandImage] = useState({ preview: '', raw: '' });
  const [brandList, setBrandList] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [openEditBrandPop, setOpenEditBrandPop] = useState(false);
  const [editBrandItem, setEditBrandItem] = useState<any>('');
  const [openDeleteBrandPop, setOpenDeleteBrandPop] = useState(false);
  const [deleteBrandItem, setDeleteBrandItem] = useState<any>('');
  const [brandId, setBrandId] = useState<any>('');
  const [isBrandLoading, setIsBrandLoading] = useState(false);

  const [modalData, setModalData] = useState('');
  const [modalImage, setModalImage] = useState({ preview: '', raw: '' });
  const [modalList, setModalList] = useState([]);
  const [selectedModal, setSelectedModal] = useState('');
  const [openEditModalPop, setOpenEditModalPop] = useState(false);
  const [editModalItem, setEditModalItem] = useState<any>('');
  const [openDeleteModalPop, setOpenDeleteModalPop] = useState(false);
  const [deleteModalItem, setDeleteModalItem] = useState<any>('');
  const [isModalLoading, setIsModalLoading] = useState(false);

  useEffect(() => {
    serviceFetchData();
  }, [searchInput]);

  useEffect(() => {
    propertyFetchData();
  }, [propertySearchInput, limit, propertySelectedPage]);

  useEffect(() => {
    if (selectedModal) {
      BrandListApi();
      SubServiceListApi();
    } else if (selectedAccordion) {
      BrandListApi();
      SubServiceListApi();
    }
  }, [selectedAccordion, selectedPage, selectedModal]);

  useEffect(() => {
    if (selectedBrand) {
      ModalListApi();
    }
  }, [selectedBrand]);

  const serviceFetchData = async () => {
    const serviceDataResponse: any = await ServiceList(
      state?.data?.location_id,
      searchInput,
      setIsLoading
    );
    setAccordionData(serviceDataResponse?.data);
  };

  const AddServiceApi = async () => {
    const response = await AddServiceA(
      state?.data?.location_id,
      serviceData,
      serviceImage,
      startTime,
      endTime,
      isBrand,
      setIsLoading
    );
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
      setEditItem('');
    }
  };

  const DeleteServiceApi = async () => {
    const response = await DeleteService(deleteItem, setIsLoading);
    if (response?.status === 200) {
      serviceFetchData();
      toggleDeletePopup();
    }
  };

  const propertyFetchData = async () => {
    const locationListResponse = await LocationListS(
      state?.data?.location_id,
      propertySelectedPage,
      limit,
      propertySearchInput,
      setIsLoading
    );
    setLocationListData(locationListResponse?.data);
  };

  const BrandListApi = async () => {
    const serviceDataResponse: any = await BrandList(
      selectedAccordion,
      setIsBrandLoading
    );
    setBrandList(serviceDataResponse?.data);
  };

  const AddBrandApi = async () => {
    const response = await AddBrandA(
      serviceId,
      brandData,
      brandImage,
      setIsLoading
    );
    if (response?.status === 201) {
      BrandListApi();
      toggleBrandPopup('');
      setBrandData('');
    }
  };

  const EditBrandApi = async () => {
    const response = await EditBrandA(editBrandItem, setIsLoading);
    if (response?.status === 200) {
      BrandListApi();
      toggleEditBrandPopup();
    }
  };

  const DeleteBrandApi = async () => {
    const response = await DeleteBrand(deleteBrandItem, setIsLoading);
    if (response?.status === 200) {
      BrandListApi();
      toggleDeleteBrandPopup();
    }
  };

  const ModalListApi = async () => {
    const serviceDataResponse: any = await ModalList(
      selectedBrand,
      setIsModalLoading
    );
    setModalList(serviceDataResponse?.data);
  };

  const AddModalApi = async () => {
    const response = await AddModalA(
      brandId,
      modalData,
      modalImage,
      setIsLoading
    );
    if (response?.status === 201) {
      BrandListApi();
      ModalListApi();
      toggleModalPopup('');
    }
  };

  const EditModalApi = async () => {
    const response = await EditModalA(editModalItem, setIsLoading);
    if (response?.status === 200) {
      BrandListApi();
      ModalListApi();
      toggleEditModelPopup();
      setEditModalItem('');
    }
  };

  const DeleteModalApi = async () => {
    const response = await DeleteModal(deleteModalItem, setIsLoading);
    if (response?.status === 200) {
      BrandListApi();
      ModalListApi();
      toggleDeleteModelPopup();
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
    setStartTime('09:00');
    setEndTime('16:30');
    setRemovedTimeSlots([]);
    setServiceImage({ preview: '', raw: '' });
  };

  const toggleBrandPopup = (value: any) => {
    setServiceId(value.service_id);
    setOpenBrandForm(!openBrandForm);
    setEditBrandItem('');
    setBrandImage({ preview: '', raw: '' });
  };

  const toggleModalPopup = (value: any) => {
    setBrandId(value.service_brand_id);
    setOpenModalForm(!openModalForm);
    setEditModalItem('');
    setModalImage({ preview: '', raw: '' });
  };

  const ServiceFormSubmitHandler = () => {
    if (
      AddServiceValidator(
        serviceData,
        endTime,
        startTime,
        serviceImage,
        setErrors
      )
    ) {
      AddServiceApi();
    }
  };

  const BrandFormSubmitHandler = () => {
    if (AddBrandValidator(brandData, brandImage, setErrors)) {
      AddBrandApi();
    }
  };

  const ModalFormSubmitHandler = () => {
    if (AddModalValidator(modalData, modalImage, setErrors)) {
      AddModalApi();
    }
  };

  const toggleEditServicePopup = () => {
    setOpenEditServicePop(!openEditServicePop);
  };

  const onEditHandler = (value: any) => {
    setEditItem(value);
    toggleEditServicePopup();
  };

  const ServiceEditFormSubmitHandler = () => {
    EditServiceApi();
  };

  const toggleDeletePopup = () => {
    setOpenDeleteServicePop(!openDeleteServicePop);
  };

  const onDeleteHandler = (value: any) => {
    setDeleteItem(value);
    toggleDeletePopup();
  };

  const DeleteSubmitHandler = () => {
    DeleteServiceApi();
  };

  const toggleEditBrandPopup = () => {
    setOpenEditBrandPop(!openEditBrandPop);
  };

  const onBrandEditHandler = (value: any) => {
    setEditBrandItem(value);
    toggleEditBrandPopup();
  };

  const BrandEditFormSubmitHandler = () => {
    EditBrandApi();
  };

  const toggleDeleteBrandPopup = () => {
    setOpenDeleteBrandPop(!openDeleteBrandPop);
  };

  const onBrandDeleteHandler = (value: any) => {
    setDeleteBrandItem(value);
    toggleDeleteBrandPopup();
  };

  const BrandDeleteSubmitHandler = () => {
    DeleteBrandApi();
  };

  const toggleEditModelPopup = () => {
    setOpenEditModalPop(!openEditModalPop);
  };

  const onModelEditHandler = (value: any) => {
    setEditModalItem(value);
    toggleEditModelPopup();
  };

  const ModelEditFormSubmitHandler = () => {
    EditModalApi();
  };

  const toggleDeleteModelPopup = () => {
    setOpenDeleteModalPop(!openDeleteModalPop);
  };

  const onModelDeleteHandler = (value: any) => {
    setDeleteModalItem(value);
    toggleDeleteModelPopup();
  };

  const ModelDeleteSubmitHandler = () => {
    DeleteModalApi();
  };

  const SubServiceListApi = async () => {
    const serviceDataResponse: any = await SubServiceList(
      selectedPage,
      selectedAccordion,
      selectedModal,
      setIsSubServiceLoading
    );
    setSubServiceList(serviceDataResponse?.data);
  };

  const onAccordionPress = (value: string) => {
    setSelectedPage(1);
    setServiceData(initialValue);
    setSelectedAccordion((prevState) => (prevState !== value ? value : ''));
  };

  const onBrandPress = (value: string) => {
    setSelectedBrand((prevState) => (prevState !== value ? value : ''));
  };

  const onModalPress = (value: string) => {
    setSelectedModal((prevState) => (prevState !== value ? value : ''));
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
    setServiceImage({ preview: '', raw: '' });
  };

  const onChangeBrand = (e: any) => {
    if (e.target.files.length) {
      setBrandImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const removeBrandPreview = () => {
    setBrandImage({ preview: '', raw: '' });
  };

  const onChangeModal = (e: any) => {
    if (e.target.files.length) {
      setModalImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const removeModalPreview = () => {
    setModalImage({ preview: '', raw: '' });
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
    ).split(':');
    const eachTimeHours = parseInt(eachTimeParts[0]);
    const eachTimeMinutes = parseInt(eachTimeParts[1]);

    while (currentTime <= end) {
      timeSlots.push(
        currentTime.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
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

  const onChangeUpdateBrandIcon = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const newLogoPath = URL.createObjectURL(file);
      setEditBrandItem((prevState: any) => ({
        ...prevState,
        brand_icon: {
          preview: newLogoPath,
          raw: file,
        },
      }));
    }
  };

  const onChangeUpdateModalIcon = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const newLogoPath = URL.createObjectURL(file);
      setEditModalItem((prevState: any) => ({
        ...prevState,
        model_icon: {
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
      setError('');
    } else {
      setError('Invalid time format. Please use the format HH:mm.');
    }
  };

  const validateTimeFormat = (time: any) => {
    const regex = /^(?:[0-9]|0[0-9]|1[0-9]|2[0-3]):[0-9]|0[0-9]|1[0-9]|2[0-3]$/;
    return regex.test(time);
  };

  const onUpdateServiceStatus = async (value: any) => {
    const response = await updateServiceStatusA(value, setIsLoading);
    if (response?.status === 200) {
      serviceFetchData();
    }
  };

  //sub service list

  const AddSubServiceApi = async () => {
    const response = await AddSubServiceA(
      subServiceData,
      serviceId,
      setIsLoading
    );
    if (response?.status === 201) {
      serviceFetchData();
      setOpenSubServiceForm(!openSubServiceForm);
      setSubServiceData(subInitialValue);
    }
  };

  const EditSubServiceApi = async () => {
    const response = await EditSubServiceA(editSubItem, setIsLoading);
    if (response?.status === 200) {
      serviceFetchData();
      toggleEditSubServicePopup();
      SubServiceListApi();
    }
  };

  const DeleteSubServiceApi = async () => {
    const response = await DeleteSubService(deleteSubItem, setIsLoading);
    if (response?.status === 200) {
      serviceFetchData();
      toggleSubDeletePopup();
      SubServiceListApi();
    }
  };

  const toggleSubServicePopup = (value: any) => {
    setServiceId(value);
    setOpenSubServiceForm(!openSubServiceForm);
    setSubServiceData(subInitialValue);
  };

  const SubServiceFormSubmitHandler = () => {
    if (AddSubServiceValidator(subServiceData, setErrors)) {
      AddSubServiceApi();
    }
  };

  const toggleEditSubServicePopup = () => {
    setOpenEditSubServicePop(!openEditSubServicePop);
  };

  const onEditSubHandler = (value: any) => {
    setEditSubItem(value);
    toggleEditSubServicePopup();
  };

  const SubServiceEditFormSubmitHandler = () => {
    EditSubServiceApi();
  };

  const toggleSubDeletePopup = () => {
    setOpenDeleteSubServicePop(!openDeleteSubServicePop);
  };

  const onDeleteSubHandler = (value: any) => {
    setDeleteSubItem(value);
    toggleSubDeletePopup();
  };

  const SubDeleteSubmitHandler = () => {
    DeleteSubServiceApi();
  };

  //Location list part

  const AddLocationApi = async () => {
    const response = await AddLocationSA(
      state?.data?.location_id,
      locationData,
      setIsPropertyLoading
    );
    if (response?.status === 200 || response?.status === 201) {
      setLocationData(locationValue);
      propertyFetchData();
      toggleLocationPopup();
    }
  };

  const EditPropertyApi = async () => {
    const response = await EditPropertyA(editItem, setIsPropertyLoading);
    if (response?.status === 200) {
      propertyFetchData();
      toggleEditPropertyPopup();
    }
  };

  const DeletePropertyApi = async () => {
    const response = await DeleteProperty(
      deletePropertyItem,
      setIsPropertyLoading
    );
    if (response?.status === 200) {
      propertyFetchData();
      togglePropertyDeletePopup();
    }
  };

  const toggleLocationPopup = () => {
    setLocationForm(!locationForm);
  };

  const LocationFormSubmitHandler = () => {
    if (AddLocationValidator(locationData, setErrors)) {
      AddLocationApi();
    }
  };
  const toggleEditPropertyPopup = () => {
    setOpenEditPropertyPop(!openEditPropertyPop);
  };

  const onPropertyEditHandler = (value: any) => {
    setEditItem(value);
    toggleEditPropertyPopup();
  };

  const PropertyEditFormSubmitHandler = () => {
    EditPropertyApi();
  };

  const togglePropertyDeletePopup = () => {
    setOpenDeletePropertyPop(!openDeletePropertyPop);
  };

  const onDeletePropertyHandler = (value: any) => {
    setDeletePropertyItem(value);
    togglePropertyDeletePopup();
  };

  const PropertyDeleteSubmitHandler = () => {
    DeletePropertyApi();
  };

  const handlePropertyChangeSearch = (e: any) => {
    e.preventDefault();
    setPropertySearchInput(e.target.value);
  };

  const handleSubServiceSwitchChange = async (value: any) => {
    const response = await updateSubServiceStatus(value, setIsLoading);
    if (response?.status === 200) {
      if (selectedAccordion) {
        SubServiceListApi();
      }
    }
  };

  const handlePropertySwitchChange = async (value: any) => {
    const response = await updatePropertyStatus(value, setIsPropertyLoading);
    if (response?.status === 200) {
      propertyFetchData();
    }
  };

  const handleCheckboxChange = (event: any) => {
    setIsBrand(event.target.checked);
  };

  return (
    <div>
      <ServiceComponent
        userListData={subServiceList}
        accordionData={accordionData}
        selectedAccordion={selectedAccordion}
        onAccordionPress={onAccordionPress}
        selectedPage={selectedPage}
        isLoading={isLoading}
        onEditHandler={onEditHandler}
        onDeleteHandler={onDeleteHandler}
        toggleUserPopup={toggleServicePopup}
        setSelectedPage={setSelectedPage}
        onSubEditHandler={onEditSubHandler}
        onSubDeleteHandler={onDeleteSubHandler}
        toggleSubUserPopup={toggleSubServicePopup}
        searchInput={searchInput}
        handleChangeSearch={handleChangeSearch}
        toggleLocationPopup={toggleLocationPopup}
        locationListData={locationListData}
        onUpdateServiceStatus={onUpdateServiceStatus}
        onPropertyEditHandler={onPropertyEditHandler}
        onDeletePropertyHandler={onDeletePropertyHandler}
        propertySearchInput={propertySearchInput}
        handlePropertyChangeSearch={handlePropertyChangeSearch}
        location_name={state?.data?.location_name}
        propertySelectedPage={propertySelectedPage}
        setPropertySelectedPage={setPropertySelectedPage}
        limit={limit}
        setLimit={setLimit}
        handleSubServiceSwitchChange={handleSubServiceSwitchChange}
        handlePropertySwitchChange={handlePropertySwitchChange}
        setIsOpenServiceAccordion={setIsOpenServiceAccordion}
        openServiceAccordion={openServiceAccordion}
        setIsOpenPropertyAccordion={setIsOpenPropertyAccordion}
        openPropertyAccordion={openPropertyAccordion}
        isPropertyLoading={isPropertyLoading}
        toggleBrandPopup={toggleBrandPopup}
        brandList={brandList}
        onBrandPress={onBrandPress}
        selectedBrand={selectedBrand}
        toggleModalPopup={toggleModalPopup}
        modalList={modalList}
        onModalPress={onModalPress}
        selectedModal={selectedModal}
        onBrandEditHandler={onBrandEditHandler}
        onBrandDeleteHandler={onBrandDeleteHandler}
        onModelEditHandler={onModelEditHandler}
        onModelDeleteHandler={onModelDeleteHandler}
        isBrandLoading={isBrandLoading}
        isModalLoading={isModalLoading}
        isSubServiceLoading={isSubServiceLoading}
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
            setEditItem('');
          }}
          timeSlots={timeSlots}
          onChangeService={onChangeUpdateService}
        />
      ) : null}
      {openDeleteServicePop ? (
        <DeletePopup
          isLoading={isLoading}
          category={'Service'}
          name={deleteItem?.service_name}
          DeleteSubmitHandler={DeleteSubmitHandler}
          CancelDeleteSubmitHandler={toggleDeletePopup}
        />
      ) : null}
      {openBrandForm ? (
        <AddBrand
          userData={brandData}
          setUserData={setBrandData}
          errors={errors}
          serviceImage={brandImage}
          onChangeService={onChangeBrand}
          removePreview={removeBrandPreview}
          isLoading={isLoading}
          ServiceFormSubmitHandler={BrandFormSubmitHandler}
          toggleServicePopup={toggleBrandPopup}
        />
      ) : null}
      {openEditBrandPop ? (
        <EditBrand
          editItem={editBrandItem}
          setEditItem={setEditBrandItem}
          errors={errors}
          UserFormSubmitHandler={BrandEditFormSubmitHandler}
          toggleUserPopup={() => {
            toggleEditBrandPopup();
            setEditBrandItem('');
          }}
          onChangeService={onChangeUpdateBrandIcon}
        />
      ) : null}
      {openDeleteBrandPop ? (
        <DeletePopup
          isLoading={isLoading}
          category={'Brand'}
          name={deleteBrandItem?.brand_name}
          DeleteSubmitHandler={BrandDeleteSubmitHandler}
          CancelDeleteSubmitHandler={toggleDeleteBrandPopup}
        />
      ) : null}
      {openModalForm ? (
        <AddModal
          userData={modalData}
          setUserData={setModalData}
          errors={errors}
          serviceImage={modalImage}
          onChangeService={onChangeModal}
          removePreview={removeModalPreview}
          isLoading={isLoading}
          ServiceFormSubmitHandler={ModalFormSubmitHandler}
          toggleServicePopup={toggleModalPopup}
        />
      ) : null}
      {openEditModalPop ? (
        <EditModal
          editItem={editModalItem}
          setEditItem={setEditModalItem}
          errors={errors}
          UserFormSubmitHandler={ModelEditFormSubmitHandler}
          toggleUserPopup={() => {
            toggleEditModelPopup();
            setEditModalItem('');
          }}
          onChangeService={onChangeUpdateModalIcon}
        />
      ) : null}

      {openDeleteModalPop ? (
        <DeletePopup
          isLoading={isLoading}
          category={'Model'}
          name={deleteModalItem?.model_name}
          DeleteSubmitHandler={ModelDeleteSubmitHandler}
          CancelDeleteSubmitHandler={toggleDeleteModelPopup}
        />
      ) : null}

      {openSubServiceForm ? (
        <AddSubService
          userData={subServiceData}
          setUserData={setSubServiceData}
          errors={errors}
          ServiceFormSubmitHandler={SubServiceFormSubmitHandler}
          toggleServicePopup={toggleSubServicePopup}
          isLoading={isLoading}
        />
      ) : null}
      {openEditSubServicePop ? (
        <EditSubService
          editItem={editSubItem}
          setEditItem={setEditSubItem}
          errors={errors}
          UserFormSubmitHandler={SubServiceEditFormSubmitHandler}
          toggleUserPopup={toggleEditSubServicePopup}
        />
      ) : null}
      {openDeleteSubServicePop ? (
        <DeletePopup
          isLoading={isLoading}
          category={'Sub Service'}
          name={deleteSubItem?.order_label}
          DeleteSubmitHandler={SubDeleteSubmitHandler}
          CancelDeleteSubmitHandler={toggleSubDeletePopup}
        />
      ) : null}
      {locationForm ? (
        <AddLocationS
          userData={locationData}
          setUserData={setLocationData}
          errors={errors}
          ServiceFormSubmitHandler={LocationFormSubmitHandler}
          toggleServicePopup={toggleLocationPopup}
          isLoading={isLoading}
        />
      ) : null}
      {openEditPropertyPop ? (
        <EditProperty
          editItem={editItem}
          setEditItem={setEditItem}
          errors={errors}
          UserFormSubmitHandler={PropertyEditFormSubmitHandler}
          toggleUserPopup={() => {
            toggleEditPropertyPopup();
            setEditItem('');
          }}
        />
      ) : null}
      {openDeletePropertyPop ? (
        <DeletePopup
          isLoading={isLoading}
          category={'Property'}
          name={deletePropertyItem?.label}
          DeleteSubmitHandler={PropertyDeleteSubmitHandler}
          CancelDeleteSubmitHandler={togglePropertyDeletePopup}
        />
      ) : null}
    </div>
  );
}

export default ServiceController;
