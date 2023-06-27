import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { IdeaProps } from "./ideas/Idea";
import IdeaPage from "./ideas/IdeaPage";
import LoginPage from "./LoginPage";
import BoredPage from "./bored/BoredPage";
import DecisionsPage from "./decisions/DecisionsPage";
import CatPage from "./cat/CatPage";
import HomePage from "./HomePage";
import NotFoundPage from "./NotFoundPage";
import { FactorProps } from "./decisions/Factor";

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

const getFactors = (name: string): FactorProps[] => {
  const factorString = window.localStorage.getItem(name);
  if (factorString) {
    const factors: FactorProps[] = JSON.parse(factorString);
    return factors;
  }
  return [];
};

const App = () => {
  const [theme, setTheme] = useState(getTheme());
  const [ideas, setIdeas] = useState<IdeaProps[]>(getIdeas());
  const [pros1, setPros1] = useState<FactorProps[]>(getFactors("pros1"));
  const [cons1, setCons1] = useState<FactorProps[]>(getFactors("cons1"));

  useEffect(() => {
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    window.localStorage.setItem("ideas", JSON.stringify(ideas));
  }, [ideas]);

  useEffect(() => {
    window.localStorage.setItem("pros1", JSON.stringify(pros1));
  }, [pros1]);

  useEffect(() => {
    window.localStorage.setItem("cons1", JSON.stringify(cons1));
  }, [cons1]);

  return (
    <div className={theme}>
      <div className="app">
        <button
          className="theme-button"
          onClick={() => {
            setTheme(theme === Theme.dark ? Theme.light : Theme.dark);
          }}
        >
          Theme: {theme.at(0)?.toUpperCase() + theme.slice(1)}
        </button>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/ideas"
            element={<IdeaPage ideas={ideas} setIdeas={setIdeas} />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/bored" element={<BoredPage />} />
          <Route
            path="/decisions"
            element={
              <DecisionsPage
                pros1={pros1}
                cons1={cons1}
                setPros1={setPros1}
                setCons1={setCons1}
              />
            }
          />
          <Route path="/cat" element={<CatPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
