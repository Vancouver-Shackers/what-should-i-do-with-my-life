import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CSSProperties, useState } from "react";

export interface ItemProps {
  name: string;
  delete?: () => void;
  setName?: (name: string) => void;
  id: UniqueIdentifier;
}

const Item = (props: ItemProps) => {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.id });

  const style: CSSProperties = {
    opacity: isDragging ? 0.5 : undefined,
    transform: CSS.Translate.toString(transform),
    zIndex: isDragging ? 99 : 0,
    transition,
  };

  const [expand, setExpand] = useState(false);

  return (
    <div
      className="item"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <span className="material-symbols-outlined" onClick={props.delete}>
        close
      </span>{" "}
      <h2
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => {
          const newName = e.currentTarget.textContent;
          if (newName && newName !== props.name) {
            if (props.setName) {
              props.setName(newName);
            }
          }
        }}
      >
        {props.name}
      </h2>
      <span
        className="material-symbols-outlined expand"
        onClick={() => setExpand(!expand)}
      >
        {expand ? "expand_more" : "expand_less"}
      </span>
    </div>
  );
};

export default Item;
