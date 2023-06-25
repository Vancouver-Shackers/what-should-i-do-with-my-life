import { useEffect, useState } from "react";
import { ItemProps } from "./Item";
import ItemList from "./ItemList";

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
  return [];
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
                id: Date.now(),
              },
            ]);
          }}
        >
          new idea
        </button>
        <ItemList items={items} setItems={setItems} />
      </div>
    </div>
  );
};

export default App;
