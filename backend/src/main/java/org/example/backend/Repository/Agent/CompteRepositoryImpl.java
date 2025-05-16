package org.example.backend.Repository.Agent;


import org.example.backend.Model.Compte;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class CompteRepositoryImpl implements CompteRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public void save(Compte compte) {
        entityManager.persist(compte);
    }

    @Override
    public Compte findById(Long id) {
        return entityManager.find(Compte.class, id);
    }

    @Override
    public List<Compte> findAll() {
        return entityManager.createQuery("SELECT c FROM Compte c", Compte.class).getResultList();
    }

    @Override
    public void delete(Long id) {
        Compte compte = findById(id);
        if (compte != null) {
            entityManager.remove(compte);
        }
    }
}

