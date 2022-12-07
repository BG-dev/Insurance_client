import axiosClient from "./axiosClient";

const agentApi = {
  getOne: (id) => axiosClient.get(`/agents/${id}`),
  getAgents: () => axiosClient.get(`/agents`),
  add: (data) => axiosClient.post("/agents", data),
  update: (id, data) => axiosClient.put(`agents/${id}`, data),
  delete: (id) => axiosClient.delete(`agents/${id}`),
};

export default agentApi;
