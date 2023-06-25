import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="nav-stuff">
        {["Bored", "Ideas", "Help", "Cat"].map((a, i) => (
          <div
            key={i}
            className="nav-thing"
            onClick={() => {
              navigate(a.toLowerCase());
            }}
          >
            {a}
          </div>
        ))}
      </div>
      <h1 className="title">What should I do with my life?</h1>
    </div>
  );
};

export default HomePage;
