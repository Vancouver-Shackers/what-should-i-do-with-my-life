import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CSSProperties, useEffect, useRef, useState } from "react";

interface BoredSiteProps {
  id: UniqueIdentifier;
  url: string;
  active: boolean
  setActive: () => void;
}

const BoredSite = (props: BoredSiteProps) => {
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
    <div
      className="bored-site"
      /* onBlur={() => setActive(false)} */
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {!props.active && <div onClick={() => props.setActive()}>Click To Focus</div>}
      <iframe src={props.url} title="description" />
    </div>
  );
};

export default BoredSite;
