import { ButtonLoading } from "..";
import "./Button.scss";

interface Props {
  className?: string;
  onClick?: any;
  name?: any;
  isLoading?: boolean;
  style?: any;
  isInvalid?: boolean;
  disabled?: boolean;
}

const Button = (props: Props) => {
  return (
    <button
      style={props.style}
      className={`basic-button ${props.className || "left"}`}
      onClick={props.onClick}
      disabled={props.isLoading || props.isInvalid}
    >
      {props.isLoading ? <ButtonLoading /> : props.name || "button"}
    </button>
  );
};
export default Button;
