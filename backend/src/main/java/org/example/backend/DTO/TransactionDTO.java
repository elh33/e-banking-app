package org.example.backend.DTO;

import org.example.backend.Util.*;

import java.util.Date;

public class TransactionDTO {
    private Long id;
    private String reference;
    private TypeTransaction type;
    private CompteDTO compteSource;
    private CompteDTO compteDestination;
    private double montant;
    private Devise devise;
    private double frais;
    private Date date;
    private StatutTransaction statut;

    public TransactionDTO(Long id, String reference, TypeTransaction type, CompteDTO compteSource, CompteDTO compteDestination, double montant, Devise devise, double frais, Date date, StatutTransaction statut) {
        this.id = id;
        this.reference = reference;
        this.type = type;
        this.compteSource = compteSource;
        this.compteDestination = compteDestination;
        this.montant = montant;
        this.devise = devise;
        this.frais = frais;
        this.date = date;
        this.statut = statut;
    }

    public TransactionDTO() {
    }

    public double getMontant() {
        return montant;
    }

    public void setMontant(double montant) {
        this.montant = montant;
    }

    public Devise getDevise() {
        return devise;
    }

    public void setDevise(Devise devise) {
        this.devise = devise;
    }

    public double getFrais() {
        return frais;
    }

    public void setFrais(double frais) {
        this.frais = frais;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public TypeTransaction getType() {
        return type;
    }

    public void setType(TypeTransaction type) {
        this.type = type;
    }

    public CompteDTO getCompteSource() {
        return compteSource;
    }

    public void setCompteSource(CompteDTO compteSource) {
        this.compteSource = compteSource;
    }

    public CompteDTO getCompteDestination() {
        return compteDestination;
    }

    public void setCompteDestination(CompteDTO compteDestination) {
        this.compteDestination = compteDestination;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public StatutTransaction getStatut() {
        return statut;
    }

    public void setStatut(StatutTransaction statut) {
        this.statut = statut;
    }
}