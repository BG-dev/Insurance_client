import React from "react";
import "./ClientCard.scss";

function ClientCard({ client, index, setCurrentClient, selected }) {
  return (
    <li
      className={`card ${selected ? "selected" : ""}`}
      onClick={() => setCurrentClient(index)}
    >
      <h3 className="client-name">{client.name}</h3>
      <p className="client-phone-number">{"+" + client.phone_number}</p>
    </li>
  );
}

export default ClientCard;
