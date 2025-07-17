import { AddDocument, Button, Input } from "../../";

function EditBrand({
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
          <span className="popup-box-title">EDIT BRAND DETAILS</span>
        </div>
        <div className="underline" />
        <div className="add-details-container">
          <div className="add-details-input-rows">
            <AddDocument
              name={"Brand"}
              logoPreview={
                editItem?.brand_icon?.preview
                  ? editItem?.brand_icon?.preview
                  : editItem?.brand_icon
              }
              onChangeLogo={onChangeService}
              removePreview={() => {
                editItem?.brand_icon
                  ? setEditItem((prevState: any) => ({
                      ...prevState,
                      brand_icon: null,
                    }))
                  : setEditItem((prevState: any) => ({
                      ...prevState,
                      brand_icon: {
                        preview: null,
                        raw: null,
                      },
                    }));
              }}
            />
            <Input
              label="Brand Name"
              type="text"
              placeholder="Brand Name"
              value={editItem?.brand_name}
              onChange={(e: any) => {
                setEditItem((prevValue: any) => ({
                  ...prevValue,
                  brand_name: e.target.value,
                }));
              }}
              error={errors?.brand_name}
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

export default EditBrand;
