import Button from "../../Button/Button";
import Image from "../../Image/Image";
import "./../../../screens/Services/Service.scss";

function BrandDetails({
  data,
  onEditHandler,
  onDeleteHandler,
  toggleSubUserPopup,
  onUpdateServiceStatus,
}: any) {
  return (
    <div className="flex-col-div card-class">
      <div className="flex-row-div service-container">
        <div className="flex-row-cen-cen-div service-pt-one">
          <div className="flex-row-a-cen-div cl-content-details-left-side">
            <Image
              className="franchise-details-logo"
              src={data?.brand_icon}
              alt={data?.brand_name}
            />
            <span className="cl-content-details-left-name">
              {data.brand_name} (Brand)
            </span>
          </div>
        </div>
        <div className="flex-col-a-cen-div service-pt-three">
          <div>
            <Button
              className="info-edit-btn"
              name={"Edit"}
              onClick={() => onEditHandler(data)}
            />
            {/* <Button
              className={data.is_active ? "info-view-btn" : "inactive-btn"}
              name={data.is_active ? "Active" : "Inactive"}
              onClick={() => onUpdateServiceStatus(data)}
            /> */}
          </div>

          <div>
            <Button
              className="info-delete-btn"
              name={"Delete"}
              onClick={() => onDeleteHandler(data)}
            />
          </div>

          <Button
            className="info-sub-btn"
            name={"Add Model"}
            onClick={() => toggleSubUserPopup(data)}
          />
        </div>
      </div>
    </div>
  );
}

export default BrandDetails;
