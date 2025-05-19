package org.example.backend.Repository.Agent;


import org.example.backend.Model.Agent;
import org.example.backend.Repository.Agent.AgentRepository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

public class AgentRepositoryImpl implements AgentRepository {

    @PersistenceContext
    private EntityManager em;

    @Override
    @Transactional
    public void save(Agent agent) {
        em.persist(agent);
    }

    @Override
    public Agent findById(Long id) {
        return em.find(Agent.class, id);
    }

    @Override
    public List<Agent> findAll() {
        return em.createQuery("SELECT a FROM Agent a", Agent.class).getResultList();
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Agent agent = em.find(Agent.class, id);
        if (agent != null) {
            em.remove(agent);
        }
    }
}
