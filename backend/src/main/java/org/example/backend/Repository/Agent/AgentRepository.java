package org.example.backend.Repository.Agent;
import org.example.backend.Model.Agent;

import java.util.List;

public interface AgentRepository {
    void save(Agent agent);
    Agent findById(Long id);
    List<Agent> findAll();
    void delete(Long id);
}

