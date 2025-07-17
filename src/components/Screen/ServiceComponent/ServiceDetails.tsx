import Button from '../../Button/Button';
import Image from '../../Image/Image';
import './../../../screens/Services/Service.scss';
import EditButton from '../../../assets/svgs/EditButton.svg';
import DeleteButton from '../../../assets/svgs/DeleteButton.svg';

interface TimeSlotCardProp {
  title: string;
  value?: string;
}
interface IconButtonProp {
  icon: any;
  onClick?: () => void;
}

const TimeSlotCard = ({ title, value = '--:--' }: TimeSlotCardProp) => {
  return (
    <div className='details-timeslot-card-container'>
      <span className='details-timeslot-card-title'>{title}</span>
      <span className='details-timeslot-card-value'>{value}</span>
    </div>
  );
};
export const IconButton = ({ icon, onClick }: IconButtonProp) => {
  return (
    <button className='details-icon-btn-container' onClick={onClick}>
      <Image className='details-card-icon' src={icon} />
    </button>
  );
};

function ServiceDetails({
  data,
  onEditHandler,
  onDeleteHandler,
  toggleSubUserPopup,
  onUpdateServiceStatus,
  toggleBrandPopup,
  propertyCount = 0,
  onPropertyTypeAdd,
}: any) {
  return (
    <div className='details-card-container'>
      <div className='d-flex'>
        <div className='details-icon-container'>
          <Image
            className='details-card-icon'
            src={data?.service_icon}
            alt={data?.service_name}
          />
        </div>
        <div className='details-card-info-wrapper'>
          <div className='details-card-info-container'>
            <div className='d-flex align-items-center'>
              <span className='details-cart-title'>{data.service_name}</span>
              <div
                className={`details-card-status ${
                  data.is_active ? 'status-active' : 'status-inactive'
                }`}
                onClick={() => onUpdateServiceStatus(data)}
              >
                <span className='details-card-status-text'>
                  {data.is_active ? 'ACTIVE' : 'INACTIVE'}
                </span>
              </div>
            </div>
            <span className='details-card-service-key-text'>
              {data?.web_page_service_key}
            </span>
            <h6 className='details-card-property-type-text'>
              Property type: {propertyCount}
            </h6>
          </div>
          <div className='d-flex'>
            <TimeSlotCard title={'First Slot'} value={data?.first_slot} />
            <TimeSlotCard
              title={'Each Slot'}
              value={data?.timing_of_each_slot}
            />
            <TimeSlotCard title={'Last Slot'} value={data?.last_slot} />
          </div>
        </div>
      </div>
      <div className='details-card-crud-container'>
        <div className='d-flex justify-content-end mb-1'>
          <IconButton icon={EditButton} onClick={() => onEditHandler(data)} />
          <IconButton
            icon={DeleteButton}
            onClick={() => onDeleteHandler(data)}
          />
        </div>
        <Button
          className='details-card-add-btn mb-1'
          name={data?.has_brand === true ? '+ Add Brand' : '+ Add Variant'}
          onClick={() =>
            data?.has_brand === true
              ? toggleBrandPopup(data)
              : toggleSubUserPopup(data)
          }
        />
        {propertyCount === 0 ? (
          <Button
            className='details-card-add-btn'
            name={'+ Add Property type'}
            onClick={onPropertyTypeAdd}
          />
        ) : null}
      </div>
    </div>
    // <div className='container row service-card'>
    //   <div className='service-card p-3'>
    //     <div className='sc-img-container'>
    //       <Image
    //         className='franchise-details-logo'
    //         src={data?.service_icon}
    //         alt={data?.service_name}
    //       />
    //     </div>
    //     <div className=''>
    //       <div className='row'>
    //         <p>{data.service_name}</p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
  return (
    <div className='flex-col-div card-class'>
      <div className='flex-row-div service-container'>
        <div className='flex-row-cen-cen-div service-pt-one'>
          <div className='flex-row-a-cen-div cl-content-details-left-side'>
            <Image
              className='franchise-details-logo'
              src={data?.service_icon}
              alt={data?.service_name}
            />
            <span className='cl-content-details-left-name'>
              {data.service_name}{' '}
            </span>
          </div>
        </div>
        <div className='cl-content-details-hr' />
        <div className='flex-row-cen-cen-div service-pt-two'>
          <div className='flex-col-cen-cen-div'>
            <div className='flex-row-a-cen-div cl-content-details-left-side'>
              <span className='cl-content-details-left-side-title'>
                Timing of Each slot
              </span>
              <span className='cl-content-details-left-side-dot'>:</span>
              <span className='cl-content-details-left-side-desc'>
                {data?.timing_of_each_slot}
              </span>
            </div>
            <div className='flex-row-a-cen-div cl-content-details-left-side'>
              <span className='cl-content-details-left-side-title'>
                First slot
              </span>
              <span className='cl-content-details-left-side-dot'>:</span>
              <span className='cl-content-details-left-side-desc'>
                {data?.first_slot}
              </span>
            </div>
            <div className='flex-row-a-cen-div cl-content-details-left-side'>
              <span className='cl-content-details-left-side-title'>
                Last slot
              </span>
              <span className='cl-content-details-left-side-dot'>:</span>
              <span className='cl-content-details-left-side-desc'>
                {data?.last_slot}
              </span>
            </div>
            <div className='flex-row-a-cen-div cl-content-details-left-side'>
              <span className='cl-content-details-left-side-title'>
                Service Key <br /> (Web page binding)
              </span>
              <span className='cl-content-details-left-side-dot'>:</span>
              <span className='cl-content-details-left-side-desc'>
                {data?.web_page_service_key}
              </span>
            </div>
          </div>
        </div>
        <div className='flex-col-a-cen-div service-pt-three'>
          <div>
            <Button
              className='info-edit-btn'
              name={'Edit'}
              onClick={() => onEditHandler(data)}
            />
            <Button
              className={data.is_active ? 'info-view-btn' : 'inactive-btn'}
              name={data.is_active ? 'Active' : 'Inactive'}
              onClick={() => onUpdateServiceStatus(data)}
            />
          </div>

          <div>
            <Button
              className='info-delete-btn'
              name={'Delete'}
              onClick={() => onDeleteHandler(data)}
            />
          </div>

          <Button
            className='info-sub-btn'
            name={data?.has_brand === true ? 'Add Brand' : 'Add Variant'}
            onClick={() =>
              data?.has_brand === true
                ? toggleBrandPopup(data)
                : toggleSubUserPopup(data)
            }
          />
        </div>
      </div>
    </div>
  );
}

export default ServiceDetails;
