import { Button, DropDown, Input } from '../..';

function EditRoles({
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
          <span className='popup-box-title'>EDIT ROLES AND RIGHTS DETAILS</span>
        </div>
        <div className='underline' />
        <div className='container'>
          <div className='row'>
            <div className='row justify-content-center'>
              <div className='col-md-4'>
                <Input
                  className={'add-details-input-container'}
                  inputContainerClassName={'add-details-text-field-container'}
                  label='Role Name'
                  type='text'
                  placeholder='Role Name'
                  value={editItem.role_name}
                  onChange={(e: any) => {
                    setEditItem((prevValue: any) => ({
                      ...prevValue,
                      role_name: e.target.value,
                    }));
                  }}
                  error={errors?.role_name}
                />
              </div>

              <div className='col-md-4'>
                <DropDown
                  label={'Access Type'}
                  data={['Read', 'Read & write']}
                  value={editItem.access_type}
                  onChange={(e: any) =>
                    setEditItem((prevValue: any) => ({
                      ...prevValue,
                      access_type: e.target.value,
                    }))
                  }
                  error={errors?.access_type}
                />
              </div>
            </div>

            <div className='row justify-content-center'>
              <div className='col-md-4'>
                <Input
                  className={'add-details-input-container'}
                  inputContainerClassName={'add-details-text-field-container'}
                  label='Role Code'
                  type='text'
                  placeholder='Role Code'
                  value={editItem.role_code}
                  onChange={(e: any) => {
                    setEditItem((prevValue: any) => ({
                      ...prevValue,
                      role_code: e.target.value,
                    }));
                  }}
                />
              </div>

              <div className='col-md-4'>
                <DropDown
                  label={'Permission Type'}
                  data={['View', 'Add', 'Update', 'Delete']}
                  value={editItem.permission_type}
                  onChange={(e: any) =>
                    setEditItem((prevValue: any) => ({
                      ...prevValue,
                      permission_type: e.target.value,
                    }))
                  }
                  error={errors?.permission_type}
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

export default EditRoles;
