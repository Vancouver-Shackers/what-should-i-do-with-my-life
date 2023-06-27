import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import DecisionTab from "./Decision";
import { Decision } from "./DecisionsPage";

const DecisionsList = (props: {
  decisions: Decision[];
  setDecisions: (decisions: Decision[]) => void;
  index: number;
  setIndex: (index: number) => void;
}) => {
  const { decisions, setDecisions, index, setIndex } = props;
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: { x: 20 },
      },
    })
  );
  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (over && active.id !== over.id) {
      const activeIndex = decisions.findIndex(({ id }) => id === active.id);
      const overIndex = decisions.findIndex(({ id }) => id === over.id);
      if (activeIndex === index) {
        setIndex(overIndex);
      } else if (activeIndex < index && overIndex >= index) {
        setIndex(index - 1);
      } else if (activeIndex > index && overIndex <= index) {
        setIndex(index + 1);
      }

      setDecisions(arrayMove(decisions, activeIndex, overIndex));
    }
  };

  return (
    <div className="decisions-list">
      <DndContext
        modifiers={[restrictToHorizontalAxis]}
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={decisions}
          strategy={horizontalListSortingStrategy}
        >
          {decisions.map((decision, i) => (
            <DecisionTab
              key={decision.id}
              decision={decision}
              active={props.index === i}
              setActive={() => {
                props.setIndex(i);
              }}
            />
          ))}
        </SortableContext>
      </DndContext>
      <span
        className="material-symbols-outlined"
        onClick={() => {
          setDecisions([
            ...decisions,
            {
              id: Date.now(),
              option1: "Cats",
              option2: "Dogs",
              pros1: [],
              cons1: [],
              pros2: [],
              cons2: [],
            },
          ]);
        }}
      >
        add
      </span>
    </div>
  );
};

export default DecisionsList;
