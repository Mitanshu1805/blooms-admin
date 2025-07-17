import { SearchableDropDown } from "..";

const EditableDropdown = ({ onSelect, ratesDropList, selectedValue }: any) => {
  const handleDropdownChange = (e: any) => {
    onSelect(e);
  };

  const handleInputChange = (e: any) => {
    onSelect(e.target.value);
  };

  return (
    <div style={{ marginLeft: "5px" }}>
      {selectedValue ? (
        <textarea
          className="content-details-input"
          value={selectedValue}
          onChange={handleInputChange}
          autoFocus
        />
      ) : (
        <SearchableDropDown
          style={{ width: "250px" }}
          options={ratesDropList}
          onSelect={handleDropdownChange}
          placeholderText={"Rate"}
        />
      )}
    </div>
  );
};

export default EditableDropdown;
