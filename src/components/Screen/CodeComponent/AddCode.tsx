import { useState } from 'react';
import { Button, DatePickerComponent, DropDown, Input } from '../..';

function AddCode({
  userData,
  setUserData,
  errors,
  UserFormSubmitHandler,
  toggleUserPopup,
  isLoading,
  date_start,
  setDate_start,
  date_end,
  setDate_end,
}: any) {
  const [generatedCodes, setGeneratedCodes] = useState(new Set());

  const generateCode = () => {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let newCode = '';
    do {
      newCode = '';
      for (let i = 0; i < 8; i++) {
        newCode += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
    } while (generatedCodes.has(newCode));

    setGeneratedCodes((prevCodes) => new Set(prevCodes).add(newCode));
    setUserData((prevValue: any) => ({
      ...prevValue,
      discount_code: newCode,
    }));
  };

  return (
    <div className='popup-box-wrapper'>
      <div className='popup-box-container'>
        <div className='flex-col-div'>
          <span className='popup-box-title'>ADD CODE DETAILS</span>
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
                value={userData.name}
                onChange={(e: any) => {
                  setUserData((prevValue: any) => ({
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
                value={userData.discount_value}
                onChange={(e: any) => {
                  setUserData((prevValue: any) => ({
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
                value={userData.discount_type}
                onChange={(e: any) =>
                  setUserData((prevValue: any) => ({
                    ...prevValue,
                    discount_type: e.target.value,
                  }))
                }
                error={errors?.discount_type}
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
                value={userData.quantity}
                onChange={(e: any) => {
                  setUserData((prevValue: any) => ({
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

            <div className='col-md-6'>
              <div className='d-flex align-items-center'>
                <div style={{ flex: 1 }}>
                  <Input
                    className={'add-details-input-container'}
                    inputContainerClassName={'add-details-text-field-container'}
                    label='Discount Code'
                    type='text'
                    placeholder='Discount Code'
                    value={userData.discount_code}
                    onChange={(e: any) => {
                      const value = e.target.value;
                      if (value?.length <= 8) {
                        setUserData((prevValue: any) => ({
                          ...prevValue,
                          discount_code: value,
                        }));
                      }
                    }}
                    error={errors?.discount_code}
                  />
                </div>

                <Button
                  className='add-details-submit-btn ml-3'
                  // style={{ marginTop: '1rem' }}
                  name='Generate Code'
                  onClick={generateCode}
                />
              </div>
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

export default AddCode;
