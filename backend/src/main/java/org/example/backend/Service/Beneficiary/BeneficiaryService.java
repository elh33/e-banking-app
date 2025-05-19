package org.example.backend.Service.Beneficiary;

import org.example.backend.DTO.BeneficiaryDTO;
import org.example.backend.Model.Beneficiary;
import org.example.backend.Repository.Beneficiary.BeneficiaryRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BeneficiaryService {
    private final BeneficiaryRepository beneficiaryRepository;

    public BeneficiaryService(BeneficiaryRepository beneficiaryRepository) {
        this.beneficiaryRepository = beneficiaryRepository;
    }

    public List<BeneficiaryDTO> getAllBeneficiaries() {
        return beneficiaryRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public void addBeneficiary(BeneficiaryDTO beneficiaryDTO) {
        Beneficiary beneficiary = convertToEntity(beneficiaryDTO);
        beneficiaryRepository.save(beneficiary);
    }

    public void deleteBeneficiary(Long id) {
        beneficiaryRepository.deleteById(id);
    }

    private BeneficiaryDTO convertToDTO(Beneficiary beneficiary) {
        return new BeneficiaryDTO(
                beneficiary.getId(),
                beneficiary.getName(),
                beneficiary.getAccountNumber(),
                beneficiary.getBankName(),
                beneficiary.isFavorite()
        );
    }

    private Beneficiary convertToEntity(BeneficiaryDTO beneficiaryDTO) {
        return new Beneficiary(
                beneficiaryDTO.getId(),
                beneficiaryDTO.getName(),
                beneficiaryDTO.getAccountNumber(),
                beneficiaryDTO.getBankName(),
                beneficiaryDTO.isFavorite()
        );
    }

    public void updateBeneficiary(Long id, BeneficiaryDTO beneficiaryDTO) {
        Optional<Beneficiary> optionalBeneficiary = beneficiaryRepository.findById(id);
        if (optionalBeneficiary.isPresent()) {
            Beneficiary beneficiary = optionalBeneficiary.get();
            beneficiary.setName(beneficiaryDTO.getName());
            beneficiary.setAccountNumber(beneficiaryDTO.getAccountNumber());
            beneficiary.setBankName(beneficiaryDTO.getBankName());
            beneficiary.setFavorite(beneficiaryDTO.isFavorite());
            beneficiaryRepository.save(beneficiary);
        } else {
            throw new IllegalArgumentException("Beneficiary with ID " + id + " not found.");
        }
    }
}