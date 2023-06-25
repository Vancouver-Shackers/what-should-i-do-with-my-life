import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ItemProps } from "./Item";
import ItemList from "./ItemList";
import LoginPage from "./LoginPage";
import BoredPage from "./sections/BoredPage";

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

  const navigate = useNavigate();

  return (
    <div className={theme}>
      <div className="app">
        <h1 className="title">What should I do with my life?</h1>
        <div className="nav-stuff">
          {["Bored", "Ideas"].map((a, i) => (
            <button
              key={i}
              className="nav-button"
              onClick={() => {
                navigate(a.toLowerCase());
              }}
            >
              {a}
            </button>
          ))}
        </div>
        <button
          className="theme-button"
          onClick={() => {
            setTheme(theme === Theme.dark ? Theme.light : Theme.dark);
          }}
        >
          Theme: {theme.at(0)?.toUpperCase() + theme.slice(1)}
        </button>
        <Routes>
          <Route
            path="/"
            element={<ItemList items={items} setItems={setItems} />}
          />
          <Route
            path="/ideas"
            element={<ItemList items={items} setItems={setItems} />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/bored" element={<BoredPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
