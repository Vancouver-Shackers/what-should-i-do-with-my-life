import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Factor, { FactorProps } from "./Factor";

const FactorList = (props: {
  factors: FactorProps[];
  setFactors: (factors: FactorProps[]) => void;
  pros?: boolean;
}) => {
  const { factors, setFactors, pros } = props;
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: { y: 20 },
      },
    })
  );

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (over && active.id !== over.id) {
      const activeIndex = factors.findIndex(({ id }) => id === active.id);
      const overIndex = factors.findIndex(({ id }) => id === over.id);

      setFactors(arrayMove(factors, activeIndex, overIndex));
    }
  };

  return (
    <div className="list">
      <div>
        <h3>{pros ? "Pros" : "Cons"}</h3>
        <span
          className="material-symbols-outlined"
          onClick={() => {
            setFactors([
              { value: pros ? "new pro" : "new con", id: Date.now() },
              ...factors,
            ]);
          }}
        >
          add_box
        </span>
      </div>
      <ul>
        <DndContext
          modifiers={[restrictToVerticalAxis]}
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={factors}
            strategy={verticalListSortingStrategy}
          >
            {factors.map((pro, i) => (
              <Factor
                key={pro.id}
                {...pro}
                setValue={(value: string) => {
                  setFactors([
                    ...factors.slice(0, i),
                    {
                      ...factors[i],
                      value: value,
                    },
                    ...factors.slice(i + 1),
                  ]);
                }}
                delete={() => {
                  setFactors([...factors.slice(0, i), ...factors.slice(i + 1)]);
                }}
              />
            ))}
          </SortableContext>
        </DndContext>
      </ul>
    </div>
  );
};

export default FactorList;
