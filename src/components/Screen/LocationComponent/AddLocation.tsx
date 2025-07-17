import { AddDocument, Button, Input } from '../..';

function AddLocation({
  userData,
  setUserData,
  errors,
  UserFormSubmitHandler,
  toggleUserPopup,
  location_image,
  onChangeLocation,
  removePreviewProfile,
  isLoading,
}: any) {
  return (
    <div className='popup-box-wrapper'>
      <div className='popup-box-container'>
        <div className='flex-col-div'>
          <span className='popup-box-title'>ADD TERRITORY DETAILS</span>
        </div>
        <div className='underline' />
        <div className='container'>
          <div className='row'>
            <div className='col-md-4'>
              <Input
                className={'add-details-input-container'}
                inputContainerClassName={'add-details-text-field-container'}
                label='Territory Name'
                type='text'
                placeholder='Territory Name'
                value={userData.location_name}
                onChange={(e: any) => {
                  setUserData((prevValue: any) => ({
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
                value={userData.template}
                onChange={(e: any) => {
                  setUserData((prevValue: any) => ({
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
                value={userData.currency}
                onChange={(e: any) => {
                  setUserData((prevValue: any) => ({
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
                type='number'
                placeholder='Share Count'
                value={userData.share_count}
                onChange={(e: any) => {
                  setUserData((prevValue: any) => ({
                    ...prevValue,
                    share_count: e.target.value,
                  }));
                }}
                error={errors?.share_count}
              />
            </div>

            <div className='col-md-4'>
              <Input
                className={'add-details-input-container'}
                inputContainerClassName={'add-details-text-field-container'}
                label='Phone Number (Web page binding)'
                type='text'
                placeholder='Phone Number'
                value={userData.phone_number}
                onChange={(e: any) => {
                  setUserData((prevValue: any) => ({
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
                value={userData.email}
                onChange={(e: any) => {
                  setUserData((prevValue: any) => ({
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
              logoPreview={location_image.preview}
              onChangeLogo={onChangeLocation}
              removePreview={removePreviewProfile}
              error={errors?.image}
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

export default AddLocation;
