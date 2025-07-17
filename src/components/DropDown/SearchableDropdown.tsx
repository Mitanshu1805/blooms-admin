import { useState } from "react";
import Select from "react-select";
import "./DropDown.scss";
import Image from "../Image/Image";

const SearchableDropdown = ({
  options,
  onSelect,
  placeholderText,
  isMulti,
  initialValue,
  style,
}: any) => {
  const [selectedOption, setSelectedOption] = useState<any>("");
  const formattedValue = initialValue?.map((option: any) => ({
    value: option.service_id,
    label: option.service_name,
  }));
  const [formattedOptions, setFormattedOption] = useState<any>(formattedValue);
  const [error, setError] = useState<any>("");

  const handleChange = (selectedOption: any) => {
    if (isMulti) {
      if (selectedOption?.length <= 3) {
        setSelectedOption(selectedOption);
        setFormattedOption(selectedOption);
        onSelect(selectedOption);
      } else {
        setError("select only 3 services");
      }
    } else {
      setSelectedOption(selectedOption);
      onSelect(selectedOption.value);
    }
  };

  const customStyles = {
    container: (provided: any) => ({
      ...provided,
      marginTop: "2px",
    }),
    menu: (provided: any) => ({
      ...provided,
      borderRadius: "0 0 5px 5px",
    }),
  };

  return (
    <div className="dropdown-container" style={style}>
      <Select
        isMulti={isMulti}
        value={formattedOptions ? formattedOptions : selectedOption}
        onChange={handleChange}
        options={options}
        isSearchable
        placeholder={placeholderText}
        className="dropdown-input"
        classNamePrefix="dropdown-input"
        menuPlacement="auto"
        styles={customStyles}
        theme={(theme) => ({
          ...theme,
          borderRadius: 5,
          colors: {
            ...theme.colors,
            primary25: "#f5f5f5",
            primary50: "#e0e0e0",
            primary75: "#d1d1d1",
            primary: "#e6b800",
          },
        })}
      />
      {error ? (
        <div className="inputText-error-container">
          <Image
            className="inputText-img"
            src={require("./../../assets/pngs/remove.png")}
            alt=""
          />
          <span>{error}</span>
        </div>
      ) : null}
    </div>
  );
};

export default SearchableDropdown;
