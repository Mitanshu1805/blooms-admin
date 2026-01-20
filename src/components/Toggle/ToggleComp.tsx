import { useEffect, useState } from "react";
import "./Toggle.scss";
import Switch from "react-switch";

interface ToggleComponentProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  label?: string;
}

function ToggleComponent({ checked, onChange, label }: ToggleComponentProps) {
  const [isChecked, setIsChecked] = useState(checked);

  // Sync internal state with external prop changes
  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleChange = (nextChecked: boolean) => {
    setIsChecked(nextChecked);
    onChange(nextChecked);
  };

  return (
    <div className="toggle-container">
      <label>
        {label && <span>{label}</span>}
        <Switch
          onChange={handleChange}
          checked={isChecked}
          className="react-toggle"
        />
      </label>
    </div>
  );
}

export default ToggleComponent;
