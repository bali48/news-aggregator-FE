import { apiEndPoints } from "../Constants/urls";

const backendURL = process.env.REACT_APP_BACKENDURL;
export const fetchNews = async () => {
  let data = await fetch(backendURL + apiEndPoints.HOMEPAGE);
  let parsedData = await data.json();
};
