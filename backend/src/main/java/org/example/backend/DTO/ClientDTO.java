package org.example.backend.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.example.backend.Model.Client;

import java.time.LocalDate;

public class ClientDTO {
    private Long id;
    private String nom;
    private String prenom;
    private String email;
    private String telephone;
    private String adresse;
    private String profession;
    private String cin;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateCreation;
    private boolean etat;

    public ClientDTO() {
    }
    // ✅ Constructeur à partir de l'entité Client
    public ClientDTO(Client client) {
        this.id = client.getId();
        this.nom = client.getNom();
        this.prenom = client.getPrenom();
        this.email = client.getEmail();
        this.telephone = client.getTelephone();
        this.cin = client.getCin();
        this.etat = client.isEtat();
    }

    public ClientDTO(Long id, String nom, String prenom, String email, String telephone, String adresse, String profession, String cin, LocalDate dateCreation, boolean etat) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.telephone = telephone;
        this.adresse = adresse;
        this.profession = profession;
        this.cin = cin;
        this.dateCreation = dateCreation;
        this.etat = etat;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getProfession() {
        return profession;
    }

    public void setProfession(String profession) {
        this.profession = profession;
    }

    public String getCin() {
        return cin;
    }

    public void setCin(String cin) {
        this.cin = cin;
    }

    public LocalDate getDateCreation() {
        return dateCreation;
    }

    public void setDateCreation(LocalDate dateCreation) {
        this.dateCreation = dateCreation;
    }

    public boolean isEtat() {
        return etat;
    }

    public void setEtat(boolean etat) {
        this.etat = etat;
    }
}
