package org.example.backend.Controller.Agent;

import org.example.backend.DTO.AgentDTO;
import org.example.backend.Model.Agent;
import org.example.backend.Service.Agent.AgentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/agent")
public class AgentController {

    private final AgentService agentService;

    public AgentController(AgentService agentService) {
        this.agentService = agentService;
    }

    // ✅ Obtenir tous les agents
    @GetMapping("/all")
    public Iterable<Agent> getAllAgents() {
        return agentService.getAllAgents();
    }

    // ➕ Ajouter un agent
    @PostMapping("/add")
    public ResponseEntity<String> addAgent(@RequestBody Agent agent) {
        agentService.createAgent(agent);
        return ResponseEntity.ok("Agent ajouté avec succès");
    }

    // 🔁 Mettre à jour un agent
    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateAgent(@PathVariable Long id, @RequestBody Agent agent) {
        agentService.updateAgent(id, agent);
        return ResponseEntity.ok("Agent modifié avec succès");
    }

    // ❌ Supprimer un agent
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteAgent(@PathVariable Long id) {
        agentService.deleteAgent(id);
        return ResponseEntity.ok("Agent supprimé avec succès");
    }

    // 🔓 Activer un agent
    @PutMapping("/activate/{id}")
    public ResponseEntity<String> activateAgent(@PathVariable Long id) {
        agentService.activateAgent(id);
        return ResponseEntity.ok("Agent activé avec succès");
    }

    // 🔒 Désactiver un agent
    @PutMapping("/deactivate/{id}")
    public ResponseEntity<String> deactivateAgent(@PathVariable Long id) {
        agentService.deactivateAgent(id);
        return ResponseEntity.ok("Agent désactivé avec succès");
    }

    // 🔍 Obtenir un agent par ID
    @GetMapping("/{id}")
    public ResponseEntity<AgentDTO> getAgentById(@PathVariable Long id) {
        return agentService.getAgentById(id)
                .map(agent -> ResponseEntity.ok(new AgentDTO(agent)))
                .orElse(ResponseEntity.notFound().build());
    }
}
