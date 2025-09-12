import React, { useEffect, useState } from "react";
import OfferComponent from "./OfferComponent";
import {
  OfferAdd,
  OfferDelete,
  OfferList,
  OfferUpdate,
  OfferUpdateStatus,
} from "./OffersApis";
import AddOffer from "../../components/Screen/OfferComponent/AddOffer";
import { DeletePopup } from "../../components";
import EditOffer from "../../components/Screen/OfferComponent/EditOffer";
import { LocationList } from "../Location/LocationApis";

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
  }

  const initialValue: OfferData = {
    name: "",
    is_clickable: false,
    content: "",
    locations: [],
  };

  const [offerData, setOfferData] = useState<OfferData>(initialValue);

  const imageValue = {
    preview: "",
    raw: "",
  };
  const [offerListData, setOfferListData] = useState<any>();
  // const [offerData, setOfferData] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [openOfferForm, setOpenOfferForm] = useState(false);
  const [offerImage, setOfferImage] = useState(imageValue);
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
  }, []);

  const fetchData = async () => {
    const offerDataResponse: any = await OfferList(setIsLoading);
    setOfferListData(offerDataResponse?.data?.offers);
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
    const response = await OfferUpdateStatus(value, setIsLoading);

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

  const openOfferFormSubmitHandler = async () => {
    console.log(offerData);

    const formData = new FormData();
    formData.append("name", offerData.name);
    formData.append("is_clickable", String(offerData.is_clickable));
    formData.append("content", offerData.content);
    // formData.append("locations", JSON.stringify(offerData.locations));
    const locationIds = offerData.locations.map((loc: any) => loc.location_id);

    formData.append("location_ids", JSON.stringify(locationIds));

    if (offerImage.raw) {
      formData.append("image", offerImage.raw);
    }

    const response = await OfferAdd(setIsLoading, {
      name: offerData.name,
      is_clickable: offerData.is_clickable,
      content: offerData.content,
      image: offerImage?.raw,
      location_ids: locationIds,
    });
    if (response?.status === 201) {
      console.log(response);

      fetchData();
      toggleOfferPopUp();
    }
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

  const EditOfferApi = async () => {
    console.log(editOffer);

    const response = await OfferUpdate(setIsLoading, editOffer);
    if (response?.status == 200) {
      fetchData();
      toggleEditOfferPopup();
    }
  };

  const OfferEditFormSubmitHandler = () => {
    EditOfferApi();
  };

  const updateOfferImage = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const newLogoPath = URL.createObjectURL(file);
      console.log("newLogoPath>>>>", newLogoPath);

      setEditOffer((prevState: any) => ({
        ...prevState,
        image: newLogoPath,
        raw: file,
      }));
    }
    console.log(editOffer);
  };

  return (
    <div>
      <OfferComponent
        offerListData={offerListData}
        isLoading={isLoading}
        handleSwitchChange={handleSwitchChange}
        toggleOfferPopUp={toggleOfferPopUp}
        onEditHandler={onEditHandler}
        onDeleteHandler={onDeleteHandler}
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
