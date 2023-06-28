import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import autoAnimate from "@formkit/auto-animate";
import { CSSProperties, useEffect, useRef, useState } from "react";

export interface IdeaProps {
  name: string;
  content: string;
  delete?: () => void;
  setName?: (name: string) => void;
  setContent?: (content: string) => void;
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
        {expand && (
          <div
            role={"textbox"}
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => {
              /* const newContent = e.currentTarget.value; */
              const newContent = e.currentTarget.textContent;
              if (newContent && newContent !== props.content) {
                if (props.setContent) {
                  props.setContent(newContent);
                }
              }
            }}
          >
            {props.content}
          </div>
        )}
      </div>
    </div>
  );
};

export default Idea;
