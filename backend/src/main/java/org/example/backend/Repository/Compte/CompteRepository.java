package org.example.backend.Repository.Compte;

import org.example.backend.Model.Compte;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompteRepository extends CrudRepository<Compte, Long> {
}
