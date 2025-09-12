import React from "react";
import Button from "../../Button/Button";
import AddDocument from "../CrewComponent/AddDocument";
import { Input } from "../..";

function EditOffer({
  editOffer,
  setEditOffer,
  errors,
  OfferEditFormSubmitHandler,
  toggleEditOfferPopup,
  isLoading,
  updateOfferImage,
  locationListData,
}: any) {
  console.log(editOffer);

  return (
    <div className="popup-box-wrapper">
      <div className="popup-box-container">
        <div className="flex-col-div">
          <span className="popup-box-title">EDIT OFFER</span>
        </div>
        <div className="underline" />
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <Input
                className={"add-details-input-container"}
                inputContainerClassName={"add-details-text-field-container"}
                label="Title"
                type="text"
                placeholder="Title"
                value={editOffer.name}
                onChange={(e: any) => {
                  setEditOffer((prevValue: any) => ({
                    ...prevValue,
                    name: e.target.value,
                  }));
                }}
                error={errors?.name}
              />
            </div>

            <div className="col-md-4 d-flex align-items-center gap-3 justify-content-center">
              <label className="form-label">Is Clickable</label>
              <input
                type="checkbox"
                style={{ marginBottom: "6px", height: "16px", width: "16px" }}
                checked={editOffer.is_clickable}
                onChange={(e: any) =>
                  setEditOffer((prevValue: any) => ({
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
                value={editOffer.content}
                onChange={(e: any) => {
                  setEditOffer((prevValue: any) => ({
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
              logoPreview={editOffer.image}
              onChangeLogo={updateOfferImage}
              removePreview={() =>
                setEditOffer((prevState: any) => ({
                  ...prevState,
                  image: null,
                }))
              }
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="add-details-input-container">
            <div className="add-details-text-field-container">
              <label className="input-label">Select Locations</label>
              <div
                className="location-checkbox-list"
                style={{ maxHeight: "150px", overflowY: "auto" }}
              >
                {locationListData?.roles?.map((location: any) => {
                  const isSelected = editOffer.locations?.some(
                    (loc: any) => loc.location_id === location.location_id
                  );

                  return (
                    <div key={location.location_id} className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={`loc-${location.location_id}`}
                        checked={isSelected}
                        onChange={(e) => {
                          if (e.target.checked) {
                            // add location object
                            setEditOffer((prev: any) => ({
                              ...prev,
                              locations: [
                                ...(prev.locations || []),
                                {
                                  location_id: location.location_id,
                                  location_name: location.location_name,
                                },
                              ],
                            }));
                          } else {
                            // remove location object
                            setEditOffer((prev: any) => ({
                              ...prev,
                              locations: (prev.locations || []).filter(
                                (loc: any) =>
                                  loc.location_id !== location.location_id
                              ),
                            }));
                          }
                        }}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`loc-${location.location_id}`}
                      >
                        {location.location_name}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
            {errors?.location_id && (
              <span className="error-message">{errors.location_id}</span>
            )}
          </div>
        </div>
        <div className="underline" />
        <div className="flex-row-cen-cen-div">
          <Button
            isLoading={isLoading}
            className="add-details-submit-btn"
            name="Submit"
            onClick={OfferEditFormSubmitHandler}
          />
          <Button
            className="add-details-cancel-btn"
            name="Cancel"
            onClick={toggleEditOfferPopup}
          />
        </div>
      </div>
    </div>
  );
}

export default EditOffer;
