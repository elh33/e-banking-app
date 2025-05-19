package org.example.backend.Controller.Agent;


import org.example.backend.Model.Compte;
import org.example.backend.Service.Agent.CompteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/comptes")
public class CompteController {

    @Autowired
    private CompteService compteService;

    @PostMapping("/ajouter")
    public Compte ajouterCompte(@RequestBody Compte compte) {
        compteService.ajouterCompte(compte);
        return compte;
    }

    @GetMapping("/{id}")
    public Compte getCompte(@PathVariable Long id) {
        return compteService.getCompte(id);
    }

    @GetMapping("/liste")
    public List<Compte> listerComptes() {
        return compteService.listerComptes();
    }

    @DeleteMapping("/supprimer/{id}")
    public ResponseEntity<?> supprimer(@PathVariable Long id) {
        compteService.supprimerCompte(id);
        return ResponseEntity.ok().body(Map.of("message", "Compte supprimé"));
    }
}
