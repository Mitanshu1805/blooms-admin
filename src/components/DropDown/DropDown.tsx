import Image from '../Image/Image';

function DropDown({
  label,
  onChange,
  data,
  onClick,
  disabled,
  style,
  error,
  value,
}: any) {
  return (
    <div className='inputText-input-wrapper add-details-input-container'>
      <label className='inputText-label' htmlFor={label}>
        {label}
      </label>
      <select
        className='ac-inputText-input-container'
        style={style}
        onChange={onChange}
        onClick={onClick}
        disabled={disabled}
        value={value}
      >
        <option></option>
        {data &&
          data?.map((item: any, index: number) => {
            return (
              <option
                key={index}
                className='ac-inputText-input'
                value={item.value ? item.value : item}
              >
                {item.label ? item.label : item}
              </option>
            );
          })}
      </select>
      {error ? (
        <div className='inputText-error-container'>
          <Image
            className='inputText-img'
            src={require('./../../assets/pngs/remove.png')}
            alt=''
          />
          <span>{error}</span>
        </div>
      ) : null}
    </div>
  );
}

export default DropDown;
