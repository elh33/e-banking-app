package org.example.backend.Controller.Client;

import org.example.backend.DTO.ClientDTO;
import org.example.backend.Model.Client;
import org.example.backend.Service.Client.ClientService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/client")
public class ClientController {

    private final ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    // ✅ Obtenir tous les clients
    @GetMapping("/all")
    public List<ClientDTO> getAllClients() {
        return clientService.getAllClients();
    }

    // 🔍 Obtenir un client par ID
    @GetMapping("/{id}")
    public ResponseEntity<ClientDTO> getClientById(@PathVariable Long id) {
        return clientService.getClientById(id)
                .map(client -> ResponseEntity.ok(new ClientDTO(client)))
                .orElse(ResponseEntity.notFound().build());
    }

    // ➕ Ajouter un client
    @PostMapping("/add")
    public ResponseEntity<String> createClient(@RequestBody Client client) {
        clientService.createClient(client);
        return ResponseEntity.ok("Client ajouté avec succès");
    }

    // 🔁 Mettre à jour un client
    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateClient(@PathVariable Long id, @RequestBody Client client) {
        clientService.updateClient(id, client);
        return ResponseEntity.ok("Client modifié avec succès");
    }

    // ❌ Supprimer un client
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteClient(@PathVariable Long id) {
        clientService.deleteClient(id);
        return ResponseEntity.ok("Client supprimé avec succès");
    }

    // 🔓 Activer un client
    @PutMapping("/activate/{id}")
    public ResponseEntity<String> activateClient(@PathVariable Long id) {
        clientService.activateClient(id);
        return ResponseEntity.ok("Client activé avec succès");
    }

    // 🔒 Désactiver un client
    @PutMapping("/deactivate/{id}")
    public ResponseEntity<String> deactivateClient(@PathVariable Long id) {
        clientService.deactivateClient(id);
        return ResponseEntity.ok("Client désactivé avec succès");
    }
}
