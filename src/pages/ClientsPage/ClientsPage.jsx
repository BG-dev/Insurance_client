import React, { useState, useEffect } from "react";
import clientApi from "../../api/clientApi";
import { Button, ClientCard, Modal } from "../../components";
import AddClientForm from "../../forms/AddClientForm/AddClientForm";
import "./ClientsPage.scss";

function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [isAddModalActive, setIsAddModalActive] = useState(false);
  const [currentClient, setCurrentClient] = useState(0);

  useEffect(() => {
    async function getClient() {
      try {
        const response = await clientApi.getClients();
        setClients(response.clients);
      } catch (error) {
        console.log(error);
      }
    }
    getClient();
  }, []);

  const deleteClient = async () => {
    await clientApi.delete(clients[currentClient].client_id);
    setClients((prev) =>
      prev.filter((client, index) => index !== currentClient)
    );
    setCurrentClient(0);
  };

  const getAverageBill = () => {
    const sum = clients[currentClient].Contracts.reduce(
      (sum, contract) => sum + contract.InsuranceCase.price,
      0
    );
    return Math.round(sum / clients[currentClient].Contracts.length);
  };

  return (
    <>
      <Modal active={isAddModalActive} setActive={setIsAddModalActive}>
        <AddClientForm
          setClients={setClients}
          setActiveModal={setIsAddModalActive}
        />
      </Modal>
      <div className="content">
        <div className="clients">
          <h2 className="clients__title">Clients</h2>
          <div className="clients__button">
            <Button onClick={() => setIsAddModalActive(true)} color={"blue"}>
              Add client
            </Button>
          </div>
          <ul className="clients__list">
            {clients &&
              clients.map((client, index) => (
                <ClientCard
                  key={client.client_id}
                  index={index}
                  selected={currentClient === index ? true : false}
                  client={client}
                  setCurrentClient={setCurrentClient}
                />
              ))}
          </ul>
        </div>
        <div className="client-content">
          {clients[currentClient] && (
            <>
              <div className="client__person">
                <h2 className="client__name">{clients[currentClient].name}</h2>
                <span className="client__status">Client</span>
                <p className="client__lei">
                  {"LEI: " + clients[currentClient].LEI}
                </p>
                <a
                  href={"tel:" + clients[currentClient].phone_number}
                  className="client__phone-number"
                >
                  {"+" + clients[currentClient].phone_number}
                </a>
              </div>
              <p className="client__address">
                {"Address: " + clients[currentClient].address}
              </p>

              <div className="client__stat">Statistics</div>
              <p className="stat">
                {"Count of contracts: " +
                  clients[currentClient].Contracts.length}
              </p>
              <p className="stat">{"Average bill: " + getAverageBill()}</p>
              <p className="stat">
                {"First contract: " +
                  (clients[currentClient].Contracts.length > 0
                    ? clients[currentClient].Contracts[0].InsuranceCase.name +
                      `(${clients[currentClient].Contracts[0].date})`
                    : "None")}
              </p>
              <div className="client__delete">
                <Button onClick={deleteClient} color={"red"}>
                  Delete client
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ClientsPage;
