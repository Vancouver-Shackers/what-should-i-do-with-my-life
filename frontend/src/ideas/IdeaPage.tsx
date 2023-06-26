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
import autoAnimate from "@formkit/auto-animate";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchIdea } from "../apiFunctions";
import Idea, { IdeaProps } from "./Idea";

const IdeaPage = (props: {
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

  const createNewIdeasAI = async (topic: string) => {
    const idea = await fetchIdea(topic);
    const ideas = idea.split("\n");
    const ideasArr: IdeaProps[] = ideas.map((a, i) => ({
      name: a.split(". ")[1],
      id: Date.now() + i,
      content: "Put notes about this idea here",
    }));
    props.setIdeas([...ideasArr, ...props.ideas]);
  };

  const [expand, setExpand] = useState(false);
  const parent = useRef(null);
  const input = useRef<null | HTMLInputElement>(null);
  const [inputActive, setInputActive] = useState(false);

  useEffect(() => {
    parent.current &&
      autoAnimate(parent.current, { duration: 200, easing: "ease" });
  }, [parent]);

  const handleCreateNewIdea = async () => {
    if (inputActive && expand && input.current) {
      createNewIdeasAI(input.current.value);
      alert("please wait for the ai to think of ideas :D");
    } else {
      props.setIdeas([
        {
          name: "idea",
          content: "Put notes about this idea here",
          id: Date.now(),
        },
        ...props.ideas,
      ]);
    }
  };

  return (
    <div className="background-dimmer">
      <h1 className="header-title" onClick={() => navigate("/")}>
        What should I do with my life?
      </h1>
      <div className="idea-list-box">
        <div className="idea new-idea" ref={parent}>
          <span
            style={{ cursor: "pointer" }}
            onClick={async () => {
              handleCreateNewIdea();
            }}
          >
            <span className="material-symbols-outlined">add_box</span>{" "}
            <h2>New Idea!</h2>
          </span>
          <span
            className="material-symbols-outlined expand"
            onClick={() => setExpand(!expand)}
          >
            menu
          </span>
          {expand && (
            <div>
              <h3>AI Generated Ideas</h3>
              <div>
                <input
                  type="checkbox"
                  checked={inputActive}
                  onChange={(e) => setInputActive(e.target.checked)}
                />
                <input
                  type="text"
                  ref={input}
                  disabled={!inputActive}
                  placeholder="Enter topic for an idea. (eg. games)"
                />
              </div>
            </div>
          )}
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
                  setContent={(content) => {
                    props.setIdeas([
                      ...props.ideas.slice(0, i),
                      { ...props.ideas[i], content: content },
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

export default IdeaPage;
