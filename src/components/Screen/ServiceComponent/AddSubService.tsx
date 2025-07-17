import { Button, Input } from "../..";

function AddService({
  userData,
  setUserData,
  errors,
  ServiceFormSubmitHandler,
  toggleServicePopup,
  isLoading,
}: any) {
  return (
    <div className="popup-box-wrapper">
      <div className="popup-box-container add-service-popup-container">
        <div className="flex-col-div">
          <span className="popup-box-title">ADD VARIANT DETAILS</span>
        </div>
        <div className="underline" />
        <div className="add-service-details-container">
          <div className="row">
            <div className="col-md-3">
              <p className="fw-bold">Variant Details</p>
            </div>
            <div className="col-md-9">
              <div className="row">
                <Input
                  className="col-md-6"
                  label="Label"
                  type="text"
                  placeholder="Label"
                  value={userData.label}
                  onChange={(e: any) => {
                    setUserData((prevValue: any) => ({
                      ...prevValue,
                      label: e.target.value,
                    }));
                  }}
                  error={errors?.label}
                />
                <Input
                  className="col-md-6"
                  label="Order Label"
                  type="text"
                  placeholder="Order Label"
                  value={userData.order_label}
                  onChange={(e: any) => {
                    setUserData((prevValue: any) => ({
                      ...prevValue,
                      order_label: e.target.value,
                    }));
                  }}
                  error={errors?.order_label}
                />
                <Input
                  className="col-md-6"
                  label="Description"
                  type="text"
                  placeholder="Description"
                  value={userData.description}
                  onChange={(e: any) => {
                    setUserData((prevValue: any) => ({
                      ...prevValue,
                      description: e.target.value,
                    }));
                  }}
                />
                <Input
                  className="col-md-6"
                  label="Starting From Price"
                  type="number"
                  placeholder="Price"
                  value={userData.base_price}
                  onChange={(e: any) => {
                    setUserData((prevValue: any) => ({
                      ...prevValue,
                      base_price: e.target.value,
                    }));
                  }}
                  error={errors?.base_price}
                />

                <Input
                  className="col-md-6"
                  label="Handle (Web page binding)"
                  type="text"
                  placeholder="Handle"
                  value={userData.handle}
                  onChange={(e: any) => {
                    setUserData((prevValue: any) => ({
                      ...prevValue,
                      handle: e.target.value,
                    }));
                  }}
                  error={errors?.handle}
                />
                <div className="col-12">
                  <div
                    className="d-flex"
                    style={{ marginTop: "10px", marginBottom: "10px" }}
                  >
                    <div className="radio-input-div">
                      <input
                        className="radio-input"
                        type="radio"
                        id="fee"
                        name="transportFee"
                        value="fee"
                        checked={userData.transport_fees === "fee"}
                        onChange={(e: any) => {
                          setUserData((prevValue: any) => ({
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
                        checked={userData.transport_fees === "required"}
                        onChange={(e: any) => {
                          setUserData((prevValue: any) => ({
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
                        checked={userData.transport_fees === "not-required"}
                        onChange={(e: any) => {
                          setUserData((prevValue: any) => ({
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
              </div>
            </div>
          </div>
          <div className="underline" />
          <div className="row">
            <div className="col-md-3">
              <p className="fw-bold">Variant Quantity</p>
            </div>

            <div className="col-md-9">
              <div className="row">
                <Input
                  className="col-md-6"
                  label=" Label"
                  type="text"
                  placeholder=" Label"
                  value={userData.quantity_label}
                  onChange={(e: any) => {
                    setUserData((prevValue: any) => ({
                      ...prevValue,
                      quantity_label: e.target.value,
                    }));
                  }}
                  error={errors?.quantity_label}
                />
                <Input
                  className="col-md-6"
                  label="Base"
                  type="text"
                  placeholder="Base"
                  value={userData.quantity_base}
                  onChange={(e: any) => {
                    setUserData((prevValue: any) => ({
                      ...prevValue,
                      quantity_base: e.target.value,
                    }));
                  }}
                  error={errors?.quantity_base}
                />
                <Input
                  className="col-md-6"
                  label="Minimum"
                  type="text"
                  placeholder="Minimum"
                  value={userData.quantity_min}
                  onChange={(e: any) => {
                    setUserData((prevValue: any) => ({
                      ...prevValue,
                      quantity_min: e.target.value,
                    }));
                  }}
                  error={errors?.quantity_min}
                />
                <Input
                  className="col-md-6"
                  label="Maximum"
                  type="text"
                  placeholder="Maximum"
                  value={userData.quantity_max}
                  onChange={(e: any) => {
                    setUserData((prevValue: any) => ({
                      ...prevValue,
                      quantity_max: e.target.value,
                    }));
                  }}
                  error={errors?.quantity_max}
                />
                <Input
                  className="col-md-6"
                  label="Default"
                  type="text"
                  placeholder="Default"
                  value={userData.quantity_default}
                  onChange={(e: any) => {
                    setUserData((prevValue: any) => ({
                      ...prevValue,
                      quantity_default: e.target.value,
                    }));
                  }}
                  error={errors?.quantity_default}
                />
                <Input
                  className="col-md-6"
                  label="Increment"
                  type="text"
                  placeholder="Increment"
                  value={userData.quantity_increment}
                  onChange={(e: any) => {
                    setUserData((prevValue: any) => ({
                      ...prevValue,
                      quantity_increment: e.target.value,
                    }));
                  }}
                  error={errors?.quantity_increment}
                />
              </div>
            </div>
            <div className="add-details-input-rows"></div>
            <div className="add-details-input-rows"></div>
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

export default AddService;
