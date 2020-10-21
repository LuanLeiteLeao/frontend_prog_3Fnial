import axios from "axios";
// Set config defaults when creating the instance
export const ApiInstance = axios.create({
  baseURL: "http://localhost:8080/crudGamesBackEnd/",
});
