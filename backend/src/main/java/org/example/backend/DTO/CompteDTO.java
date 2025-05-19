
package org.example.backend.DTO;

import org.example.backend.Util.*;

import java.util.Date;

public class CompteDTO {
    private Long id;
    private String numeroCompte;
    private String rib;
    private double solde;
    private double plafond;
    private Date dateCreation;
    private TypeCompte typeCompte;
    private String iban;
    private Devise devise;
    private StatutCompte statut;

    public CompteDTO() {
    }

    public CompteDTO(Long id, String numeroCompte, String rib, double solde, double plafond, Date dateCreation, TypeCompte typeCompte, String iban, Devise devise, StatutCompte statut) {
        this.id = id;
        this.numeroCompte = numeroCompte;
        this.rib = rib;
        this.solde = solde;
        this.plafond = plafond;
        this.dateCreation = dateCreation;
        this.typeCompte = typeCompte;
        this.iban = iban;
        this.devise = devise;
        this.statut = statut;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumeroCompte() {
        return numeroCompte;
    }

    public void setNumeroCompte(String numeroCompte) {
        this.numeroCompte = numeroCompte;
    }

    public String getRib() {
        return rib;
    }

    public void setRib(String rib) {
        this.rib = rib;
    }

    public double getSolde() {
        return solde;
    }

    public void setSolde(double solde) {
        this.solde = solde;
    }

    public double getPlafond() {
        return plafond;
    }

    public void setPlafond(double plafond) {
        this.plafond = plafond;
    }

    public Date getDateCreation() {
        return dateCreation;
    }

    public void setDateCreation(Date dateCreation) {
        this.dateCreation = dateCreation;
    }

    public TypeCompte getTypeCompte() {
        return typeCompte;
    }

    public void setTypeCompte(TypeCompte typeCompte) {
        this.typeCompte = typeCompte;
    }

    public String getIban() {
        return iban;
    }

    public void setIban(String iban) {
        this.iban = iban;
    }

    public Devise getDevise() {
        return devise;
    }

    public void setDevise(Devise devise) {
        this.devise = devise;
    }

    public StatutCompte getStatut() {
        return statut;
    }

    public void setStatut(StatutCompte statut) {
        this.statut = statut;
    }
}
