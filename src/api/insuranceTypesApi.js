import axiosClient from "./axiosClient";

const insuranceTypesApi = {
  getTypes: () => axiosClient.get(`/insuranceTypes`),
};

export default insuranceTypesApi;
