package org.example.backend.Service.Agent;


import org.example.backend.Model.Compte;

import java.util.List;

public interface CompteService {
    void ajouterCompte(Compte compte);
    Compte getCompte(Long id);
    List<Compte> listerComptes();
    void supprimerCompte(Long id);
}
