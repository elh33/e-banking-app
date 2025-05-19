package org.example.backend.Controller.Compte;

import org.example.backend.DTO.CompteDTO;
import org.example.backend.Model.Compte;
import org.example.backend.Service.Compte.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/compte")
public class CompteController {
    private final CompteService compteService;

    public CompteController(CompteService compteService) {
        this.compteService = compteService;
    }

    @GetMapping("/all")
    public List<CompteDTO> getAllComptes() {
        return compteService.getAllComptes();
    }

    @PostMapping("/add")
    public ResponseEntity<String> addCompte(@RequestBody Compte compte) {
        compteService.addCompte(compte);
        return ResponseEntity.ok("Compte ajouté avec succès");
    }

    @PostMapping("/update")
    public ResponseEntity<String> updateCompte(@RequestBody Compte compte) {
        compteService.addCompte(compte);
        return ResponseEntity.ok("Compte modifié avec succès");
    }

    @PostMapping("/delete")
    public ResponseEntity<String> deleteCompte(@RequestBody Long id) {
        compteService.deleteCompte(id);
        return ResponseEntity.ok("Compte supprimé avec succès");
    }
}
