import { Button, Input } from '../..';

function AddLocationS({
  userData,
  setUserData,
  errors,
  ServiceFormSubmitHandler,
  toggleServicePopup,
  isLoading,
}: any) {
  return (
    <div className='popup-box-wrapper'>
      <div className='popup-box-container'>
        <div className='flex-col-div'>
          <span className='popup-box-title'>ADD PROPERTY OPTIONS</span>
        </div>
        <div className='underline' />
        <div className='add-details-container'>
          <div className='add-details-input-rows'>
            <Input
              label='Label'
              type='text'
              placeholder='Label'
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
              label='Order Label'
              type='text'
              placeholder='Order Label'
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
              label='Price'
              type='number'
              placeholder='Price'
              value={userData.cost}
              onChange={(e: any) => {
                setUserData((prevValue: any) => ({
                  ...prevValue,
                  cost: e.target.value,
                }));
              }}
              error={errors?.cost}
            />
          </div>
        </div>

        <div className='underline' />
        <div className='flex-row-cen-cen-div'>
          <Button
            isLoading={isLoading}
            className='add-details-submit-btn'
            name='Submit'
            onClick={ServiceFormSubmitHandler}
          />
          <Button
            className='add-details-cancel-btn'
            name='Cancel'
            onClick={toggleServicePopup}
          />
        </div>
      </div>
    </div>
  );
}

export default AddLocationS;
