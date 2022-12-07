import React, { useEffect, useState } from "react";
import "./AddAgentForm.scss";
import { Formik, Form } from "formik";
import Select from "react-select";
import CustomField from "../CustomField";
import agentApi from "../../api/agentApi";
import insuranceTypesApi from "../../api/insuranceTypesApi";

function AddAgentForm({ setAgents, setActiveModal }) {
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);

  useEffect(() => {
    async function getInsuranceTypes() {
      try {
        const response = await insuranceTypesApi.getTypes();
        setTypes(
          response.insuranceTypes.map((type) => ({
            value: type.insurance_type_id,
            label: type.insurance_name,
          }))
        );
      } catch (error) {
        console.log(error);
      }
    }
    getInsuranceTypes();
  }, []);

  const createAgent = async (values) => {
    const agentData = {
      full_name: values.fullName,
      insurance_type: selectedType.value,
      employment_date: values.employmentDate,
      address: values.address,
      passport_number: values.passportNumber,
    };
    try {
      const response = await agentApi.add(agentData);
      const agent = response.agent;
      setAgents((prev) => [...prev, agent]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="custom-form">
      <h2 className="custom-form__title">Add agent</h2>
      <Formik
        initialValues={{
          fullName: "",
          employmentDate: "",
          address: "",
          passportNumber: "",
        }}
        onSubmit={async (values, { resetForm }) => {
          await createAgent(values);
          resetForm();
          setSelectedType("");
          setActiveModal(false);
        }}
      >
        {() => (
          <Form className="custom-form__container">
            <CustomField name="fullName" label="Name" type="text" />
            <div className="select-form">
              <Select
                value={selectedType}
                onChange={(selectedOption) => setSelectedType(selectedOption)}
                options={types}
                placeholder={"Insurance type"}
              />
            </div>
            <CustomField
              name="employmentDate"
              label="Employment date"
              type="date"
            />
            <CustomField name="address" label="Address" type="text" />
            <CustomField
              name="passportNumber"
              label="Passport number"
              type="text"
            />
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

export default AddAgentForm;
