package org.example.backend.Controller.Beneficiary;

import org.example.backend.DTO.BeneficiaryDTO;
import org.example.backend.Service.Beneficiary.BeneficiaryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/beneficiary")
public class BeneficiaryController {
    private final BeneficiaryService beneficiaryService;

    public BeneficiaryController(BeneficiaryService beneficiaryService) {
        this.beneficiaryService = beneficiaryService;
    }

    @GetMapping("/all")
    public List<BeneficiaryDTO> getAllBeneficiaries() {
        return beneficiaryService.getAllBeneficiaries();
    }

    @PostMapping("/add")
    public ResponseEntity<String> addBeneficiary(@RequestBody BeneficiaryDTO beneficiaryDTO) {
        beneficiaryService.addBeneficiary(beneficiaryDTO);
        return ResponseEntity.ok("Beneficiary added successfully");
    }
    @PostMapping("/update")
    public ResponseEntity<String> updateBeneficiary(@RequestParam Long id, @RequestBody BeneficiaryDTO beneficiaryDTO) {
        try {
            beneficiaryService.updateBeneficiary(id, beneficiaryDTO);
            return ResponseEntity.ok("Beneficiary updated successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/delete")
    public ResponseEntity<String> deleteBeneficiary(@RequestBody Long id) {
        beneficiaryService.deleteBeneficiary(id);
        return ResponseEntity.ok("Beneficiary deleted successfully");
    }
}