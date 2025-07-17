import "./DropDown.scss";

function NumberDropDown({ onChange }: any) {
  return (
    <span>
      Show &nbsp;
      <select id="number-dd" name="number" onChange={onChange}>
        {[10, 25, 50, 75, 100, 125, 150, 175, 200]?.map((item) => (
          <option value={item}>{item}</option>
        ))}
      </select>
      &nbsp; Entries
    </span>
  );
}

export default NumberDropDown;
