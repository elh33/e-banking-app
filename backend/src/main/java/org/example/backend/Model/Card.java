package org.example.backend.Model;

import jakarta.persistence.*;
import org.example.backend.Util.*;

import java.time.LocalDate;

@Entity
@Table(name = "cards")
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String numeroCarte;

    private TypeCard typeCarte;

    private LocalDate dateExpiration;

    private StatutCard statut;

    private Integer limitePaiement;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "compte_id", unique = true)
    private Compte compte;


    public Card() {
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

    public StatutCard getStatut() {
        return statut;
    }

    public void setStatut(StatutCard statut) {
        this.statut = statut;
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

    public Compte getCompte() {
        return compte;
    }

    public void setCompte(Compte compte) {
        this.compte = compte;
    }
}
