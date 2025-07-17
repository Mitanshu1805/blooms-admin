import { AddDocument, Button, Input } from "../../";

function AddModal({
  userData,
  setUserData,
  errors,
  ServiceFormSubmitHandler,
  toggleServicePopup,
  serviceImage,
  onChangeService,
  removePreview,
  isLoading,
}: any) {
  return (
    <div className="popup-box-wrapper">
      <div className="popup-box-container">
        <div className="flex-col-div">
          <span className="popup-box-title">ADD MODEL DETAILS</span>
        </div>
        <div className="underline" />
        <div className="add-details-container">
          <div className="add-details-input-rows">
            <AddDocument
              name={"Model"}
              logoPreview={serviceImage?.preview}
              onChangeLogo={onChangeService}
              removePreview={removePreview}
              error={errors?.image}
            />
            <Input
              label="Model Name"
              type="text"
              placeholder="Model Name"
              value={userData}
              onChange={(e: any) => {
                setUserData(e.target.value);
              }}
              error={errors?.model_name}
            />
          </div>
        </div>

        <div className="underline" />
        <div className="flex-row-cen-cen-div">
          <Button
            isLoading={isLoading}
            className="add-details-submit-btn"
            name="Submit"
            onClick={ServiceFormSubmitHandler}
          />
          <Button
            className="add-details-cancel-btn"
            name="Cancel"
            onClick={toggleServicePopup}
          />
        </div>
      </div>
    </div>
  );
}

export default AddModal;
