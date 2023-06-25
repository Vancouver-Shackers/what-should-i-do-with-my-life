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
import Item, { ItemProps } from "./Item";

const ItemList = (props: {
  items: ItemProps[];
  setItems: (items: ItemProps[]) => void;
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: {y: 20},
      },
    })
  );

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (over && active.id !== over.id) {
      const activeIndex = props.items.findIndex(({ id }) => id === active.id);
      const overIndex = props.items.findIndex(({ id }) => id === over.id);

      props.setItems(arrayMove(props.items, activeIndex, overIndex));
    }
  };
  return (
    <div className="item-list-box">
      <div className="item-list">
        <DndContext
          modifiers={[restrictToVerticalAxis]}
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={props.items}
            strategy={verticalListSortingStrategy}
          >
            {props.items.map((itemProps, i) => (
              <Item
                key={itemProps.id}
                {...itemProps}
                delete={() => {
                  props.setItems([
                    ...props.items.slice(0, i),
                    ...props.items.slice(i + 1),
                  ]);
                }}
                setName={(name) => {
                  props.setItems([
                    ...props.items.slice(0, i),
                    { ...props.items[i], name: name },
                    ...props.items.slice(i + 1),
                  ]);
                }}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

export default ItemList;
