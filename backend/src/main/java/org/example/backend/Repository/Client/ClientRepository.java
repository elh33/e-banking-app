package org.example.backend.Repository.Client;


import org.example.backend.Model.Client;

import java.util.List;

public interface ClientRepository {
    void save(Client client);
    Client findById(Long id);
    List<Client> findAll();
    void delete(Long id);
}

