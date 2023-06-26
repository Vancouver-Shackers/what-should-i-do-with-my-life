import axios from "axios";

const url = "http://localhost:4000";

export const fetchIdea = async (theme: string): Promise<string> => {
  const res = await axios
    .get(`${url}/giveideas?useridea="${theme}"`)
    .catch((err) => {
      console.error(err);
    });

  if (res) {
    console.log(res.data);
    return res.data;
  }
  return "";
};
