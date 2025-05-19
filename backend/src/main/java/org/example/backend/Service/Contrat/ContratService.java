package org.example.backend.Service.Contrat;
import org.example.backend.DTO.ContratDTO;
import org.example.backend.Model.Contrat;
import org.example.backend.Repository.Contrat.ContratRepository;
import org.example.backend.Service.Client.ClientService;
import org.example.backend.Service.Compte.CompteService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ContratService {
    private final ContratRepository contratRepository;
    private final CompteService compteService;
    private final ClientService clientService;

    public ContratService(ContratRepository contratRepository, CompteService compteService, ClientService clientService) {
        this.contratRepository = contratRepository;
        this.compteService = compteService;
        this.clientService = clientService;
    }

    public void addContrat(Contrat contrat) {
        contratRepository.save(contrat);
    }

    public ContratDTO getContrat(Long id) {
        Contrat contrat = contratRepository.findById(id).orElse(null);
        if (contrat == null) return null;
        return new ContratDTO(contrat.getId(),contrat.getNumeroContrat(),clientService.getClientById(contrat.getClient().getId()),compteService.getCompte(contrat.getCompte().getId()),contrat.getDateSignature(),contrat.getDateDebut(),contrat.getDateFin(),contrat.getStatut(),contrat.getConditions());
    }

    public List<ContratDTO> getAllContrats() {
        List<Contrat> contrats = (List<Contrat>) contratRepository.findAll();
        List<ContratDTO> contratDTOS = new ArrayList<>();
        for(Contrat contrat : contrats){
            contratDTOS.add(getContrat(contrat.getId()));
        }
        return contratDTOS;
    }

    public void deleteContrat(Long id) {
        contratRepository.delete(contratRepository.findById(id).orElse(null));
    }

}
