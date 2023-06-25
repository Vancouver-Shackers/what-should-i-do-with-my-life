import { useNavigate } from "react-router-dom";

const CatPage = () => {
  const navigate = useNavigate();

  return (
    <div className="background-dimmer">
      <h1 className="header-title" onClick={() => navigate("/")}>
        What should I do with my life?
      </h1>
      cat
    </div>
  );
};

export default CatPage;
