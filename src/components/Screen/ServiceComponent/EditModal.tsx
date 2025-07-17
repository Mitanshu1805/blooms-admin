import { AddDocument, Button, Input } from "../../";

function EditModal({
  editItem,
  setEditItem,
  errors,
  UserFormSubmitHandler,
  toggleUserPopup,
  onChangeService,
  isLoading,
}: any) {
  return (
    <div className="popup-box-wrapper">
      <div className="popup-box-container">
        <div className="flex-col-div">
          <span className="popup-box-title">EDIT Model DETAILS</span>
        </div>
        <div className="underline" />
        <div className="add-details-container">
          <div className="add-details-input-rows">
            <AddDocument
              name={"Model"}
              logoPreview={
                editItem?.model_icon?.preview
                  ? editItem?.model_icon?.preview
                  : editItem?.model_icon
              }
              onChangeLogo={onChangeService}
              removePreview={() => {
                editItem?.model_icon
                  ? setEditItem((prevState: any) => ({
                      ...prevState,
                      model_icon: null,
                    }))
                  : setEditItem((prevState: any) => ({
                      ...prevState,
                      model_icon: {
                        preview: null,
                        raw: null,
                      },
                    }));
              }}
            />
            <Input
              label="Model Name"
              type="text"
              placeholder="Model Name"
              value={editItem?.model_name}
              onChange={(e: any) => {
                setEditItem((prevValue: any) => ({
                  ...prevValue,
                  model_name: e.target.value,
                }));
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
            onClick={UserFormSubmitHandler}
          />
          <Button
            className="add-details-cancel-btn"
            name="Cancel"
            onClick={toggleUserPopup}
          />
        </div>
      </div>
    </div>
  );
}

export default EditModal;
