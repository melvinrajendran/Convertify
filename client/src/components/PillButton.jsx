import "./PillButton.css";
import { Button } from "react-bootstrap";

const PillButton = (props) => {
  return (
    <Button title={props.title} onClick={props.onClick} size="sm" href={props.href} className={`rounded-pill shadow-none px-5 py-3 button ${props.outline ? "button-outline" : "button-color"}`} disabled={props.disabled}>
      {props.text.toUpperCase()}
    </Button>
  );
};

export default PillButton;
