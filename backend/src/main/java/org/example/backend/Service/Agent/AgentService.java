package org.example.backend.Service.Agent;


import org.example.backend.Model.Agent;

import java.util.List;

public interface AgentService {
    void addAgent(Agent agent);
    Agent getAgent(Long id);
    List<Agent> getAllAgents();
    void deleteAgent(Long id);
}

