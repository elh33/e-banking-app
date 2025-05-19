package org.example.backend.Service.Compte;

import org.example.backend.DTO.CompteDTO;
import org.example.backend.Model.Compte;
import org.example.backend.Repository.Compte.CompteRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CompteService {

    private final CompteRepository compteRepository;

    public CompteService(CompteRepository compteRepository) {
        this.compteRepository = compteRepository;
    }

    public void addCompte(Compte compte) {
        compteRepository.save(compte);
    }

    public CompteDTO getCompte(Long id) {
        Compte compte = compteRepository.findById(id).orElse(null);
        if (compte == null) return null;
        return new CompteDTO(compte.getId(),compte.getNumeroCompte(),compte.getRIB(),compte.getSolde(),compte.getPlafond(),compte.getDateCreation(),compte.getTypeCompte(),compte.getIBAN(),compte.getDevise(),compte.getStatut());
    }

    public List<CompteDTO> getAllComptes() {
        List<Compte> comptes = (List<Compte>) compteRepository.findAll();
        List<CompteDTO> compteDTOS = new ArrayList<>();
        for(Compte compte : comptes){
            compteDTOS.add(getCompte(compte.getId()));
        }
        return compteDTOS;
    }

    public void deleteCompte(Long id) {
        compteRepository.delete(compteRepository.findById(id).orElse(null));
    }
}