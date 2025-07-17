import { Button, DatePickerComponent, Input } from '../..';

function AddUser({
  errors,
  dateOfBirth,
  setDateOfBirth,
  joiningDate,
  setJoiningDate,
  editItem,
  setEditItem,
  UserEditFormSubmitHandler,
  toggleEditUserPopup,
  isLoading,
}: any) {
  return (
    <div className='popup-box-wrapper'>
      <div className='popup-box-container'>
        <div className='flex-col-div'>
          <span className='popup-box-title'>EDIT USER DETAILS</span>
        </div>
        <div className='underline' />
        <div className='container'>
          <div className='row'>
            <div className='col-md-4'>
              <Input
                className={'add-details-input-container'}
                inputContainerClassName={'add-details-text-field-container'}
                label='First Name'
                type='text'
                placeholder='First Name'
                value={editItem.first_name}
                onChange={(e: any) => {
                  setEditItem((prevValue: any) => ({
                    ...prevValue,
                    first_name: e.target.value,
                  }));
                }}
                error={errors?.first_name}
              />
            </div>

            <div className='col-md-4'>
              <Input
                className={'add-details-input-container'}
                inputContainerClassName={'add-details-text-field-container'}
                label='Last Name'
                type='text'
                placeholder='Last Name'
                value={editItem.last_name}
                onChange={(e: any) => {
                  setEditItem((prevValue: any) => ({
                    ...prevValue,
                    last_name: e.target.value,
                  }));
                }}
                error={errors?.last_name}
              />
            </div>

            <div className='col-md-4'>
              <Input
                className={'add-details-input-container'}
                inputContainerClassName={'add-details-text-field-container'}
                label='Email'
                type='text'
                placeholder='Email'
                value={editItem.email}
                onChange={(e: any) => {
                  setEditItem((prevValue: any) => ({
                    ...prevValue,
                    email: e.target.value,
                  }));
                }}
              />
            </div>

            <div className='col-md-4'>
              <DatePickerComponent
                label={'Date of Birth'}
                selected={dateOfBirth}
                onChange={(value: any) => setDateOfBirth(value)}
              />
            </div>

            <div className='col-md-4'>
              <Input
                className={'add-details-input-container'}
                inputContainerClassName={'add-details-text-field-container'}
                label='Service Type'
                type='text'
                placeholder='Service Type'
                value={editItem.service_type}
                onChange={(e: any) => {
                  setEditItem((prevValue: any) => ({
                    ...prevValue,
                    service_type: e.target.value,
                  }));
                }}
              />
            </div>

            <div className='col-md-4'>
              <DatePickerComponent
                label={'Joining Date'}
                selected={joiningDate}
                onChange={(value: any) => setJoiningDate(value)}
              />
            </div>

            <div className='col-md-4'>
              <Input
                className={'add-details-input-container'}
                inputContainerClassName={'add-details-text-field-container'}
                label='Employee Type'
                type='text'
                placeholder='Employee Type'
                value={editItem.employee_type}
                onChange={(e: any) => {
                  setEditItem((prevValue: any) => ({
                    ...prevValue,
                    employee_type: e.target.value,
                  }));
                }}
              />
            </div>

            <div className='col-md-4'>
              <Input
                className={'add-details-input-container'}
                inputContainerClassName={'add-details-text-field-container'}
                label='Role'
                type='text'
                placeholder='Role'
                value={editItem.role}
                onChange={(e: any) => {
                  setEditItem((prevValue: any) => ({
                    ...prevValue,
                    role: e.target.value,
                  }));
                }}
              />
            </div>

            <div className='col-md-4'>
              <Input
                className={'add-details-input-container'}
                inputContainerClassName={'add-details-text-field-container'}
                label='Id Number'
                type='text'
                placeholder='Id Number'
                value={editItem.id_card}
                onChange={(e: any) => {
                  setEditItem((prevValue: any) => ({
                    ...prevValue,
                    id_card: e.target.value,
                  }));
                }}
              />
            </div>

            <div className='col-md-4'>
              <Input
                className={'add-details-input-container'}
                inputContainerClassName={'add-details-text-field-container'}
                label='Phone Number'
                type='text'
                placeholder='Phone Number'
                maxLength={10}
                value={editItem.phone_number}
                onChange={(e: any) => {
                  setEditItem((prevValue: any) => ({
                    ...prevValue,
                    phone_number: e.target.value,
                  }));
                }}
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
            onClick={UserEditFormSubmitHandler}
          />

          <Button
            className='add-details-cancel-btn'
            name='Cancel'
            onClick={toggleEditUserPopup}
          />
        </div>
      </div>
    </div>
  );
}

export default AddUser;
