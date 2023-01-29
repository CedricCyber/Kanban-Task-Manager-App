import crossSvg from "../assets/icon-cross.svg";
export default function SubtaskInput(props) {
  return (
    <div className="flex justify-between mb-5">
      <input
        className="w-385 h-40"
        type="text"
        placeholder="e.g. Drink coffee & smile"
      />
      <img className="py-1" onClick={props.handleDelete} src={crossSvg} />
    </div>
  );
}
