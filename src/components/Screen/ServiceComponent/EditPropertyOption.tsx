import { Button, DropDown, Image, Input, SearchableDropDown } from '../..';
import { Close } from '../../../assets';

function EditPropertyOption({
  editItem,
  setEditItem,
  errors,
  UserFormSubmitHandler,
  toggleUserPopup,
  isLoading,
  handlePlusButtonClick,
  RemoveButtonClick,
  handleBaseInputChange,
  getAvailableCountryOptions,
  countryOptions,
}: any) {
  return (
    <div className='popup-box-wrapper'>
      <div className='popup-box-container'>
        <div className='flex-col-div'>
          <span className='popup-box-title'>EDIT PROPERTY OPTIONS</span>
        </div>
        <div className='underline' />
        <div className='add-details-container'>
          <div className='add-details-input-rows'>
            <Input
              label='Label'
              type='text'
              placeholder='Label'
              value={editItem.label}
              onChange={(e: any) => {
                setEditItem((prevValue: any) => ({
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
              value={editItem.order_label}
              onChange={(e: any) => {
                setEditItem((prevValue: any) => ({
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
              value={editItem.cost}
              onChange={(e: any) => {
                setEditItem((prevValue: any) => ({
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
            onClick={UserFormSubmitHandler}
          />
          <Button
            className='add-details-cancel-btn'
            name='Cancel'
            onClick={toggleUserPopup}
          />
        </div>
      </div>
    </div>
  );
}

export default EditPropertyOption;
