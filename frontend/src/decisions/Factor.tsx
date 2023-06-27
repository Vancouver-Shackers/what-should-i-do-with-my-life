import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CSSProperties } from "react";

export interface FactorProps {
  value: string;
  setValue?: (value: string) => void;
  id: UniqueIdentifier;
}

const Factor = (props: FactorProps) => {
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

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      contentEditable
      suppressContentEditableWarning
        onBlur={(e) => {
          const newValue = e.currentTarget.textContent;
          if (newValue && newValue !== props.value) {
            if (props.setValue) {
              props.setValue(newValue);
            }

          }
          }
      }
    >
      {props.value}
    </li>
  );
};

export default Factor;
