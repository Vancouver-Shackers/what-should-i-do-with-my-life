import { UniqueIdentifier } from "@dnd-kit/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDecision } from "../apiFunctions";
import DecisionsList from "./DecisionsList";
import { FactorProps } from "./Factor";
import FactorList from "./FactorList";

export interface Decision {
  id: UniqueIdentifier;
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
  index: number;
  setIndex: (i: number) => void;
}) => {
  const { decisions, setDecisions, index, setIndex } = props;
  console.log(decisions);

  const navigate = useNavigate();

  const setOption1 = (option: string) => {
    let newDecisions = [...decisions];
    newDecisions[index].option1 = option;
    setDecisions(newDecisions);
  };

  const setOption2 = (option: string) => {
    let newDecisions = [...decisions];
    newDecisions[index].option2 = option;
    setDecisions(newDecisions);
  };

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
            value={props.decisions[index].option1}
          />{" "}
          or{" "}
          <input
            type="text"
            onChange={(e) => setOption2(e.currentTarget.value)}
            value={props.decisions[index].option2}
          />
        </div>
        <button
          className="decide-button"
          disabled={
            !(
              decisions[index].option1 !== "" && decisions[index].option2 !== ""
            )
          }
          onClick={async () => {
            alert("WAIT FOR THE AI TO THINK OF PROS AND CONS");
            const { newPros1, newCons1, newPros2, newCons2 } =
              await fetchDecision(
                decisions[index].option1,
                decisions[index].option2
              );

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
        <div></div>
        <DecisionsList
          decisions={decisions}
          setDecisions={setDecisions}
          index={index}
          setIndex={setIndex}
        />
        <span
          className="material-symbols-outlined delete-thing"
          onClick={() => {
            if (decisions.length === 1) {
              window.alert("You cannot delete your only decision");
            } else {
              if (
                window.confirm("Are you sure you want to delete this decision?")
              ) {
                if (index === decisions.length - 1) {
                  setIndex(index - 1);
                }
                let newDecisions = [...decisions];
                newDecisions.splice(index, 1);
                setDecisions(newDecisions);
              }
            }
          }}
        >
          delete
        </span>
      </div>
    </div>
  );
};

export default DecisionsPage;
