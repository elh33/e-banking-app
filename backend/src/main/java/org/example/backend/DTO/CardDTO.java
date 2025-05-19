package org.example.backend.DTO;

import org.example.backend.Util.*;

import java.time.LocalDate;

public class CardDTO {
    private Long id;

    private String numeroCarte;

    private TypeCard typeCarte;

    private LocalDate dateExpiration;

    private StatutCard statut;

    private Integer limitePaiement;

    private CompteDTO compte;

    public CardDTO() {
    }

    public CardDTO(Long id, String numeroCarte, TypeCard typeCarte, LocalDate dateExpiration, StatutCard statut, Integer limitePaiement, CompteDTO compte) {
        this.id = id;
        this.numeroCarte = numeroCarte;
        this.typeCarte = typeCarte;
        this.dateExpiration = dateExpiration;
        this.statut = statut;
        this.limitePaiement = limitePaiement;
        this.compte = compte;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumeroCarte() {
        return numeroCarte;
    }

    public void setNumeroCarte(String numeroCarte) {
        this.numeroCarte = numeroCarte;
    }

    public TypeCard getTypeCarte() {
        return typeCarte;
    }

    public void setTypeCarte(TypeCard typeCarte) {
        this.typeCarte = typeCarte;
    }

    public LocalDate getDateExpiration() {
        return dateExpiration;
    }

    public void setDateExpiration(LocalDate dateExpiration) {
        this.dateExpiration = dateExpiration;
    }

    public Integer getLimitePaiement() {
        return limitePaiement;
    }

    public void setLimitePaiement(Integer limitePaiement) {
        this.limitePaiement = limitePaiement;
    }

    public StatutCard getStatut() {
        return statut;
    }

    public void setStatut(StatutCard statut) {
        this.statut = statut;
    }

    public CompteDTO getCompte() {
        return compte;
    }

    public void setCompte(CompteDTO compte) {
        this.compte = compte;
    }
}
