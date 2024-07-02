// this is our selector
import "./Selector.css";
export default function Selector({ selector, setSelector, className }) {
  return (
    <select
      value={selector}
      onChange={(event) => setSelector(event.target.value)}
      className={className}
    >
      <option value={"ALL"}>All</option>
      <option value={"Complete"}>Complete</option>
      <option value={"Incomplete"}>Incomplete</option>
    </select>
  );
}
