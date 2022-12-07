import React from "react";
import "./ContractCard.scss";

function ContractCard({ contract, index, setCurrentContract, selected }) {
  return (
    <li
      className={`card ${selected ? "selected" : ""}`}
      onClick={() => setCurrentContract(index)}
    >
      <h3 className="contract-name">
        {contract.InsuranceCase.name + " - " + contract.date}
      </h3>
      <p className="contract-phone-number">{contract.Client.name}</p>
    </li>
  );
}

export default ContractCard;
