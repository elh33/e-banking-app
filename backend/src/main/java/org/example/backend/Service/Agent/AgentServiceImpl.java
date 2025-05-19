package org.example.backend.Service.Agent;



import org.example.backend.Model.Agent;
import org.example.backend.Repository.Agent.AgentRepository;
import org.example.backend.Service.Agent.AgentService;

import javax.transaction.Transactional;
import java.util.List;

public class AgentServiceImpl implements AgentService {

    private AgentRepository agentRepository;

    public void setAgentRepository(AgentRepository agentRepository) {
        this.agentRepository = agentRepository;
    }

    @Override
    @Transactional
    public void addAgent(Agent agent) {
        agentRepository.save(agent);
    }

    @Override
    public Agent getAgent(Long id) {
        return agentRepository.findById(id);
    }

    @Override
    public List<Agent> getAllAgents() {
        return agentRepository.findAll();
    }

    @Override
    @Transactional
    public void deleteAgent(Long id) {
        agentRepository.delete(id);
    }
}
