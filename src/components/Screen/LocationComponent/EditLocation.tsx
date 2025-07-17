import { AddDocument, Button, Input } from '../..';

function EditLocation({
  editItem,
  setEditItem,
  errors,
  UserFormSubmitHandler,
  toggleUserPopup,
  isLoading,
  onChangeUpdateLocation,
}: any) {
  return (
    <div className='popup-box-wrapper'>
      <div className='popup-box-container'>
        <div className='flex-col-div'>
          <span className='popup-box-title'>EDIT TERRITORIES DETAILS</span>
        </div>
        <div className='underline' />
        <div className='container'>
          <div className='row'>
            <div className='col-md-4'>
              <Input
                className={'add-details-input-container'}
                inputContainerClassName={'add-details-text-field-container'}
                label='Location'
                type='text'
                placeholder='Location'
                value={editItem.location_name}
                onChange={(e: any) => {
                  setEditItem((prevValue: any) => ({
                    ...prevValue,
                    location_name: e.target.value,
                  }));
                }}
                error={errors?.location_name}
              />
            </div>

            <div className='col-md-4'>
              <Input
                className={'add-details-input-container'}
                inputContainerClassName={'add-details-text-field-container'}
                label='Template Name'
                type='text'
                placeholder='Template Name'
                value={editItem.template}
                onChange={(e: any) => {
                  setEditItem((prevValue: any) => ({
                    ...prevValue,
                    template: e.target.value,
                  }));
                }}
                error={errors?.template}
              />
            </div>

            <div className='col-md-4'>
              <Input
                className={'add-details-input-container'}
                inputContainerClassName={'add-details-text-field-container'}
                label='Currency'
                type='text'
                placeholder='Currency'
                value={editItem.currency}
                onChange={(e: any) => {
                  setEditItem((prevValue: any) => ({
                    ...prevValue,
                    currency: e.target.value,
                  }));
                }}
                error={errors?.currency}
              />
            </div>

            <div className='col-md-4'>
              <Input
                className={'add-details-input-container'}
                inputContainerClassName={'add-details-text-field-container'}
                style={{ width: '180px' }}
                label='Share Count'
                type='text'
                placeholder='Share Count'
                value={editItem.share_count}
                onChange={(e: any) => {
                  setEditItem((prevValue: any) => ({
                    ...prevValue,
                    share_count: e.target.value,
                  }));
                }}
              />
            </div>

            <div className='col-md-4'>
              <Input
                className={'add-details-input-container'}
                inputContainerClassName={'add-details-text-field-container'}
                label='Phone Number (Web page binding)'
                type='text'
                placeholder='Phone Number'
                value={editItem.phone_number}
                onChange={(e: any) => {
                  setEditItem((prevValue: any) => ({
                    ...prevValue,
                    phone_number: e.target.value,
                  }));
                }}
                error={errors?.phone_number}
              />
            </div>

            <div className='col-md-4'>
              <Input
                className={'add-details-input-container'}
                inputContainerClassName={'add-details-text-field-container'}
                label='Email (Web page binding)'
                type='text'
                placeholder='Email'
                value={editItem.email}
                onChange={(e: any) => {
                  setEditItem((prevValue: any) => ({
                    ...prevValue,
                    email: e.target.value,
                  }));
                }}
                error={errors?.email}
              />
            </div>
          </div>
          <div className='add-details-input-rows'>
            <AddDocument
              name={''}
              logoPreview={editItem.location_image}
              onChangeLogo={onChangeUpdateLocation}
              removePreview={() =>
                setEditItem((prevState: any) => ({
                  ...prevState,
                  location_image: null,
                }))
              }
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

export default EditLocation;
