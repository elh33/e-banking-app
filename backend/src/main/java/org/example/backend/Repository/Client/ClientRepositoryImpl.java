package org.example.backend.Repository.Client;


import org.example.backend.Model.Client;
import org.example.backend.Repository.Client.ClientRepository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

public class ClientRepositoryImpl implements ClientRepository {

    @PersistenceContext
    private EntityManager em;

    @Override
    @Transactional
    public void save(Client client) {
        em.persist(client);
    }

    @Override
    public Client findById(Long id) {
        return em.find(Client.class, id);
    }

    @Override
    public List<Client> findAll() {
        return em.createQuery("SELECT c FROM Client c", Client.class).getResultList();
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Client client = em.find(Client.class, id);
        if (client != null) {
            em.remove(client);
        }
    }
}
