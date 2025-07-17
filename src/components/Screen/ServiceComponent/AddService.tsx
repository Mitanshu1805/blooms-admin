import TimePicker from "react-time-picker";
import { AddDocument, Button, Input } from "../../";

const propertyTypeOption = {
  label: "",
  order_label: "",
  cost: "",
};

function AddService({
  userData,
  setUserData,
  errors,
  handleSubmit,
  toggleServicePopup,
  serviceImage,
  onChangeService,
  removePreview,
  timeSlots,
  handleEachTimeChange,
  error,
  handleStartTimeChange,
  handleEndTimeChange,
  startTime,
  endTime,
  isLoading,
  isBrand,
  handleCheckboxChange,
}: any) {
  const renderPropertyTypeOptions = (optionIndex: number) => (
    <>
      <div className="col-md-6">
        <div className="d-flex align-items-center">
          {userData.property_type.options.length - 1 === optionIndex ? (
            <Button
              isLoading={isLoading}
              className="add-details-submit-btn mr-2"
              name="+"
              onClick={() => {
                setUserData((prevValue: any) => ({
                  ...prevValue,
                  property_type: {
                    ...prevValue.property_type,
                    options: [
                      ...prevValue.property_type.options,
                      propertyTypeOption,
                    ],
                  },
                }));
              }}
            />
          ) : null}
          {userData?.property_type?.options?.length > 1 ? (
            <Button
              isLoading={isLoading}
              className="add-details-cancel-btn ml-0"
              name="-"
              onClick={() => {
                setUserData((prevValue: any) => ({
                  ...prevValue,
                  property_type: {
                    ...prevValue.property_type,
                    options: prevValue.property_type.options.filter(
                      (_: any, filterOptionIndex: number) =>
                        filterOptionIndex !== optionIndex
                    ),
                  },
                }));
              }}
            />
          ) : null}
          <Input
            className={"add-details-input-container w-100 ml-2"}
            inputContainerClassName={"add-details-text-field-container"}
            label="Property option label"
            type="text"
            placeholder="Property option label"
            value={userData.property_type.options[optionIndex].label}
            onChange={(e: any) => {
              setUserData((prevValue: any) => ({
                ...prevValue,
                property_type: {
                  ...prevValue.property_type,
                  options: prevValue.property_type.options.map(
                    (mapOption: any, mapOptionIndex: number) => {
                      return optionIndex === mapOptionIndex
                        ? { ...mapOption, label: e.target.value }
                        : mapOption;
                    }
                  ),
                },
              }));
            }}
            error={errors?.property_type?.options?.at(optionIndex)?.label}
          />
        </div>
      </div>
      <div className="col-md-3">
        <Input
          className={"add-details-input-container"}
          inputContainerClassName={"add-details-text-field-container"}
          label="Property option order label"
          type="text"
          placeholder="Property option order label"
          value={userData.property_type.options[optionIndex].order_label}
          onChange={(e: any) => {
            setUserData((prevValue: any) => ({
              ...prevValue,
              property_type: {
                ...prevValue.property_type,
                options: prevValue.property_type.options.map(
                  (mapOption: any, mapOptionIndex: number) => {
                    return optionIndex === mapOptionIndex
                      ? { ...mapOption, order_label: e.target.value }
                      : mapOption;
                  }
                ),
              },
            }));
          }}
          error={errors?.property_type?.options?.at(optionIndex)?.order_label}
        />
      </div>
      <div className="col-md-3">
        <Input
          className={"add-details-input-container"}
          inputContainerClassName={"add-details-text-field-container"}
          label="Property option cost"
          type="number"
          placeholder="Property option cost"
          value={userData.property_type.options[optionIndex].cost}
          onChange={(e: any) => {
            setUserData((prevValue: any) => ({
              ...prevValue,
              property_type: {
                ...prevValue.property_type,
                options: prevValue.property_type.options.map(
                  (mapOption: any, mapOptionIndex: number) => {
                    return optionIndex === mapOptionIndex
                      ? { ...mapOption, cost: e.target.value }
                      : mapOption;
                  }
                ),
              },
            }));
          }}
          error={errors?.property_type?.options?.at(optionIndex)?.cost}
        />
      </div>
    </>
  );
  const renderPropertyType = () => (
    <div className="row align-items-center property-type-container">
      <div className="col-md-6">
        <Input
          className={"add-details-input-container"}
          inputContainerClassName={"add-details-text-field-container"}
          label="Property Label"
          type="text"
          placeholder="Property Label"
          value={userData.property_type.label}
          onChange={(e: any) => {
            setUserData((prevValue: any) => ({
              ...prevValue,
              property_type: {
                ...prevValue.property_type,
                label: e.target.value,
              },
            }));
          }}
          error={errors?.property_type?.label}
        />
      </div>
      <div className="col-md-6">
        <Input
          className={"add-details-input-container"}
          inputContainerClassName={"add-details-text-field-container"}
          label="Property description"
          type="text"
          placeholder="Property description"
          value={userData.property_type.description}
          onChange={(e: any) => {
            setUserData((prevValue: any) => ({
              ...prevValue,
              property_type: {
                ...prevValue.property_type,
                description: e.target.value,
              },
            }));
          }}
          error={errors?.property_type?.description}
        />
      </div>
      {userData.property_type.options.map((_: any, optionIndex: number) =>
        renderPropertyTypeOptions(optionIndex)
      )}
    </div>
  );
  return (
    <div className="popup-box-wrapper">
      <div className="popup-box-container add-service-popup-container">
        <div className="flex-col-div">
          <span className="popup-box-title">ADD SERVICE DETAILS</span>
        </div>
        <div className="underline" />

        <div className="add-service-details-container">
          <div className="row">
            <div className="col-md-3">
              <p className="fw-bold">Service Details</p>
            </div>
            <div className="col-md-9">
              <div className="row">
                <div className="col-md-6">
                  <Input
                    className={"add-details-input-container"}
                    inputContainerClassName={"add-details-text-field-container"}
                    label="Service Name"
                    type="text"
                    placeholder="Service Name"
                    value={userData.service_name}
                    onChange={(e: any) => {
                      setUserData((prevValue: any) => ({
                        ...prevValue,
                        service_name: e.target.value,
                      }));
                    }}
                    error={errors?.service_name}
                  />

                  <Input
                    className={"add-details-input-container"}
                    inputContainerClassName={"add-details-text-field-container"}
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
                    className={"add-details-input-container"}
                    inputContainerClassName={"add-details-text-field-container"}
                    label="Service key (Web page binding)"
                    type="text"
                    placeholder="Service Key"
                    value={userData.web_page_service_key}
                    onChange={(e: any) => {
                      setUserData((prevValue: any) => ({
                        ...prevValue,
                        web_page_service_key: e.target.value,
                      }));
                    }}
                    error={errors?.web_page_service_key}
                  />
                </div>
                <div className="col-md-6">
                  <AddDocument
                    name={"Service"}
                    logoPreview={serviceImage?.preview}
                    onChangeLogo={onChangeService}
                    removePreview={removePreview}
                    error={errors?.image}
                  />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "1rem",
                      marginLeft: "1rem",
                    }}
                  >
                    <label>
                      <input
                        type="checkbox"
                        checked={isBrand}
                        onChange={handleCheckboxChange}
                      />
                      <span style={{ marginLeft: "0.5rem" }}>
                        Create as brand?
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="underline" />
          <div className="row mb-5">
            <div className="col-md-3">
              <p className="fw-bold">Timeslots</p>
            </div>
            <div className="col-md-9">
              <div className="row">
                <div className="col-md-4">
                  <div className="inputText-input-wrapper add-details-input-container">
                    <label className="inputText-label" htmlFor={"First Slot"}>
                      First Slot
                    </label>
                    <TimePicker
                      className={"time-picker-input-container"}
                      id="start-time"
                      value={startTime}
                      onChange={handleStartTimeChange}
                      format={"HH:mm"}
                      clockIcon={true}
                      disableClock={true}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="inputText-input-wrapper add-details-input-container">
                    <label className="inputText-label" htmlFor={"Last Slot"}>
                      Last Slot
                    </label>
                    <TimePicker
                      className={"time-picker-input-container"}
                      id="end-time"
                      value={endTime}
                      onChange={handleEndTimeChange}
                      format={"HH:mm"}
                      clockIcon={true}
                      disableClock={true}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <Input
                    className={"add-details-input-container"}
                    inputContainerClassName={"add-details-text-field-container"}
                    label="Timing of Each Slot"
                    type="text"
                    placeholder="Timing of Each Slot"
                    value={userData.timing_of_each_slot}
                    onChange={handleEachTimeChange}
                    error={error}
                  />
                </div>
                <div className="col-md-12">
                  <div className="d-flex flex-row flex-wrap">
                    {timeSlots?.map((slot: any, index: number) => (
                      <div className="p-1 col-3">
                        <div key={index} className="time-slot">
                          {slot}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="underline" />
          <div className="row">
            <div className="col-md-3">
              <p className="fw-bold">Property types</p>
            </div>
            <div className="col-md-9">{renderPropertyType()}</div>
          </div>
        </div>

        <div className="underline" />
        <div className="flex-row-cen-cen-div">
          <Button
            isLoading={isLoading}
            className="add-details-submit-btn"
            name="Submit"
            onClick={handleSubmit}
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
