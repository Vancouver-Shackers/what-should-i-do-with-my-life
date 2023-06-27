import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDecision } from "../apiFunctions";
import { FactorProps } from "./Factor";
import FactorList from "./FactorList";

export interface Decision {
  option1: string;
  option2: string;
  pros1: FactorProps[];
  cons1: FactorProps[];
  pros2: FactorProps[];
  cons2: FactorProps[];
}

const DecisionsPage = (props: {
  decisions: Decision[];
  setDecisions: (decisions: Decision[]) => void;
}) => {
  const { decisions, setDecisions } = props;
  console.log(decisions);

  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

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
          onClick={async () => {
            alert("WAIT FOR THE AI TO THINK OF PROS AND CONS");
            const { newPros1, newCons1, newPros2, newCons2 } =
              await fetchDecision(option1, option2);

            let newDecisions = [...decisions];
            newDecisions[index].pros1 = [
              ...newPros1,
              ...newDecisions[index].pros1,
            ];
            newDecisions[index].cons1 = [
              ...newCons1,
              ...newDecisions[index].cons1,
            ];
            newDecisions[index].pros2 = [
              ...newPros2,
              ...newDecisions[index].pros2,
            ];
            newDecisions[index].cons2 = [
              ...newCons2,
              ...newDecisions[index].cons2,
            ];

            setDecisions(newDecisions);
          }}
        >
          Generate Pros and Cons
        </button>

        <div className="pros-cons">
          <FactorList
            factors={decisions[index].pros1}
            setFactors={(factors: FactorProps[]) => {
              let newDecisions = [...decisions];
              newDecisions[index].pros1 = [...factors];
              setDecisions(newDecisions);
            }}
            pros
          />
          <FactorList
            factors={decisions[index].cons1}
            setFactors={(factors: FactorProps[]) => {
              let newDecisions = [...decisions];
              newDecisions[index].cons1 = [...factors];
              setDecisions(newDecisions);
            }}
          />
          <div />
          <FactorList
            factors={decisions[index].pros2}
            setFactors={(factors: FactorProps[]) => {
              let newDecisions = [...decisions];
              newDecisions[index].pros2 = [...factors];
              setDecisions(newDecisions);
            }}
            pros
          />
          <FactorList
            factors={decisions[index].cons2}
            setFactors={(factors: FactorProps[]) => {
              let newDecisions = [...decisions];
              newDecisions[index].cons2 = [...factors];
              setDecisions(newDecisions);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DecisionsPage;
