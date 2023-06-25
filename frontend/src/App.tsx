import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { IdeaProps } from "./ideas/Idea";
import IdeaList from "./ideas/IdeaList";
import LoginPage from "./LoginPage";
import BoredPage from "./bored/BoredPage";
import HelpPage from "./help/HelpPage";
import CatPage from "./cat/CatPage";

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

const getIdeas = (): IdeaProps[] => {
  const ideaString = window.localStorage.getItem("ideas");
  if (ideaString) {
    const ideas: IdeaProps[] = JSON.parse(ideaString);
    return ideas;
  }
  return [];
};

const App = () => {
  const [theme, setTheme] = useState(getTheme());
  const [ideas, setIdeas] = useState<IdeaProps[]>(getIdeas());

  useEffect(() => {
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    window.localStorage.setItem("ideas", JSON.stringify(ideas));
  }, [ideas]);

  const navigate = useNavigate();

  return (
    <div className={theme}>
      <div className="app">
        <h1 className="title">What should I do with my life?</h1>
        <div className="nav-stuff">
          {["Bored", "Ideas", "Help", "Cat"].map((a, i) => (
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
            element={<IdeaList ideas={ideas} setIdeas={setIdeas} />}
          />
          <Route
            path="/ideas"
            element={<IdeaList ideas={ideas} setIdeas={setIdeas} />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/bored" element={<BoredPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/cat" element={<CatPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
