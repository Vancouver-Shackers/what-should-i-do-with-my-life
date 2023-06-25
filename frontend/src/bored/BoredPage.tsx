import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BoredSite from "./BoredSite";

const BoredPage = () => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 20,
      },
    })
  );
  const [sites, setSites] = useState([
    { id: 1, url: "https://nycrat.github.io/tic-tac-toe/" },
    { id: 2, url: "https://justtypestuff.com/" },
    { id: 3, url: "https://nycrat.github.io/tic-tac-toe/" },
    { id: 4, url: "https://justtypestuff.com/" },
  ]);

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (over && active.id !== over.id) {
      const activeIndex = sites.findIndex(({ id }) => id === active.id);
      const overIndex = sites.findIndex(({ id }) => id === over.id);

      setSites(arrayMove(sites, activeIndex, overIndex));
    }
  };

  const navigate = useNavigate();

  return (
    <div className="background-dimmer">
      <h1 className="header-title" onClick={() => navigate("/")}>
        What should I do with my life?
      </h1>
      <div className="bored-page">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={sites} strategy={rectSortingStrategy}>
            {sites.map((idea, i) => (
              <BoredSite
                key={idea.id}
                {...idea}
                active={i === 0}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

export default BoredPage;
