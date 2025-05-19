package org.example.backend.Repository.Agent;


import org.example.backend.Model.Compte;

import java.util.List;

public interface CompteRepository {
    void save(Compte compte);
    Compte findById(Long id);
    List<Compte> findAll();
    void delete(Long id);
}
