import React from "react";
import "./AgentCard.scss";

function AgentCard({ agent, index, setCurrentAgent, selected }) {
  return (
    <li
      className={`card ${selected ? "selected" : ""}`}
      onClick={() => setCurrentAgent(index)}
    >
      <h3 className="agent-name">{agent.full_name}</h3>
      <p className="agent-date">{agent.employment_date}</p>
    </li>
  );
}

export default AgentCard;
