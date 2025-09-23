import Button from "../../Button/Button";

const ButtonGroup = ({ handleButtonClick, order_status }: any) => {
  return (
    <div>
      <Button
        className={
          order_status == "Complete"
            ? "info-view-btn"
            : "order-bg-info-edit-btn"
        }
        name="Complete"
        onClick={() => handleButtonClick("Complete")}
      />

      <Button
        className={
          order_status == "UnComplete"
            ? "info-view-btn"
            : "order-bg-info-edit-btn"
        }
        onClick={() => handleButtonClick("UnComplete")}
        name="UnComplete"
      />

      <Button
        className={
          order_status == "Canceled"
            ? "info-view-btn"
            : "order-bg-info-edit-btn"
        }
        name="Cancel"
        onClick={() => handleButtonClick("Canceled")}
      />

      <Button
        className={
          order_status == "UnCancel"
            ? "info-view-btn"
            : "order-bg-info-edit-btn"
        }
        name="UnCancel"
        onClick={() => handleButtonClick("UnCancel")}
      />

      {order_status !== "Complete" ? (
        <Button
          className="info-delete-btn"
          name="Delete"
          onClick={() => handleButtonClick("Delete")}
        />
      ) : null}
    </div>
  );
};

export default ButtonGroup;
