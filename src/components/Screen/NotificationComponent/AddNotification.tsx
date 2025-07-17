import { Button, Input } from "../..";

function AddNotification({
  notificationData,
  setNotificationData,
  errors,
  toggleNotificationPopup,
  isLoading,
  NotificationSubmitHandler,
}: any) {
  return (
    <div className="popup-box-wrapper">
      <div className="popup-box-container">
        <div className="flex-col-div">
          <span className="popup-box-title">Notification</span>
        </div>
        <div className="underline" />
        <div className="add-details-container">
          <div className="add-details-input-rows">
            <Input
              style={{ width: "30rem" }}
              label="Title"
              type="text"
              placeholder="Title"
              value={notificationData.title}
              onChange={(e: any) => {
                setNotificationData((prevValue: any) => ({
                  ...prevValue,
                  title: e.target.value,
                }));
              }}
              error={errors?.title}
            />
          </div>
          <div className="add-details-input-rows">
            <Input
              style={{ width: "30rem" }}
              label="Context"
              type="text"
              placeholder="Context"
              value={notificationData.context}
              onChange={(e: any) => {
                setNotificationData((prevValue: any) => ({
                  ...prevValue,
                  context: e.target.value,
                }));
              }}
              error={errors?.context}
            />
          </div>
        </div>
        <div className="underline" />
        <div className="flex-row-cen-cen-div">
          <Button
            isLoading={isLoading}
            className="add-details-submit-btn"
            name="Send"
            onClick={NotificationSubmitHandler}
          />
          <Button
            isLoading={false}
            className="add-details-cancel-btn"
            name="Cancel"
            onClick={toggleNotificationPopup}
          />
        </div>
      </div>
    </div>
  );
}

export default AddNotification;
