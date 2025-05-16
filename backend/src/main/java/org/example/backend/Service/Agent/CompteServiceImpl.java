package org.example.backend.Service.Agent;


import org.example.backend.Model.Compte;
import org.example.backend.Repository.Agent.CompteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompteServiceImpl implements CompteService {

    private final CompteRepository compteRepository;

    @Autowired
    public CompteServiceImpl(CompteRepository compteRepository) {
        this.compteRepository = compteRepository;
    }

    @Override
    public void ajouterCompte(Compte compte) {
        compteRepository.save(compte);
    }

    @Override
    public Compte getCompte(Long id) {
        return compteRepository.findById(id);
    }

    @Override
    public List<Compte> listerComptes() {
        return compteRepository.findAll();
    }

    @Override
    public void supprimerCompte(Long id) {
        compteRepository.delete(id);
    }
}

