package org.example.backend.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "clients")
public class Client extends User {

    @Column(name = "profession")
    private String profession;

    @Column(name = "adresse")
    private String adresse;

    @Column(name = "cin", nullable = false, unique = true)
    private String cin;

    // --- Constructeurs ---
    public Client() {
        super();
        this.setRole("CLIENT");
    }

    public Client(String nom, String prenom, String email, String telephone,
                  String motDePasse, String adresse, String profession, String cin) {
        super(nom, prenom, email, telephone, motDePasse, "CLIENT");
        this.adresse = adresse;
        this.profession = profession;
        this.cin = cin;
    }

    // --- Getters / Setters ---
    public String getProfession() { return profession; }
    public void setProfession(String profession) { this.profession = profession; }

    public String getAdresse() { return adresse; }
    public void setAdresse(String adresse) { this.adresse = adresse; }

    public String getCin() { return cin; }
    public void setCin(String cin) { this.cin = cin; }
}
