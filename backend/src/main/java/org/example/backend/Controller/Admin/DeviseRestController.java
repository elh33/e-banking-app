package org.example.backend.Controller.Admin;

import org.example.backend.Model.DeviseEntity;
import org.example.backend.Service.Admin.DeviseService;
import org.example.backend.Util.Devise;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/devise")
public class DeviseRestController {

    private final DeviseService deviseService;

    public DeviseRestController(DeviseService deviseService) {
        this.deviseService = deviseService;
    }

    @PostMapping("/activer")
    public ResponseEntity<?> activer(@RequestParam("code") String code) {
        try {
            Devise deviseCode = Devise.valueOf(code);
            DeviseEntity deviseEntity = deviseService.activerDevise(deviseCode);
            return ResponseEntity.ok(deviseEntity);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erreur : " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> supprimer(@PathVariable("id") Long id) {
        try {
            deviseService.supprimerDevise(id);
            return ResponseEntity.ok("Devise supprimée");
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Erreur : " + e.getMessage());
        }
    }

    @GetMapping("/actives")
    public ResponseEntity<?> actives() {
        return ResponseEntity.ok(deviseService.getDevisesActives());
    }
    @PutMapping("/mettreAJour")
    public ResponseEntity<?> mettreAJour(@RequestParam String code) {
        try {
            Devise devise = Devise.valueOf(code.toUpperCase());
            DeviseEntity updated = deviseService.mettreAJourTaux(devise);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erreur : " + e.getMessage());
        }
    }

}
