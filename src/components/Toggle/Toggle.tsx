import { useState } from "react";
import "./Toggle.scss";
import Switch from "react-switch";

function ToggleComponent({ waiver, handleWaiverToggle }: any) {
  const [checked, setChecked] = useState(waiver);
  const handleChange = (nextChecked: boolean) => {
    setChecked(nextChecked);
    handleWaiverToggle(nextChecked);
  };

  return (
    <div className="toggle-container">
      <label>
        <span>Does this order have a commision waiver?</span>
        <Switch
          onChange={handleChange}
          checked={checked}
          className="react-toggle"
        />
      </label>
    </div>
  );
}

export default ToggleComponent;
