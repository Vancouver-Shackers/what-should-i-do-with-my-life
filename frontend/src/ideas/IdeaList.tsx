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
import { useNavigate } from "react-router-dom";
import Idea, { IdeaProps } from "./Idea";

const IdeaList = (props: {
  ideas: IdeaProps[];
  setIdeas: (ideas: IdeaProps[]) => void;
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: { y: 20 },
      },
    })
  );

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (over && active.id !== over.id) {
      const activeIndex = props.ideas.findIndex(({ id }) => id === active.id);
      const overIndex = props.ideas.findIndex(({ id }) => id === over.id);

      props.setIdeas(arrayMove(props.ideas, activeIndex, overIndex));
    }
  };

  const navigate = useNavigate();

  return (
    <div>
      <h1 className="header-title" onClick={() => navigate("/")}>
        What should I do with my life?
      </h1>
      <div className="idea-list-box">
        <div
          className="idea new-idea"
          style={{ cursor: "pointer" }}
          onClick={() => {
            props.setIdeas([
              {
                name: Math.random() > 0.5 ? "idk" : "haha",
                id: Date.now(),
              },
              ...props.ideas,
            ]);
          }}
        >
          <span className="material-symbols-outlined">add_box</span>{" "}
          <h2>New Idea!</h2>
        </div>
        <div className="idea-list">
          <DndContext
            modifiers={[restrictToVerticalAxis]}
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={props.ideas}
              strategy={verticalListSortingStrategy}
            >
              {props.ideas.map((idea, i) => (
                <Idea
                  key={idea.id}
                  {...idea}
                  delete={() => {
                    props.setIdeas([
                      ...props.ideas.slice(0, i),
                      ...props.ideas.slice(i + 1),
                    ]);
                  }}
                  setName={(name) => {
                    props.setIdeas([
                      ...props.ideas.slice(0, i),
                      { ...props.ideas[i], name: name },
                      ...props.ideas.slice(i + 1),
                    ]);
                  }}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </div>
  );
};

export default IdeaList;
