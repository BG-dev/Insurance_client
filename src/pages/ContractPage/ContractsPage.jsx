import React, { useState, useEffect } from "react";
import contractApi from "../../api/contractApi";
import insuranceTypesApi from "../../api/insuranceTypesApi";
import { Button, ContractCard, Modal } from "../../components";
import { AddContractForm } from "../../forms";
import "./ContractsPage.scss";

function ContractsPage() {
  const [contracts, setContracts] = useState([]);
  const [types, setTypes] = useState([]);
  const [isAddModalActive, setIsAddModalActive] = useState(false);
  const [currentContract, setCurrentContract] = useState(0);

  useEffect(() => {
    async function getContract() {
      try {
        const response = await insuranceTypesApi.getTypes();
        setTypes(response.insuranceTypes);
      } catch (error) {
        console.log(error);
      }
    }
    getContract();
  }, []);

  useEffect(() => {
    async function getContract() {
      try {
        const response = await contractApi.getContracts();
        setContracts(response.contracts);
      } catch (error) {
        console.log(error);
      }
    }
    getContract();
  }, []);

  const deleteContract = async () => {
    await contractApi.delete(contracts[currentContract].contract_id);
    setContracts((prev) =>
      prev.filter((contract, index) => index !== currentContract)
    );
    setCurrentContract(0);
  };
  console.log(types);
  return (
    <>
      <Modal active={isAddModalActive} setActive={setIsAddModalActive}>
        <AddContractForm
          setContracts={setContracts}
          setActiveModal={setIsAddModalActive}
        />
      </Modal>
      <div className="content">
        <div className="contracts">
          <h2 className="contracts__title">Contracts</h2>
          <div className="contracts__button">
            <Button onClick={() => setIsAddModalActive(true)} color={"blue"}>
              Add contract
            </Button>
          </div>
          <ul className="contracts__list">
            {contracts &&
              contracts.map((contract, index) => (
                <ContractCard
                  key={contract.contract_id}
                  index={index}
                  selected={currentContract === index ? true : false}
                  contract={contract}
                  setCurrentContract={setCurrentContract}
                />
              ))}
          </ul>
        </div>
        <div className="contract-content">
          {contracts[currentContract] && (
            <>
              <div className="contract__person">
                <h2 className="contract__name">
                  {contracts[currentContract].InsuranceCase.name}
                </h2>
                <span className="contract__status">contract</span>
                <p className="contract__date">
                  {contracts[currentContract].date}
                </p>
              </div>
              <p className="contract__agent">
                {"Agent: " + contracts[currentContract].Agent.full_name}
              </p>
              <p className="contract__client">
                {"Client: " + contracts[currentContract].Client.name}
              </p>
              <p className="contract__price">
                {"Price: " +
                  contracts[currentContract].InsuranceCase.price +
                  "$"}
              </p>
              {/* {types && (
                <p className="contract__date">
                  {types[0].Contracts.length > 0
                    ? types[0].InsuranceCase[0].length
                    : "None"}
                </p>
              )} */}
              <div className="contract__delete">
                <Button onClick={deleteContract} color={"red"}>
                  Delete contract
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ContractsPage;
