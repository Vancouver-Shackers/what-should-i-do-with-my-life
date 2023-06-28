import axios from "axios";
import { FactorProps } from "./decisions/Factor";

const url =
  process.env.NODE_ENV === "production"
    ? "https://nycrat.pythonanywhere.com"
    : "http://localhost:4000";

export const fetchIdea = async (topic: string): Promise<string> => {
  const res = await axios
    .get(`${url}/giveideas?useridea="${topic}"`)
    .catch((err) => {
      console.error(err);
    });

  if (res) {
    return res.data;
  }
  return "";
};

export const fetchDecision = async (
  option1: string,
  option2: string
): Promise<{
  newPros1: FactorProps[];
  newCons1: FactorProps[];
  newPros2: FactorProps[];
  newCons2: FactorProps[];
}> => {
  const res = await axios
    .get(`${url}/decide?choice1="${option1}"&choice2="${option2}"`)
    .catch((err) => {
      console.error(err);
    });

  if (res) {
    const data: string = res.data;
    const [optionFactors1, optionFactors2] = data.split("\n---\n");

    const [prosHa1, consHa1] = optionFactors1.split("\n\n");
    let [prosHa2, consHa2] = optionFactors2.split("\n\n");

    const id = Date.now();

    if (consHa2.charAt(consHa2.length - 1) === "\n") {
      consHa2 = consHa1.substr(0, consHa2.length - 1);
    }

    const pros1: FactorProps[] = prosHa1
      .split("\n")
      .map((value, i) => ({ value: value.substr(3), id: id - i }));
    const cons1: FactorProps[] = consHa1
      .split("\n")
      .map((value, i) => ({ value: value.substr(3), id: id - 5 - i }));
    const pros2: FactorProps[] = prosHa2
      .split("\n")
      .map((value, i) => ({ value: value.substr(3), id: id - 10 - i }));
    const cons2: FactorProps[] = consHa2
      .split("\n")
      .map((value, i) => ({ value: value.substr(3), id: id - 15 - i }));

    return {
      newPros1: pros1,
      newCons2: cons2,
      newPros2: pros2,
      newCons1: cons1,
    };
  }
  return {
    newPros1: [],
    newCons2: [],
    newPros2: [],
    newCons1: [],
  };
};
