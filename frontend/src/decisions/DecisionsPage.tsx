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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDecision } from "../apiFunctions";
import Factor, { FactorProps } from "./Factor";

const DecisionsPage = (props: {
  pros1: FactorProps[];
  cons1: FactorProps[];
  setPros1: (pros: FactorProps[]) => void;
  setCons1: (cons: FactorProps[]) => void;
}) => {
  const { pros1, cons1, setPros1, setCons1 } = { ...props };

  const navigate = useNavigate();

  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: { y: 20 },
      },
    })
  );
  const handleDragEnd = (
    { active, over }: DragEndEvent,
    factors: FactorProps[],
    setFactors: (factors: FactorProps[]) => void
  ) => {
    if (over && active.id !== over.id) {
      const activeIndex = factors.findIndex(({ id }) => id === active.id);
      const overIndex = factors.findIndex(({ id }) => id === over.id);

      setFactors(arrayMove(factors, activeIndex, overIndex));
    }
  };

  return (
    <div className="background-dimmer">
      <h1 className="header-title" onClick={() => navigate("/")}>
        What should I do with my life?
      </h1>
      <div className="decisions-page">
        <div className="question-thing">
          <input
            type="text"
            onChange={(e) => setOption1(e.currentTarget.value)}
          />{" "}
          or{" "}
          <input
            type="text"
            onChange={(e) => setOption2(e.currentTarget.value)}
          />
        </div>

        <button
          className="decide-button"
          disabled={!(option1 !== "" && option2 !== "")}
          onClick={async () => {
            alert("WAIT FOR THE AI TO THINK OF PROS AND CONS");
            const { newPros1, newCons1, newPros2, newCons2 } =
              await fetchDecision(option1, option2);
            setPros1([...newPros1, ...pros1]);
            setCons1([...newCons1, ...cons1]);
          }}
        >
          Decide
        </button>

        <div className="pros-cons">
          <div className="list">
            <div>
              <h3>Pros</h3>
              <span
                className="material-symbols-outlined"
                onClick={() => {
                  setPros1([{ value: "new pro", id: Date.now() }, ...pros1]);
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
                onDragEnd={(e) => handleDragEnd(e, pros1, setPros1)}
              >
                <SortableContext
                  items={pros1}
                  strategy={verticalListSortingStrategy}
                >
                  {pros1.map((pro, i) => (
                    <Factor
                      key={pro.id}
                      {...pro}
                      setValue={(value: string) => {
                        setPros1([
                          ...pros1.slice(0, i),
                          {
                            ...pros1[i],
                            value: value,
                          },
                          ...pros1.slice(i + 1),
                        ]);
                      }}
                    />
                  ))}
                </SortableContext>
              </DndContext>
            </ul>
          </div>
          <div className="list">
            <div>
              <h3>Cons</h3>
              <span
                className="material-symbols-outlined"
                onClick={() => {
                  setCons1([{ value: "new con", id: Date.now() }, ...cons1]);
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
                onDragEnd={(e) => handleDragEnd(e, cons1, setCons1)}
              >
                <SortableContext
                  items={cons1}
                  strategy={verticalListSortingStrategy}
                >
                  {cons1.map((con, i) => (
                    <Factor
                      key={con.id}
                      {...con}
                      setValue={(value: string) => {
                        setCons1([
                          ...cons1.slice(0, i),
                          {
                            ...cons1[i],
                            value: value,
                          },
                          ...cons1.slice(i + 1),
                        ]);
                      }}
                    />
                  ))}
                </SortableContext>
              </DndContext>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecisionsPage;
