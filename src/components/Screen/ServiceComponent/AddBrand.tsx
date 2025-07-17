import { AddDocument, Button, Input } from '../../';

function AddBrand({
  userData,
  setUserData,
  errors,
  ServiceFormSubmitHandler,
  toggleServicePopup,
  serviceImage,
  onChangeService,
  removePreview,
  isLoading,
}: any) {
  return (
    <div className='popup-box-wrapper'>
      <div className='popup-box-container'>
        <div className='flex-col-div'>
          <span className='popup-box-title'>ADD BRAND DETAILS</span>
        </div>
        <div className='underline' />
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-md-4'>
              <Input
                className={'add-details-input-container'}
                inputContainerClassName={'add-details-text-field-container'}
                label='Brand Name'
                type='text'
                placeholder='Brand Name'
                value={userData}
                onChange={(e: any) => {
                  setUserData(e.target.value);
                }}
                error={errors?.brand_name}
              />
              <AddDocument
                name={'Brand'}
                logoPreview={serviceImage?.preview}
                onChangeLogo={onChangeService}
                removePreview={removePreview}
                error={errors?.image}
              />
            </div>
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

export default AddBrand;
