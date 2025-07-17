import {
  AddDocument,
  Button,
  DatePickerComponent,
  Input,
  SearchableDropDown,
} from "../..";

function EditCrew({
  errors,
  toggleEditPopup,
  CrewEditSubmitHandler,
  editItem,
  setEditItem,
  onChangeProfile,
  onChangeVehicle,
  onChangeCertificate,
  onChangeCompany,
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
          <span className="popup-box-title">EDIT CREW DETAILS</span>
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
                value={editItem.crew_name}
                onChange={(e: any) => {
                  setEditItem((prevValue: any) => ({
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
                value={editItem.phone_number}
                onChange={(e: any) => {
                  setEditItem((prevValue: any) => ({
                    ...prevValue,
                    phone_number: e.target.value,
                  }));
                }}
              />
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
                label="Preferred Work Location"
                type="text"
                placeholder="Preferred Work Location"
                value={editItem.preferred_work_territory}
                onChange={(e: any) => {
                  setEditItem((prevValue: any) => ({
                    ...prevValue,
                    preferred_work_territory: e.target.value,
                  }));
                }}
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
                  initialValue={editItem?.services}
                />
              </div>
            </div>

            <div className="col-md-4">
              <Input
                className={"add-details-input-container"}
                inputContainerClassName={"add-details-text-field-container"}
                label="Address"
                type="text"
                placeholder="Address"
                value={editItem.address}
                onChange={(e: any) => {
                  setEditItem((prevValue: any) => ({
                    ...prevValue,
                    address: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="col-md-4">
              <Input
                className={"add-details-input-container"}
                inputContainerClassName={"add-details-text-field-container"}
                label="Comm Waiver (%)"
                type="number"
                placeholder="Comm Waiver (%)"
                value={editItem.waiver}
                onChange={(e: any) => {
                  setEditItem((prevValue: any) => ({
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
                  logoPreview={
                    editItem?.applicant_personal_portrait?.preview
                      ? editItem?.applicant_personal_portrait?.preview
                      : editItem?.applicant_personal_portrait
                  }
                  onChangeLogo={onChangeProfile}
                  removePreview={() => {
                    editItem?.applicant_personal_portrait
                      ? setEditItem((prevState: any) => ({
                          ...prevState,
                          applicant_personal_portrait: null,
                        }))
                      : setEditItem((prevState: any) => ({
                          ...prevState,
                          applicant_personal_portrait: {
                            preview: null,
                            raw: null,
                          },
                        }));
                  }}
                />
              </div>
              <div className="add-doc-main-div-margin">
                <AddDocument
                  name={"Vehicle"}
                  logoPreview={
                    editItem?.work_vehicle_photo?.preview
                      ? editItem?.work_vehicle_photo?.preview
                      : editItem?.work_vehicle_photo
                  }
                  onChangeLogo={onChangeVehicle}
                  removePreview={() => {
                    editItem?.work_vehicle_photo
                      ? setEditItem((prevState: any) => ({
                          ...prevState,
                          work_vehicle_photo: null,
                        }))
                      : setEditItem((prevState: any) => ({
                          ...prevState,
                          work_vehicle_photo: {
                            preview: null,
                            raw: null,
                          },
                        }));
                  }}
                />
              </div>
            </div>
            <div className="flex-row-a-cen-j-between add-doc-main-div">
              <div className="add-doc-main-div-margin">
                <AddDocument
                  name={"Certificate"}
                  logoPreview={
                    editItem?.certificate_credentials?.preview
                      ? editItem?.certificate_credentials?.preview
                      : editItem?.certificate_credentials
                  }
                  onChangeLogo={onChangeCertificate}
                  removePreview={() => {
                    editItem?.certificate_credentials
                      ? setEditItem((prevState: any) => ({
                          ...prevState,
                          certificate_credentials: null,
                        }))
                      : setEditItem((prevState: any) => ({
                          ...prevState,
                          certificate_credentials: {
                            preview: null,
                            raw: null,
                          },
                        }));
                  }}
                />
              </div>
              <div className="only-margin-left">
                <AddDocument
                  name={"Company Information"}
                  logoPreview={
                    editItem?.company_information?.preview
                      ? editItem?.company_information?.preview
                      : editItem?.company_information
                  }
                  onChangeLogo={onChangeCompany}
                  removePreview={() => {
                    editItem?.company_information
                      ? setEditItem((prevState: any) => ({
                          ...prevState,
                          company_information: null,
                        }))
                      : setEditItem((prevState: any) => ({
                          ...prevState,
                          company_information: {
                            preview: null,
                            raw: null,
                          },
                        }));
                  }}
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
            onClick={CrewEditSubmitHandler}
          />

          <Button
            className="add-details-cancel-btn"
            name="Cancel"
            onClick={toggleEditPopup}
          />
        </div>
      </div>
    </div>
  );
}

export default EditCrew;
