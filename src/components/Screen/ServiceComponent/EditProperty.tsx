import { Button, Input } from '../..';

function EditProperty({
  editItem,
  setEditItem,
  errors,
  UserFormSubmitHandler,
  toggleUserPopup,
  isLoading,
}: any) {
  return (
    <div className='popup-box-wrapper'>
      <div className='popup-box-container'>
        <div className='flex-col-div'>
          <span className='popup-box-title'>EDIT PROPERTY TYPE</span>
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
              label='Description'
              type='text'
              placeholder='Description'
              value={editItem.description}
              onChange={(e: any) => {
                setEditItem((prevValue: any) => ({
                  ...prevValue,
                  description: e.target.value,
                }));
              }}
              error={errors?.description}
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

export default EditProperty;
