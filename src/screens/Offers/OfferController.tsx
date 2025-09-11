import React, { useEffect, useState } from "react";
import OfferComponent from "./OfferComponent";
import { OfferAdd, OfferList, OfferUpdateStatus } from "./OffersApis";
import AddOffer from "../../components/Screen/OfferComponent/AddOffer";

function OfferController() {
  const initialValue = {
    name: "",
    is_clickable: false,
    content: "",
  };
  const imageValue = {
    preview: "",
    raw: "",
  };
  const [offerListData, setOfferListData] = useState<any>();
  const [offerData, setOfferData] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [openOfferForm, setOpenOfferForm] = useState(false);
  const [offerImage, setOfferImage] = useState(imageValue);
  const [errors, setErrors] = useState(initialValue);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const offerDataResponse: any = await OfferList(setIsLoading);
    setOfferListData(offerDataResponse?.data?.offers);
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

  //   const openOfferFormSubmitHandler = () => {
  //     OfferAdd(offerListData);
  //   };
  const openOfferFormSubmitHandler = async () => {
    const formData = new FormData();
    formData.append("name", offerData.name);
    formData.append("is_clickable", String(offerData.is_clickable));
    formData.append("content", offerData.content);

    if (offerImage.raw) {
      formData.append("image", offerImage.raw);
    }

    const response = await OfferAdd(setIsLoading, {
      name: offerData.name,
      is_clickable: offerData.is_clickable,
      content: offerData.content,
      image: offerImage?.raw,
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
  return (
    <div>
      <OfferComponent
        offerListData={offerListData}
        isLoading={isLoading}
        handleSwitchChange={handleSwitchChange}
        toggleOfferPopUp={toggleOfferPopUp}
      />
      {openOfferForm ? (
        <AddOffer
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
    </div>
  );
}

export default OfferController;
