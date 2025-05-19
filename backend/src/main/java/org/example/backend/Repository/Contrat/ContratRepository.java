package org.example.backend.Repository.Contrat;

import org.example.backend.Model.Contrat;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContratRepository extends CrudRepository<Contrat, Long> {
}
