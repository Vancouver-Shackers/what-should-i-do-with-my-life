import { useNavigate } from "react-router-dom";

const HelpPage = () => {
  const navigate = useNavigate();

  return (
    <div className="background-dimmer">
      <h1 className="header-title" onClick={() => navigate("/")}>
        What should I do with my life?
      </h1>
      help
    </div>
  );
};

export default HelpPage;
