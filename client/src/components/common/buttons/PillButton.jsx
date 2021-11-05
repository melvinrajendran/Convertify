import "./PillButton.css";
import { Button } from "react-bootstrap";

export default function PillButton(props) {
  return <Button className={`rounded-pill shadow-none px-5 py-3 button ${props.outline ? "button-outline" : "button-color"}`}>{props.text.toUpperCase()}</Button>;
}
