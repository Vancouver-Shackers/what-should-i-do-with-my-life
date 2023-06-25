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

  const [active, setActive] = useState(1);

  return (
    <div className="bored-page">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={sites} strategy={rectSortingStrategy}>
          {sites.map((item) => (
            <BoredSite
              key={item.id}
              {...item}
              active={active === item.id}
              setActive={() => setActive(parseInt(item.id.toString()))}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default BoredPage;
