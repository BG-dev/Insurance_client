import axiosClient from "./axiosClient";

const clientApi = {
  getOne: (id) => axiosClient.get(`clients/${id}`),
  getClients: () => axiosClient.get(`/clients`),
  add: (data) => axiosClient.post("/clients", data),
  update: (id, data) => axiosClient.put(`clients/${id}`, data),
  delete: (id) => axiosClient.delete(`clients/${id}`),
};

export default clientApi;
