import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CSSProperties } from "react";
import { Decision } from "./DecisionsPage";

const DecisionTab = (props: { decision: Decision; active: boolean; setActive: () => void }) => {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.decision.id });

  const style: CSSProperties = {
    opacity: isDragging ? 0.5 : undefined,
    transform: CSS.Translate.toString(transform),
    zIndex: isDragging ? 99 : 0,
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={props.setActive}
      className={props.active ? "active" : ""}
    >
      {props.decision.option1} or {props.decision.option2}
    </div>
  );
};

export default DecisionTab;
