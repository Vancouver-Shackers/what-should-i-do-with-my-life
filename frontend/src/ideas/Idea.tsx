import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import autoAnimate from "@formkit/auto-animate";
import { CSSProperties, useEffect, useRef, useState } from "react";

export interface IdeaProps {
  name: string;
  delete?: () => void;
  setName?: (name: string) => void;
  id: UniqueIdentifier;
}

const Idea = (props: IdeaProps) => {
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
  const parent = useRef(null);

  useEffect(() => {
    parent.current &&
      autoAnimate(parent.current, { duration: 200, easing: "ease" });
  }, [parent]);

  return (
    <div
      className="idea"
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
        {expand ? "expand_less" : "expand_more"}
      </span>
      <div ref={parent}>
        {!expand ? null : (
          <div>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et, eos
            quis blanditiis nam quaerat, labore quam rem nihil voluptatibus modi
            vitae quasi accusamus dignissimos sunt iusto repudiandae maiores
            quod illum!
          </div>
        )}
      </div>
    </div>
  );
};

export default Idea;
