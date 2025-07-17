import { EditableDropDown } from "../..";

const RatesSection = ({
  ratesDropList,
  dropdownValues,
  setDropdownValues,
}: any) => {
  const handleAddDropdown = () => {
    setDropdownValues([...dropdownValues, ""]);
  };

  const handleRemoveDropdown = (index: number) => {
    const updatedDropdownValues = dropdownValues.filter(
      (_: any, i: any) => i !== index
    );
    setDropdownValues(updatedDropdownValues);
  };

  const handleDropdownChange = (index: number, value: any) => {
    const updatedDropdownValues = [...dropdownValues];
    updatedDropdownValues[index] = value;
    setDropdownValues(updatedDropdownValues);
  };

  return (
    <div className="content-details-rates-div">
      <strong className="content-details-label">Rates </strong>
      <div className="content-details-multi-title">
        {dropdownValues.map((value: any, index: number) => (
          <div className="editable-div" key={index}>
            :{" "}
            <EditableDropDown
              onSelect={(value: any) => handleDropdownChange(index, value)}
              ratesDropList={ratesDropList}
              selectedValue={value}
            />
            <button className="plus-minus-btn" onClick={handleAddDropdown}>
              +
            </button>
            {dropdownValues.length > 1 && (
              <button
                className="plus-minus-btn"
                onClick={() => handleRemoveDropdown(index)}
              >
                -
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatesSection;
