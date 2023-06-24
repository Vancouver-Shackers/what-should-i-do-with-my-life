import { useEffect, useState } from "react";
import Item, { ItemProps } from "./Item";

enum Theme {
  dark = "dark",
  light = "light",
}

const getTheme = (): Theme => {
  const theme = window.localStorage.getItem("theme");
  if (theme === "dark") {
    return Theme.dark;
  }

  return Theme.light;
};

const getItems = (): ItemProps[] => {
  const itemsString = window.localStorage.getItem("items");
  if (itemsString) {
    const items: ItemProps[] = JSON.parse(itemsString);
    return items;
  }
  return [{ name: "IDEA" }];
};

const App = () => {
  const [theme, setTheme] = useState(getTheme());
  const [items, setItems] = useState<ItemProps[]>(getItems());

  useEffect(() => {
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    window.localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  return (
    <div className={theme}>
      <div className="app">
        <h1 className="title">What should I do with my life?</h1>
        <button
          className="theme-button"
          onClick={() => {
            setTheme(theme === Theme.dark ? Theme.light : Theme.dark);
          }}
        >
          Theme: {theme.at(0)?.toUpperCase() + theme.slice(1)}
        </button>

        <button
          className="new-idea-button"
          onClick={() => {
            setItems([
              ...items,
              {
                name: Math.random() > 0.5 ? "idk" : "haha",
              },
            ]);
          }}
        >
          new idea
        </button>
        <div className="item-list-box">
          <div className="item-list">
            {items.map((itemProps, i) => (
              <Item
                key={i}
                {...itemProps}
                delete={() => {
                  let newItems = [...items];
                  newItems.splice(i, 1);
                  setItems(newItems);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
