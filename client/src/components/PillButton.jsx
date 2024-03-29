import { Button } from "react-bootstrap";
import "./PillButton.css";

const PillButton = (props) => {
  return (
    <Button title={props.title} onClick={props.onClick} size="sm" href={props.href} className={`${props.className ? props.className : ""} fs-5 rounded-pill shadow-none px-5 py-3 button ${props.outline ? "button-outline" : props.delete ? "button-delete" : "button-color"}`} disabled={props.disabled}>
      {props.text}
    </Button>
  );
};

export default PillButton;
