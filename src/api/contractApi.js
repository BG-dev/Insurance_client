import axiosClient from "./axiosClient";

const contractApi = {
  getOne: (id) => axiosClient.get(`/contracts/${id}`),
  getContracts: () => axiosClient.get(`/contracts`),
  add: (data) => axiosClient.post("/contracts", data),
  update: (id, data) => axiosClient.put(`contracts/${id}`, data),
  delete: (id) => axiosClient.delete(`contracts/${id}`),
};

export default contractApi;
