import { Button, DatePickerComponent, DropDown, Input } from '../..';

function EditCode({
  editItem,
  setEditItem,
  errors,
  UserFormSubmitHandler,
  toggleUserPopup,
  isLoading,
  date_start,
  setDate_start,
  date_end,
  setDate_end,
}: any) {
  return (
    <div className='popup-box-wrapper'>
      <div className='popup-box-container'>
        <div className='flex-col-div'>
          <span className='popup-box-title'>EDIT CODE DETAILS</span>
        </div>
        <div className='underline' />
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-md-4'>
              <Input
                className={'add-details-input-container'}
                inputContainerClassName={'add-details-text-field-container'}
                label='Name'
                type='text'
                placeholder='Name'
                value={editItem.name}
                onChange={(e: any) => {
                  setEditItem((prevValue: any) => ({
                    ...prevValue,
                    name: e.target.value,
                  }));
                }}
                error={errors?.name}
              />
            </div>

            <div className='col-md-4'>
              <Input
                className={'add-details-input-container'}
                inputContainerClassName={'add-details-text-field-container'}
                label='Discount Value'
                type='text'
                placeholder='Discount Value'
                value={editItem.discount_value}
                onChange={(e: any) => {
                  setEditItem((prevValue: any) => ({
                    ...prevValue,
                    discount_value: e.target.value,
                  }));
                }}
                error={errors?.discount_value}
              />
            </div>

            <div className='col-md-4'>
              <DropDown
                label={'Discount Type'}
                data={['percent', 'absolute']}
                value={editItem.discount_type}
                onChange={(e: any) =>
                  setEditItem((prevValue: any) => ({
                    ...prevValue,
                    discount_type: e.target.value,
                  }))
                }
                error={errors?.discount_type}
              />
            </div>

            <div className='col-md-4'>
              <Input
                className={'add-details-input-container'}
                inputContainerClassName={'add-details-text-field-container'}
                label='Discount Code'
                type='text'
                placeholder='Discount Code'
                max={8}
                min={8}
                value={editItem.discount_code}
                onChange={(e: any) => {
                  setEditItem((prevValue: any) => ({
                    ...prevValue,
                    discount_code: e.target.value,
                  }));
                }}
                error={errors?.discount_code}
              />
            </div>

            <div className='col-md-4'>
              <DatePickerComponent
                label={'Start Date'}
                selected={date_start}
                onChange={(value: any) => setDate_start(value)}
              />
            </div>

            <div className='col-md-4'>
              <Input
                className={'add-details-input-container'}
                inputContainerClassName={'add-details-text-field-container'}
                label='Quantity'
                type='text'
                placeholder='Quantity'
                value={editItem.quantity}
                onChange={(e: any) => {
                  setEditItem((prevValue: any) => ({
                    ...prevValue,
                    quantity: e.target.value,
                  }));
                }}
                error={errors?.quantity}
              />
            </div>

            <div className='col-md-4'>
              <DatePickerComponent
                label={'End Date'}
                selected={date_end}
                onChange={(value: any) => setDate_end(value)}
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

export default EditCode;
