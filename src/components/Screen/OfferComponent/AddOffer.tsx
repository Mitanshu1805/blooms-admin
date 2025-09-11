import React from "react";
import { AddDocument, Button, Input } from "../..";

function AddOffer({
  offerData,
  setOfferData,
  offerImage,
  errors,
  onChangeOfferImage,
  removePreviewProfile,
  isLoading,
  openOfferFormSubmitHandler,
  toggleOfferPopUp,
}: any) {
  return (
    <div className="popup-box-wrapper">
      <div className="popup-box-container">
        <div className="flex-col-div">
          <span className="popup-box-title">ADD NEW OFFER</span>
        </div>
        <div className="underline" />
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <Input
                className={"add-details-input-container"}
                inputContainerClassName={"add-details-text-field-container"}
                label="Offer Name"
                type="text"
                placeholder="Offer Name"
                value={offerData.name}
                onChange={(e: any) => {
                  setOfferData((prevValue: any) => ({
                    ...prevValue,
                    name: e.target.value,
                  }));
                }}
                error={errors?.name}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Is Clickable</label>
              <input
                type="checkbox"
                checked={offerData.is_clickable}
                onChange={(e: any) =>
                  setOfferData((prevValue: any) => ({
                    ...prevValue,
                    is_clickable: e.target.checked,
                  }))
                }
              />
            </div>

            <div className="col-md-4">
              <Input
                className={"add-details-input-container"}
                inputContainerClassName={"add-details-text-field-container"}
                label="Content"
                type="text"
                placeholder="Content"
                value={offerData.content}
                onChange={(e: any) => {
                  setOfferData((prevValue: any) => ({
                    ...prevValue,
                    content: e.target.value,
                  }));
                }}
                error={errors?.content}
              />
            </div>
          </div>
          <div className="add-details-input-rows">
            <AddDocument
              name={""}
              logoPreview={offerImage.preview}
              onChangeLogo={onChangeOfferImage}
              removePreview={removePreviewProfile}
              error={errors?.image}
            />
          </div>
        </div>
        <div className="underline" />
        <div className="flex-row-cen-cen-div">
          <Button
            isLoading={isLoading}
            className="add-details-submit-btn"
            name="Submit"
            onClick={openOfferFormSubmitHandler}
          />
          <Button
            className="add-details-cancel-btn"
            name="Cancel"
            onClick={toggleOfferPopUp}
          />
        </div>
      </div>
    </div>
  );
}

export default AddOffer;
