import React, { useEffect, useState } from "react";
import OfferComponent from "./OfferComponent";
import {
  OfferAdd,
  OfferDelete,
  OfferList,
  OfferScreen,
  OfferUpdate,
  OfferUpdateStatus,
  OfferUpdatePositions,
} from "./OffersApis";
import AddOffer from "../../components/Screen/OfferComponent/AddOffer";
import { DeletePopup } from "../../components";
import EditOffer from "../../components/Screen/OfferComponent/EditOffer";
import { LocationList } from "../Location/LocationApis";
import { ValidateId, ValidateName } from "../../helpers/Validators";

function OfferController() {
  interface Location {
    location_id: string;
    location_name: string;
  }

  interface OfferData {
    name: string;
    is_clickable: boolean;
    content: string;
    locations: Location[];
    screen_key: string;
  }

  const initialValue: OfferData = {
    name: "",
    is_clickable: false,
    content: "",
    locations: [],
    screen_key: "",
  };

  const [offerData, setOfferData] = useState<OfferData>(initialValue);

  const imageValue = {
    preview: "",
    raw: "",
  };
  const [offerListData, setOfferListData] = useState<any>();
  const [offerScreensList, setOfferScreenList] = useState<any>();
  // const [offerData, setOfferData] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [openOfferForm, setOpenOfferForm] = useState(false);
  const [offerImage, setOfferImage] = useState(imageValue);
  const [editOfferImage, setEditOfferImage] = useState<any>();
  const [errors, setErrors] = useState(initialValue);
  const [deleteOffer, setDeleteOffer] = useState<any>("");
  const [openDeleteOfferPop, setOpenDeleteOfferPop] = useState(false);
  const [editOffer, setEditOffer] = useState<any>("");
  const [openEditOfferForm, setOpenEditOfferForm] = useState(false);
  const [locationListData, setLocationListData] = useState<any>([]);
  const [selectedPage, setSelectedPage] = useState(1);
  const [size, setSize] = useState(10);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    fetchData();
    fetchLocationData();
    fetchScreens();
  }, []);

  const fetchData = async () => {
    const offerDataResponse: any = await OfferList(setIsLoading);
    setOfferListData(offerDataResponse?.data?.offers);
  };

  const fetchScreens = async () => {
    const screenResponse: any = await OfferScreen(setIsLoading);
    // console.log(screenResponse?.data?.screens);
    setOfferScreenList(screenResponse?.data?.screens);
  };

  const fetchLocationData = async () => {
    const crewDataResponse: any = await LocationList(
      size,
      selectedPage,
      searchInput,
      setIsLoading
    );
    setLocationListData(crewDataResponse?.data);
  };

  const handleSwitchChange = async (value: any) => {
    console.log(value?.value);

    const response = await OfferUpdateStatus(value?.value, setIsLoading);

    if (response?.status === 200) {
      fetchData();
    }
  };

  const onChangeOfferImage = (e: any) => {
    if (e.target.files.length) {
      setOfferImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const removePreviewProfile = () => {
    setOfferImage(imageValue);
  };

  const AddOfferApi = async () => {
    console.log(offerData, offerImage);

    const formData = new FormData();
    formData.append("name", offerData.name);
    formData.append("is_clickable", String(offerData.is_clickable));
    formData.append("content", offerData.content);
    formData.append("navigation_key", offerData.screen_key);
    // formData.append("locations", JSON.stringify(offerData.locations));
    const locationIds = offerData.locations.map((loc: any) => loc.location_id);

    formData.append("location_ids", JSON.stringify(locationIds));

    console.log(offerImage);

    if (offerImage.raw) {
      formData.append("image", offerImage.raw);
    }

    // const response = await OfferAdd(setIsLoading, {
    //   name: offerData.name,
    //   is_clickable: offerData.is_clickable,
    //   screen_key: offerData.screen_key,
    //   content: offerData.content,
    //   image: offerImage?.raw,
    //   location_ids: locationIds,
    // });
    // if (response?.status === 201) {
    //   console.log(response);

    //   fetchData();
    //   toggleOfferPopUp();
    // }
  };

  const openOfferFormSubmitHandler = async () => {
    if (AddOfferValidator()) {
      AddOfferApi();
    }
  };

  const AddOfferValidator = () => {
    let newErrors: any = {};
    let isValid: boolean = true;
    let offerName = ValidateName(offerData.name);
    let navigationKey = ValidateName(offerData.screen_key);
    const locationIds = offerData.locations.map((loc: any) => loc.location_id);
    console.log(offerName, navigationKey, locationIds);

    if (offerName) {
      newErrors.name = offerName === 1 ? "Offer Name is required" : "";
      isValid = false;
    }

    if (navigationKey) {
      newErrors.navigation_key =
        navigationKey === 1 ? "Please select a screen" : "";
      isValid = false;
    }

    if (!offerData.locations || offerData.locations.length === 0) {
      newErrors.location_ids = "Select at least one location";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const toggleOfferPopUp = () => {
    setOpenOfferForm(!openOfferForm);
    setOfferData(initialValue);
    setErrors(initialValue);
    setOfferImage(imageValue);
  };

  const DeleteOfferApi = async () => {
    const response = await OfferDelete(setIsLoading, deleteOffer);
    if (response?.status == 200) {
      fetchData();
      toggleDeletePopup();
    }
  };

  const DeleteSubmitHandler = () => {
    DeleteOfferApi();
  };

  const onDeleteHandler = (value: any) => {
    setDeleteOffer(value);
    toggleDeletePopup();
  };

  const toggleDeletePopup = () => {
    setOpenDeleteOfferPop(!openDeleteOfferPop);
  };

  const onEditHandler = (value: any) => {
    setEditOffer(value);
    toggleEditOfferPopup();
  };

  const toggleEditOfferPopup = () => {
    setOpenEditOfferForm(!openEditOfferForm);
  };

  // const EditOfferApi = async () => {
  //   console.log(editOffer);

  //   const response = await OfferUpdate(setIsLoading, editOffer);
  //   if (response?.status == 200) {
  //     fetchData();
  //     toggleEditOfferPopup();
  //   }
  // };

  const EditOfferApi = async () => {
    console.log(editOffer);
    // console.log(editOfferImage);

    const formData = new FormData();
    formData.append("offer_id", editOffer.offer_id);
    formData.append("name", editOffer.name);
    formData.append("is_clickable", String(editOffer.is_clickable));
    formData.append("content", editOffer.content);
    formData.append("navigation_key", editOffer.screen_key);

    const locationIds = editOffer.locations.map((loc: any) => loc.location_id);
    formData.append("location_ids", JSON.stringify(locationIds));
    console.log(JSON.stringify(locationIds));

    if (editOffer.image) {
      formData.append("image", editOffer.image); // send actual file
    }

    const response = await OfferUpdate(setIsLoading, {
      offer_id: editOffer?.offer_id,
      name: editOffer.name,
      is_clickable: editOffer.is_clickable,
      navigation_key: editOffer.navigation_key,
      content: editOffer.content,
      image: editOffer?.raw ?? editOffer?.image,
      locations: locationIds,
    });
    if (response?.status === 200) {
      fetchData();
      toggleEditOfferPopup();
    }
  };

  const OfferEditFormSubmitHandler = () => {
    console.log("MYLOG => ", editOffer);
    EditOfferApi();
  };

  // const updateOfferImage = (e: any) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const newLogoPath = URL.createObjectURL(file);
  //     console.log("newLogoPath>>>>", newLogoPath);

  //     setEditOffer((prevState: any) => ({
  //       ...prevState,
  //       image: newLogoPath,
  //       raw: file,
  //     }));
  //   }
  //   console.log(editOffer);
  // };

  const updateOfferImage = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setEditOffer((prevState: any) => ({
        ...prevState,
        image: URL.createObjectURL(file),
        raw: file,
      }));
    }
  };

  // setEditOfferImage(editOffer?.image);

  // const handleUpdateOfferImage = (e: any) => {
  //   if (e.target.files.length) {
  //     setEditOfferImage({
  //       preview: URL.createObjectURL(e.target.files[0]),
  //       raw: e.target.files[0],
  //     });
  //   }
  // };

  const updatePosition = async (data: any) => {
    const response = await OfferUpdatePositions(data, setIsLoading);
    if (response?.status === 200) {
      fetchData();
    }
  };

  return (
    <div>
      <OfferComponent
        offerListData={offerListData}
        setOfferListData={setOfferListData}
        isLoading={isLoading}
        handleSwitchChange={handleSwitchChange}
        toggleOfferPopUp={toggleOfferPopUp}
        onEditHandler={onEditHandler}
        onDeleteHandler={onDeleteHandler}
        updatePosition={updatePosition}
      />
      {openOfferForm ? (
        <AddOffer
          locationListData={locationListData}
          offerData={offerData}
          setOfferData={setOfferData}
          offerImage={offerImage}
          errors={errors}
          onChangeOfferImage={onChangeOfferImage}
          removePreviewProfile={removePreviewProfile}
          isLoading={isLoading}
          openOfferFormSubmitHandler={openOfferFormSubmitHandler}
          toggleOfferPopUp={toggleOfferPopUp}
          offerScreensList={offerScreensList}
        />
      ) : null}

      {openEditOfferForm ? (
        <EditOffer
          locationListData={locationListData}
          editOffer={editOffer}
          setEditOffer={setEditOffer}
          errors={errors}
          OfferEditFormSubmitHandler={OfferEditFormSubmitHandler}
          isLoading={isLoading}
          updateOfferImage={updateOfferImage}
          toggleEditOfferPopup={toggleEditOfferPopup}
          offerScreensList={offerScreensList}
          editOfferImage={editOfferImage}
          // setEditOfferImage={setEditOfferImage}
          // handleUpdateOfferImage={handleUpdateOfferImage}
        />
      ) : null}

      {openDeleteOfferPop ? (
        <DeletePopup
          isLoading={isLoading}
          category={"Offer"}
          name={deleteOffer?.name}
          DeleteSubmitHandler={DeleteSubmitHandler}
          CancelDeleteSubmitHandler={toggleDeletePopup}
        />
      ) : null}
    </div>
  );
}

export default OfferController;
