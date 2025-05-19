package org.example.backend.Service.Agent;
import org.example.backend.DTO.AgentDTO;
import org.example.backend.Model.Agent;
import org.example.backend.Repository.Agent.AgentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AgentService {
    @Autowired
    private AgentRepository agentRepository;

    public Iterable<Agent> getAllAgents() {
        return agentRepository.findAll();
    }

    public Optional<Agent> getAgentById(Long id) {
        return agentRepository.findById(id);
    }

    public Agent createAgent(Agent agent) {
        agent.setRole("AGENT");
        agent.setEtat(true); // actif par défaut
        return agentRepository.save(agent);
    }

    public Agent updateAgent(Long id, Agent agentDetails) {
        Agent agent = agentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Agent non trouvé"));

        agent.setNom(agentDetails.getNom());
        agent.setPrenom(agentDetails.getPrenom());
        agent.setEmail(agentDetails.getEmail());
        agent.setTelephone(agentDetails.getTelephone());
        agent.setMotDePasse(agentDetails.getMotDePasse());
        // Pas de modification du rôle ni de la date de création ici

        return agentRepository.save(agent);
    }

    public void deleteAgent(Long id) {
        agentRepository.deleteById(id);
    }

    public Agent activateAgent(Long id) {
        Agent agent = agentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Agent non trouvé"));
        agent.setEtat(true);
        return agentRepository.save(agent);
    }

    public Agent deactivateAgent(Long id) {
        Agent agent = agentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Agent non trouvé"));
        agent.setEtat(false);
        return agentRepository.save(agent);
    }
}
