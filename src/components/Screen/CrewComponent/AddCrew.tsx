import {
  AddDocument,
  Button,
  DatePickerComponent,
  Input,
  SearchableDropDown,
} from "../..";

function AddCrew({
  crewData,
  setCrewData,
  errors,
  toggleCrewPopup,
  CrewFormSubmitHandler,
  onChangeProfile,
  removePreviewProfile,
  onChangeVehicle,
  removePreviewVehicle,
  onChangeCertificate,
  removePreviewCertificate,
  onChangeCompany,
  removePreviewCompany,
  profileImage,
  vehicleImage,
  certificateImage,
  companyImage,
  workingDate,
  setWorkingDate,
  isLoading,
  handleServiceDropdownChange,
  serviceOptions,
}: any) {
  return (
    <div className="popup-box-wrapper">
      <div className="popup-box-container">
        <div className="flex-col-div">
          <span className="popup-box-title">ADD CREW DETAILS</span>
        </div>
        <div className="underline" />
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <Input
                className={"add-details-input-container"}
                inputContainerClassName={"add-details-text-field-container"}
                label="Name"
                type="text"
                placeholder="Name"
                value={crewData.crew_name}
                onChange={(e: any) => {
                  setCrewData((prevValue: any) => ({
                    ...prevValue,
                    crew_name: e.target.value,
                  }));
                }}
                error={errors?.crew_name}
              />
            </div>

            <div className="col-md-4">
              <Input
                className={"add-details-input-container"}
                inputContainerClassName={"add-details-text-field-container"}
                label="Phone Number"
                type="text"
                placeholder="Phone Number"
                maxLength={10}
                value={crewData.phone_number}
                onChange={(e: any) => {
                  setCrewData((prevValue: any) => ({
                    ...prevValue,
                    phone_number: e.target.value,
                  }));
                }}
                error={errors?.phone_number}
              />
            </div>

            <div className="col-md-4">
              <Input
                className={"add-details-input-container"}
                inputContainerClassName={"add-details-text-field-container"}
                label="Address"
                type="text"
                placeholder="Address"
                value={crewData.address}
                onChange={(e: any) => {
                  setCrewData((prevValue: any) => ({
                    ...prevValue,
                    address: e.target.value,
                  }));
                }}
                error={errors?.address}
              />
            </div>

            <div className="col-md-4">
              <Input
                className={"add-details-input-container"}
                inputContainerClassName={"add-details-text-field-container"}
                label="Preferred Work Location"
                type="text"
                placeholder="Preferred Work Location"
                value={crewData.preferred_work_territory}
                onChange={(e: any) => {
                  setCrewData((prevValue: any) => ({
                    ...prevValue,
                    preferred_work_territory: e.target.value,
                  }));
                }}
                error={errors?.preferred_work_territory}
              />
            </div>

            <div className="col-md-4">
              <div className="inputText-input-wrapper">
                <label className="drop-label">Specialize Service</label>
                <SearchableDropDown
                  isMulti="true"
                  options={serviceOptions}
                  onSelect={handleServiceDropdownChange}
                  placeholderText={"Specialize Service..."}
                />
              </div>
            </div>

            <div className="col-md-4">
              <DatePickerComponent
                label={"Start Working Date"}
                selected={workingDate}
                onChange={(value: any) => setWorkingDate(value)}
              />
            </div>

            <div className="col-md-4">
              <Input
                className={"add-details-input-container"}
                inputContainerClassName={"add-details-text-field-container"}
                label="Comm Waiver (%)"
                type="number"
                placeholder="Comm Waiver (%)"
                value={crewData.waiver}
                onChange={(e: any) => {
                  setCrewData((prevValue: any) => ({
                    ...prevValue,
                    waiver: e.target.value,
                  }));
                }}
              />
            </div>
          </div>
          <div className="flex-col-a-cen-div add-doc-row">
            <div className="flex-row-a-cen-j-between add-doc-main-div">
              <div className="add-doc-main-div-margin">
                <AddDocument
                  name={"Profile"}
                  logoPreview={profileImage.preview}
                  onChangeLogo={onChangeProfile}
                  removePreview={removePreviewProfile}
                  error={errors?.profileImage}
                />
              </div>
              <div className="add-doc-main-div-margin">
                <AddDocument
                  name={"Vehicle"}
                  logoPreview={vehicleImage.preview}
                  onChangeLogo={onChangeVehicle}
                  removePreview={removePreviewVehicle}
                  error={errors?.vehicleImage}
                />
              </div>
            </div>
            <div className="flex-row-a-cen-j-between add-doc-main-div">
              <div className="add-doc-main-div-margin">
                <AddDocument
                  name={"Certificate"}
                  logoPreview={certificateImage.preview}
                  onChangeLogo={onChangeCertificate}
                  removePreview={removePreviewCertificate}
                  error={errors?.certificateImage}
                />
              </div>
              <div className="add-doc-main-div-margin">
                <AddDocument
                  name={"Company Information"}
                  logoPreview={companyImage.preview}
                  onChangeLogo={onChangeCompany}
                  removePreview={removePreviewCompany}
                  error={errors?.companyImage}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="underline" />
        <div className="flex-row-cen-cen-div">
          <Button
            isLoading={isLoading}
            className="add-details-submit-btn"
            name="Submit"
            onClick={CrewFormSubmitHandler}
          />
          <Button
            isLoading={false}
            className="add-details-cancel-btn"
            name="Cancel"
            onClick={toggleCrewPopup}
          />
        </div>
      </div>
    </div>
  );
}

export default AddCrew;
