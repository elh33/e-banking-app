package org.example.backend.Controller.Contrat;

import org.example.backend.DTO.ContratDTO;
import org.example.backend.Model.Contrat;
import org.example.backend.Service.Contrat.ContratService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contrat")
public class ContratController {
    private final ContratService contratService;

    public ContratController(ContratService contratService) {
        this.contratService = contratService;
    }

    @GetMapping("/all")
    public List<ContratDTO> getAllContrats() {
        return contratService.getAllContrats();
    }

    @PostMapping("/add")
    public ResponseEntity<String> addContrat(@RequestBody Contrat contrat) {
        contratService.addContrat(contrat);
        return ResponseEntity.ok("Contrat ajouté avec succès");
    }

    @PostMapping("/update")
    public ResponseEntity<String> updateContrat(@RequestBody Contrat contrat) {
        contratService.addContrat(contrat);
        return ResponseEntity.ok("Contrat modifié avec succès");
    }

    @PostMapping("/delete")
    public ResponseEntity<String> deleteContrat(@RequestBody Long id) {
        contratService.deleteContrat(id);
        return ResponseEntity.ok("Contrat supprimé avec succès");
    }
}
