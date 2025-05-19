package org.example.backend.Model;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "users")
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nom;

    @Column(nullable = false)
    private String prenom;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String telephone;

    @Column(nullable = false)
    private String motDePasse;

    @Column(nullable = false)
    private String role; // CLIENT, AGENT, ADMIN

    @Column(nullable = false)
    private LocalDate dateCreation;

    @Column(nullable = false)
    private boolean etat; // true = actif, false = inactif

    // --- Constructeurs ---
    public User() {
        this.dateCreation = LocalDate.now();
        this.etat = true;
    }

    public User(String nom, String prenom, String email, String telephone, String motDePasse, String role) {
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.telephone = telephone;
        this.motDePasse = motDePasse;
        this.role = role;
        this.dateCreation = LocalDate.now();
        this.etat = true;
    }

    // --- Getters & Setters ---

    public Long getId() { return id; }

    public String getNom() { return nom; }

    public void setNom(String nom) { this.nom = nom; }

    public String getPrenom() { return prenom; }

    public void setPrenom(String prenom) { this.prenom = prenom; }

    public String getEmail() { return email; }

    public void setEmail(String email) { this.email = email; }

    public String getTelephone() { return telephone; }

    public void setTelephone(String telephone) { this.telephone = telephone; }

    public String getMotDePasse() { return motDePasse; }

    public void setMotDePasse(String motDePasse) { this.motDePasse = motDePasse; }

    public String getRole() { return role; }

    public void setRole(String role) { this.role = role; }

    public LocalDate getDateCreation() { return dateCreation; }

    public void setDateCreation(LocalDate dateCreation) { this.dateCreation = dateCreation; }

    public boolean isEtat() { return etat; }

    public void setEtat(boolean etat) { this.etat = etat; }
}
