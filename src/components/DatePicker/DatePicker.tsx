import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Calender } from '../../assets';
import Image from '../Image/Image';
import './DatePicker.scss';

function DatePickerComponent({ label, onChange, selected, style }: any) {
  return (
    <div className='inputText-input-wrapper' style={style}>
      <label className='ac-inputText-date-label'>{label}</label>
      <div className='ac-inputText-date-container'>
        <DatePicker
          wrapperClassName='ac-container-wrapper'
          className='ac-inputText-input-date'
          onChange={onChange}
          selected={selected}
          dateFormat='dd-MM-yyyy'
        />
        <Image className='ac-inputText-input-date-icon' src={Calender} />
      </div>
    </div>
  );
}

export default DatePickerComponent;
