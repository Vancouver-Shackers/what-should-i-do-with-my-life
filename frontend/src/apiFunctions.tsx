import axios from "axios";

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
    console.log(res.data);
    return res.data;
  }
  return "";
};

export const fetchDecision = async (
  option1: string,
  option2: string
): Promise<string> => {
  return "ha";
};
