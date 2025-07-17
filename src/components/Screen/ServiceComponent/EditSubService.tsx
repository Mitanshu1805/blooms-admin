import { Button, Input } from "../..";

function EditSubService({
  editItem,
  setEditItem,
  errors,
  UserFormSubmitHandler,
  toggleUserPopup,
  isLoading,
}: any) {
  return (
    <div className="popup-box-wrapper">
      <div className="popup-box-container">
        <div className="flex-col-div">
          <span className="popup-box-title">EDIT VARIANTS DETAILS</span>
        </div>
        <div className="underline" />
        <div className="add-details-container">
          <div className="add-details-input-rows">
            <Input
              label="Label"
              type="text"
              placeholder="Label"
              value={editItem.label}
              onChange={(e: any) => {
                setEditItem((prevValue: any) => ({
                  ...prevValue,
                  label: e.target.value,
                }));
              }}
              error={errors?.label}
            />
            <Input
              label="Order Label"
              type="text"
              placeholder="Order Label"
              value={editItem.order_label}
              onChange={(e: any) => {
                setEditItem((prevValue: any) => ({
                  ...prevValue,
                  order_label: e.target.value,
                }));
              }}
              error={errors?.order_label}
            />
            <Input
              label="Description"
              type="text"
              placeholder="Description"
              value={editItem.description}
              onChange={(e: any) => {
                setEditItem((prevValue: any) => ({
                  ...prevValue,
                  description: e.target.value,
                }));
              }}
            />
          </div>
          <div className="add-details-input-rows">
            <Input
              label="Quantity Label"
              type="text"
              placeholder="Quantity Label"
              value={editItem.quantity_label}
              onChange={(e: any) => {
                setEditItem((prevValue: any) => ({
                  ...prevValue,
                  quantity_label: e.target.value,
                }));
              }}
              error={errors?.quantity_label}
            />

            <Input
              label="Starting From Price"
              type="number"
              placeholder="Price"
              value={editItem.cost}
              onChange={(e: any) => {
                setEditItem((prevValue: any) => ({
                  ...prevValue,
                  cost: e.target.value,
                }));
              }}
              error={errors?.cost}
            />

            <Input
              label="Handle (Web page binding)"
              type="text"
              placeholder="Handle"
              value={editItem.handle}
              onChange={(e: any) => {
                setEditItem((prevValue: any) => ({
                  ...prevValue,
                  handle: e.target.value,
                }));
              }}
              error={errors?.handle}
            />
          </div>
          <div className="add-details-input-rows">
            <Input
              style={{ width: "220px" }}
              label="Minimum Quantity"
              type="text"
              placeholder="Minimum Quantity"
              value={editItem.quantity_min}
              onChange={(e: any) => {
                setEditItem((prevValue: any) => ({
                  ...prevValue,
                  quantity_min: e.target.value,
                }));
              }}
              error={errors?.quantity_min}
            />
            <Input
              style={{ width: "220px" }}
              label="Maximum Quantity"
              type="text"
              placeholder="Maximum Quantity"
              value={editItem.quantity_max}
              onChange={(e: any) => {
                setEditItem((prevValue: any) => ({
                  ...prevValue,
                  quantity_max: e.target.value,
                }));
              }}
              error={errors?.quantity_max}
            />
            <Input
              style={{ width: "220px" }}
              label="Base Quantity"
              type="text"
              placeholder="Base Quantity"
              value={editItem.quantity_base}
              onChange={(e: any) => {
                setEditItem((prevValue: any) => ({
                  ...prevValue,
                  quantity_base: e.target.value,
                }));
              }}
              error={errors?.quantity_base}
            />
            <Input
              style={{ width: "220px" }}
              label="Default Quantity"
              type="text"
              placeholder="Default Quantity"
              value={editItem.quantity_default}
              onChange={(e: any) => {
                setEditItem((prevValue: any) => ({
                  ...prevValue,
                  quantity_default: e.target.value,
                }));
              }}
              error={errors?.quantity_default}
            />
            <Input
              style={{ width: "220px" }}
              label="Increment Quantity"
              type="text"
              placeholder="Increment Quantity"
              value={editItem.quantity_increment}
              onChange={(e: any) => {
                setEditItem((prevValue: any) => ({
                  ...prevValue,
                  quantity_increment: e.target.value,
                }));
              }}
              error={errors?.quantity_increment}
            />
          </div>
          <div
            className="add-details-input-rows"
            style={{ marginTop: "10px", marginBottom: "10px" }}
          >
            <div className="radio-input-div">
              <input
                className="radio-input"
                type="radio"
                id="fee"
                name="transportFee"
                value="fee"
                checked={editItem.transport_fees === "fee"}
                onChange={(e: any) => {
                  setEditItem((prevValue: any) => ({
                    ...prevValue,
                    transport_fees: e.target.value,
                  }));
                }}
              />
              <label htmlFor="fee" className="radio-label">
                This is a Transport Fee
              </label>
            </div>
            <div className="radio-input-div">
              <input
                className="radio-input"
                type="radio"
                id="required"
                name="transportFee"
                value="required"
                checked={editItem.transport_fees === "required"}
                onChange={(e: any) => {
                  setEditItem((prevValue: any) => ({
                    ...prevValue,
                    transport_fees: e.target.value,
                  }));
                }}
              />
              <label htmlFor="required" className="radio-label">
                Transport Fee Required
              </label>
            </div>
            <div className="radio-input-div">
              <input
                className="radio-input"
                type="radio"
                id="not-required"
                name="transportFee"
                value="not-required"
                checked={editItem.transport_fees === "not-required"}
                onChange={(e: any) => {
                  setEditItem((prevValue: any) => ({
                    ...prevValue,
                    transport_fees: e.target.value,
                  }));
                }}
              />
              <label htmlFor="not-required" className="radio-label">
                Transport Fee Not Required
              </label>
            </div>
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

export default EditSubService;
