import {useNavigate} from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="header-title" onClick={() => navigate("/")}>
        What should I do with my life?{" "}
      </h1>
      <div style={{
        fontSize: "4rem",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -75%)"
      }}>404 page not found</div>
      
    </div>
  );
};
export default NotFoundPage;
