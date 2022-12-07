import React, { useState, useEffect } from "react";
import agentApi from "../../api/agentApi";
import { Button, AgentCard, Modal } from "../../components";
import { AddAgentForm } from "../../forms";
import "./AgentsPage.scss";

function AgentsPage() {
  const [agents, setAgents] = useState([]);
  const [isAddModalActive, setIsAddModalActive] = useState(false);
  const [currentAgent, setCurrentAgent] = useState(0);

  useEffect(() => {
    async function getAgents() {
      try {
        const response = await agentApi.getAgents();
        setAgents(response.agents);
      } catch (error) {
        console.log(error);
      }
    }
    getAgents();
  }, []);

  const deleteAgent = async () => {
    await agentApi.delete(agents[currentAgent].agent_id);
    setAgents((prev) => prev.filter((agent, index) => index !== currentAgent));
    setCurrentAgent(0);
  };

  return (
    <>
      <Modal active={isAddModalActive} setActive={setIsAddModalActive}>
        <AddAgentForm
          setAgents={setAgents}
          setActiveModal={setIsAddModalActive}
        />
      </Modal>
      <div className="content">
        <div className="agents">
          <h2 className="agents__title">Agents</h2>
          <div className="agents__button">
            <Button onClick={() => setIsAddModalActive(true)} color={"blue"}>
              Add agent
            </Button>
          </div>
          <ul className="agents__list">
            {agents &&
              agents.map((agent, index) => (
                <AgentCard
                  key={agent.agent_id}
                  index={index}
                  selected={currentAgent === index ? true : false}
                  agent={agent}
                  setCurrentAgent={setCurrentAgent}
                />
              ))}
          </ul>
        </div>
        <div className="agent-content">
          {agents[currentAgent] && (
            <>
              <div className="agent__person">
                <h2 className="agent__name">
                  {agents[currentAgent].full_name}
                </h2>
                <span className="agent__status">Agent</span>
              </div>
              <p className="agent__address">{agents[currentAgent].address}</p>
              <div className="agent__delete">
                <Button onClick={deleteAgent} color={"red"}>
                  Delete agent
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default AgentsPage;
