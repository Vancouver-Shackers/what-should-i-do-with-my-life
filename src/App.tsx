import { useState } from "react";

enum Theme {
  dark = "dark",
  light = "light",
}

const App = () => {
  const [theme, setTheme] = useState(Theme.light);

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
      </div>
    </div>
  );
};

export default App;
