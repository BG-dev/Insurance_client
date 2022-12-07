import React, { useEffect, useState } from "react";
import "./AddContractForm.scss";
import { Formik, Form } from "formik";
import Select from "react-select";
import CustomField from "../CustomField";
import agentApi from "../../api/agentApi";
import insuranceCasesApi from "../../api/insuranceCasesApi";
import clientApi from "../../api/clientApi";
import contractApi from "../../api/contractApi";

function AddContractForm({ setContracts, setActiveModal }) {
  const [cases, setCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    async function getInsuranceCases() {
      try {
        const response = await insuranceCasesApi.getCases();
        setCases(
          response.insuranceCases.map((insuranceCase) => ({
            value: insuranceCase.insurance_case_id,
            // type: insuranceCase.insurance_type,
            label: insuranceCase.name,
          }))
        );
      } catch (error) {
        console.log(error);
      }
    }
    getInsuranceCases();
  }, []);

  useEffect(() => {
    async function getAgents() {
      try {
        const response = await agentApi.getAgents();
        setAgents(
          response.agents.map((agent) => ({
            value: agent.agent_id,
            label: agent.full_name,
          }))
        );
      } catch (error) {
        console.log(error);
      }
    }
    getAgents();
  }, []);

  useEffect(() => {
    async function getClients() {
      try {
        const response = await clientApi.getClients();
        setClients(
          response.clients.map((client) => ({
            value: client.client_id,
            label: client.name,
          }))
        );
      } catch (error) {
        console.log(error);
      }
    }
    getClients();
  }, []);

  const createContract = async (values) => {
    const contractData = {
      agent: selectedAgent.value,
      client: selectedClient.value,
      insurance_case: selectedCase.value,
      date: values.date,
      time: values.time,
    };
    try {
      const response = await contractApi.add(contractData);
      const contract = response.contract;
      console.log(contract);
      setContracts((prev) => [...prev, contract]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="custom-form">
      <h2 className="custom-form__title">Add agent</h2>
      <Formik
        initialValues={{
          date: "",
          time: "",
        }}
        onSubmit={async (values, { resetForm }) => {
          await createContract(values);
          resetForm();
          setSelectedAgent("");
          setSelectedCase("");
          setSelectedClient("");
          setActiveModal(false);
        }}
      >
        {() => (
          <Form className="custom-form__container">
            <div className="select-form">
              <Select
                value={selectedAgent}
                onChange={(selectedOption) => setSelectedAgent(selectedOption)}
                options={agents}
                placeholder={"Agent"}
              />
            </div>
            <div className="select-form">
              <Select
                value={selectedClient}
                onChange={(selectedOption) => setSelectedClient(selectedOption)}
                options={clients}
                placeholder={"Client"}
              />
            </div>
            <div className="select-form">
              <Select
                value={selectedCase}
                onChange={(selectedOption) => setSelectedCase(selectedOption)}
                options={cases}
                placeholder={"Insurance case"}
              />
            </div>
            <CustomField name="date" label="Date" type="date" />
            <CustomField name="time" label="Time" type="text" />
            <div className="custom-form__control">
              <button className="btn btn-blue" type="submit">
                Add
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddContractForm;
