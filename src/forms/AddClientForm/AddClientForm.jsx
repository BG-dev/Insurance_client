import React from "react";
import "./AddClientForm.scss";
import { Formik, Form } from "formik";
import CustomField from "../CustomField";
import clientApi from "../../api/clientApi";

function AddClientForm({ setClients, setActiveModal }) {
  const createClient = async (values) => {
    const clientData = {
      name: values.name,
      address: values.address,
      phone_number: values.phoneNumber,
      LEI: values.lei,
    };
    try {
      const response = await clientApi.add(clientData);
      const client = response.client;
      setClients((prev) => [...prev, client]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="custom-form">
      <h2 className="custom-form__title">Add client</h2>
      <Formik
        initialValues={{
          name: "",
          address: "",
          phoneNumber: "",
          lei: "",
        }}
        onSubmit={async (values, { resetForm }) => {
          await createClient(values);
          resetForm();
          setActiveModal(false);
        }}
      >
        {() => (
          <Form className="custom-form__container">
            <CustomField name="name" label="Name" type="text" />
            <CustomField name="address" label="Address" type="text" />
            <CustomField name="phoneNumber" label="Phone number" type="text" />
            <CustomField name="lei" label="LEI" type="text" />
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

export default AddClientForm;
