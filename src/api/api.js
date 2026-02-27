import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5146",
  headers: {
    "Content-Type": "application/json",
  },
});

// inventory
export const apiGetProductList = () => api.post("/api/v1/product/get-list");
export const apiGetProductInit = () => api.get("/api/v1/product/get-init");
export const apiSaveProduct = (payload) =>
  api.post("/api/v1/product/save", payload);
export const apiSaveMasterData = (payload) =>
  api.post("/api/v1/master/save", payload);
export const apiGetListMasterData = (payload) =>
  api.post("/api/v1/master/get-list", payload);
