package org.example.backend.Repository.Agent;
import org.example.backend.Model.Agent;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface AgentRepository extends CrudRepository<Agent, Long> {
    Agent findByEmail(String email);

}

