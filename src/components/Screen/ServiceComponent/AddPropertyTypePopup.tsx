import { Button, Input } from '../..';

const propertyTypeOption = {
  label: '',
  order_label: '',
  cost: '',
};

function AddPropertyTypePopup({
  propertyType,
  setPropertyType,
  errors,
  ServiceFormSubmitHandler,
  toggleServicePopup,
  isLoading,
}: any) {
  const renderPropertyTypeOptions = (optionIndex: number) => (
    <>
      <div className='col-md-6'>
        <div className='d-flex align-items-center'>
          {propertyType.options.length - 1 === optionIndex ? (
            <Button
              isLoading={isLoading}
              className='add-details-submit-btn mr-2'
              name='+'
              onClick={() => {
                setPropertyType((prevValue: any) => ({
                  ...prevValue,
                  options: [...prevValue.options, propertyTypeOption],
                }));
              }}
            />
          ) : null}
          {propertyType?.options?.length > 1 ? (
            <Button
              isLoading={isLoading}
              className='add-details-cancel-btn ml-0'
              name='-'
              onClick={() => {
                setPropertyType((prevValue: any) => ({
                  ...prevValue,
                  options: prevValue.options.filter(
                    (_: any, filterOptionIndex: number) =>
                      filterOptionIndex !== optionIndex
                  ),
                }));
              }}
            />
          ) : null}
          <Input
            className={'add-details-input-container w-100 ml-2'}
            inputContainerClassName={'add-details-text-field-container'}
            label='Property option label'
            type='text'
            placeholder='Property option label'
            value={propertyType.options[optionIndex].label}
            onChange={(e: any) => {
              setPropertyType((prevValue: any) => ({
                ...prevValue,
                options: prevValue.options.map(
                  (mapOption: any, mapOptionIndex: number) => {
                    return optionIndex === mapOptionIndex
                      ? { ...mapOption, label: e.target.value }
                      : mapOption;
                  }
                ),
              }));
            }}
            error={errors?.options?.at(optionIndex)?.label}
          />
        </div>
      </div>
      <div className='col-md-3'>
        <Input
          className={'add-details-input-container'}
          inputContainerClassName={'add-details-text-field-container'}
          label='Property option order label'
          type='text'
          placeholder='Property option order label'
          value={propertyType.options[optionIndex].order_label}
          onChange={(e: any) => {
            setPropertyType((prevValue: any) => ({
              ...prevValue,
              options: prevValue.options.map(
                (mapOption: any, mapOptionIndex: number) => {
                  return optionIndex === mapOptionIndex
                    ? { ...mapOption, order_label: e.target.value }
                    : mapOption;
                }
              ),
            }));
          }}
          error={errors?.options?.at(optionIndex)?.order_label}
        />
      </div>
      <div className='col-md-3'>
        <Input
          className={'add-details-input-container'}
          inputContainerClassName={'add-details-text-field-container'}
          label='Property option cost'
          type='number'
          placeholder='Property option cost'
          value={propertyType.options[optionIndex].cost}
          onChange={(e: any) => {
            setPropertyType((prevValue: any) => ({
              ...prevValue,
              options: prevValue.options.map(
                (mapOption: any, mapOptionIndex: number) => {
                  return optionIndex === mapOptionIndex
                    ? { ...mapOption, cost: e.target.value }
                    : mapOption;
                }
              ),
            }));
          }}
          error={errors?.options?.at(optionIndex)?.cost}
        />
      </div>
    </>
  );
  const renderPropertyType = () => (
    <div className='row align-items-center property-type-container'>
      <div className='col-md-6'>
        <Input
          className={'add-details-input-container'}
          inputContainerClassName={'add-details-text-field-container'}
          label='Property Label'
          type='text'
          placeholder='Property Label'
          value={propertyType.label}
          onChange={(e: any) => {
            setPropertyType((prevValue: any) => ({
              ...prevValue,
              label: e.target.value,
            }));
          }}
          error={errors?.label}
        />
      </div>
      <div className='col-md-6'>
        <Input
          className={'add-details-input-container'}
          inputContainerClassName={'add-details-text-field-container'}
          label='Property description'
          type='text'
          placeholder='Property description'
          value={propertyType.description}
          onChange={(e: any) => {
            setPropertyType((prevValue: any) => ({
              ...prevValue,
              description: e.target.value,
            }));
          }}
          error={errors?.description}
        />
      </div>
      {propertyType.options.map((_: any, optionIndex: number) =>
        renderPropertyTypeOptions(optionIndex)
      )}
    </div>
  );
  return (
    <div className='popup-box-wrapper'>
      <div className='popup-box-container'>
        <div className='flex-col-div'>
          <span className='popup-box-title'>ADD PROPERTY TYPE</span>
        </div>
        <div className='underline' />
        <div className='row'>
          <div className='col-md-3'>
            <p className='fw-bold'>Property types</p>
          </div>
          <div className='col-md-9'>{renderPropertyType()}</div>
        </div>
        {/* <div className='add-details-container'>
          <div className='add-details-input-rows'>
            <Input
              label='Label'
              type='text'
              placeholder='Label'
              value={propertyType.label}
              onChange={(e: any) => {
                setPropertyType((prevValue: any) => ({
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
              value={propertyType.order_label}
              onChange={(e: any) => {
                setPropertyType((prevValue: any) => ({
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
              value={propertyType.cost}
              onChange={(e: any) => {
                setPropertyType((prevValue: any) => ({
                  ...prevValue,
                  cost: e.target.value,
                }));
              }}
              error={errors?.cost}
            />
          </div>
        </div> */}

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

export default AddPropertyTypePopup;
