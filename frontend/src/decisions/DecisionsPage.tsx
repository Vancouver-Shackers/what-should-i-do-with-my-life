import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DecisionsPage = () => {
  const [pros1, setPros1] = useState(["sdfas", "asfsa"]);
  const [cons1, setCons1] = useState([]);

  const navigate = useNavigate();

  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");

  return (
    <div className="background-dimmer">
      <h1 className="header-title" onClick={() => navigate("/")}>
        What should I do with my life?
      </h1>
      <div className="decisions-page">
        <div className="question-thing">
          <input
            type="text"
            onChange={(e) => setOption1(e.currentTarget.value)}
          />{" "}
          or{" "}
          <input
            type="text"
            onChange={(e) => setOption2(e.currentTarget.value)}
          />
        </div>

        <button
          className="decide-button"
          disabled={!(option1 !== "" && option2 !== "")}
          onClick={() => {
            console.log(option1);
            console.log(option2);
          }}
        >
          Decide
        </button>

        <div className="pros-cons">
          <div>
            <h3>Pros</h3>
            {pros1.map((pro, i) => (
              <div key={i}>{pro}</div>
            ))}
          </div>
          <div>
            <h3>Cons</h3>
            {cons1.map((con, i) => (
              <div key={i}>{con}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecisionsPage;
