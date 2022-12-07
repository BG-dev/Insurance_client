import axiosClient from "./axiosClient";

const insuranceCasesApi = {
  getCases: () => axiosClient.get(`/insurancecases`),
};

export default insuranceCasesApi;
