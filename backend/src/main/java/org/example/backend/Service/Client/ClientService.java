package org.example.backend.Service.Client;


import org.example.backend.Model.Client;

import java.util.List;

public interface ClientService {
    void addClient(Client client);
    Client getClient(Long id);
    List<Client> getAllClients();
    void deleteClient(Long id);
}
