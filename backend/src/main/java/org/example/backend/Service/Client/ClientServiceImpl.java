package org.example.backend.Service.Client;


import org.example.backend.Model.Client;
import org.example.backend.Repository.Client.ClientRepository;
import org.example.backend.Service.Client.ClientService;

import javax.transaction.Transactional;
import java.util.List;

public class ClientServiceImpl implements ClientService {

    private ClientRepository clientRepository;

    public void setClientRepository(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    @Override
    @Transactional
    public void addClient(Client client) {
        clientRepository.save(client);
    }

    @Override
    public Client getClient(Long id) {
        return clientRepository.findById(id);
    }

    @Override
    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    @Override
    @Transactional
    public void deleteClient(Long id) {
        clientRepository.delete(id);
    }
}

