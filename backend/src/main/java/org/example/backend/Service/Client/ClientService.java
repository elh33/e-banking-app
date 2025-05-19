package org.example.backend.Service.Client;

import org.example.backend.DTO.ClientDTO;
import org.example.backend.Model.Client;
import org.example.backend.Repository.Client.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    public List<ClientDTO> getAllClients() {
        return ((List<Client>) clientRepository.findAll())
                .stream()
                .map(ClientDTO::new)
                .collect(Collectors.toList());
    }

    public Optional<Client> getClientById(Long id) {
        return clientRepository.findById(id);
    }

    public Client createClient(Client client) {
        client.setRole("CLIENT");
        client.setEtat(true);
        return clientRepository.save(client);
    }

    public Client updateClient(Long id, Client clientDetails) {
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Client non trouvé"));

        client.setNom(clientDetails.getNom());
        client.setPrenom(clientDetails.getPrenom());
        client.setEmail(clientDetails.getEmail());
        client.setTelephone(clientDetails.getTelephone());
        client.setMotDePasse(clientDetails.getMotDePasse());

        return clientRepository.save(client);
    }

    public void deleteClient(Long id) {
        clientRepository.deleteById(id);
    }

    public Client activateClient(Long id) {
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Client non trouvé"));
        client.setEtat(true);
        return clientRepository.save(client);
    }

    public Client deactivateClient(Long id) {
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Client non trouvé"));
        client.setEtat(false);
        return clientRepository.save(client);
    }
}
