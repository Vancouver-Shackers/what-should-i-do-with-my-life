export interface ItemProps {
  name: string;
  delete?: () => void;
}

const Item = (props: ItemProps) => {
  return (
    <div className="item">
      <span className="material-symbols-outlined" onClick={props.delete}>
        close
      </span>{" "}
      <h2>{props.name}</h2>
    </div>
  );
};

export default Item;
