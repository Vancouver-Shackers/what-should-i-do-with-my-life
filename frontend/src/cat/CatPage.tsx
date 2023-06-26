import { useNavigate } from "react-router-dom";

const CatPage = () => {
  const navigate = useNavigate();

  return (
    <div className="background-dimmer">
      <h1 className="header-title" onClick={() => navigate("/")}>
        What should I do with my life?
      </h1>
      <video className="cat-video" autoPlay loop>
        <source src="/what-should-i-do-with-my-life/cat.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      cat
    </div>
  );
};

export default CatPage;
