import TimePicker from "react-time-picker";
import { AddDocument, Button, Input } from "../..";

function EditService({
  editItem,
  setEditItem,
  errors,
  UserFormSubmitHandler,
  toggleUserPopup,
  isLoading,
  timeSlots,
  onChangeService,
}: any) {
  return (
    <div className="popup-box-wrapper">
      <div className="popup-box-container">
        <div className="flex-col-div">
          <span className="popup-box-title">EDIT SERVICE DETAILS</span>
        </div>
        <div className="underline" />
        <div className="add-details-container">
          <div className="add-details-input-rows">
            <Input
              label="Service Name"
              type="text"
              placeholder="Service Name"
              value={editItem.service_name}
              onChange={(e: any) => {
                setEditItem((prevValue: any) => ({
                  ...prevValue,
                  service_name: e.target.value,
                }));
              }}
              error={errors?.service_name}
            />
            <Input
              label="Timing of Each Slot"
              type="text"
              placeholder="Timing of Each Slot"
              value={editItem.timing_of_each_slot}
              onChange={(e: any) => {
                setEditItem((prevValue: any) => ({
                  ...prevValue,
                  timing_of_each_slot: e.target.value,
                }));
              }}
              error={errors?.timing_of_each_slot}
            />
            <div className="inputText-input-wrapper">
              <label className="inputText-label" htmlFor={"First Slot"}>
                First Slot
              </label>
              <TimePicker
                className={"time-picker-input-container"}
                id="start-time"
                value={editItem.first_slot}
                onChange={(val) =>
                  setEditItem({ ...editItem, first_slot: val })
                }
                format={"HH:mm"}
                clockIcon={true}
                disableClock={true}
              />
            </div>
            <div className="inputText-input-wrapper">
              <label className="inputText-label" htmlFor={"Last Slot"}>
                Last Slot
              </label>
              <TimePicker
                className={"time-picker-input-container"}
                id="end-time"
                value={editItem.last_slot}
                onChange={(val) => setEditItem({ ...editItem, last_slot: val })}
                format={"HH:mm"}
                clockIcon={true}
                disableClock={true}
              />
            </div>
          </div>
          <div className="add-details-input-rows">
            <div className="time-slots">
              {timeSlots?.map((slot: any, index: number) => (
                <div key={index} className="time-slot">
                  {slot}
                </div>
              ))}
            </div>
          </div>
          <div className="add-details-input-rows">
            <Input
              label="Share Count"
              type="number"
              placeholder="Share Count"
              value={editItem.share_count}
              onChange={(e: any) => {
                setEditItem((prevValue: any) => ({
                  ...prevValue,
                  share_count: e.target.value,
                }));
              }}
              error={errors?.share_count}
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
              label="Service key (Web page binding)"
              type="text"
              placeholder="Service Key"
              value={editItem.web_page_service_key}
              onChange={(e: any) => {
                setEditItem((prevValue: any) => ({
                  ...prevValue,
                  web_page_service_key: e.target.value,
                }));
              }}
              error={errors?.web_page_service_key}
            />
          </div>
          <div className="add-details-input-rows" style={{ marginTop: "1rem" }}>
            <AddDocument
              name={"Service"}
              logoPreview={
                editItem?.service_icon?.preview
                  ? editItem?.service_icon?.preview
                  : editItem?.service_icon
              }
              onChangeLogo={onChangeService}
              removePreview={() => {
                editItem?.service_icon
                  ? setEditItem((prevState: any) => ({
                      ...prevState,
                      service_icon: null,
                    }))
                  : setEditItem((prevState: any) => ({
                      ...prevState,
                      service_icon: {
                        preview: null,
                        raw: null,
                      },
                    }));
              }}
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

export default EditService;
