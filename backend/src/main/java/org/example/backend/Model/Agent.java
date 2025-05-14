package org.example.backend.Model;

import javax.persistence.*;

@Entity
@Table(name = "agents")
public class Agent extends User {

    @Column(name = "code_agence", nullable = false)
    private String codeAgence;

    // --- Constructeurs ---
    public Agent() {
        super();
        this.setRole("AGENT");
    }

    public Agent(String nom, String prenom, String email, String telephone, String motDePasse, String codeAgence) {
        super(nom, prenom, email, telephone, motDePasse, "AGENT");
        this.codeAgence = codeAgence;
    }

    // --- Getter & Setter ---
    public String getCodeAgence() {
        return codeAgence;
    }

    public void setCodeAgence(String codeAgence) {
        this.codeAgence = codeAgence;
    }

    // --- toString (optionnel) ---
    @Override
    public String toString() {
        return "Agent{" +
                "id=" + getId() +
                ", nom='" + getNom() + '\'' +
                ", prenom='" + getPrenom() + '\'' +
                ", email='" + getEmail() + '\'' +
                ", codeAgence='" + codeAgence + '\'' +
                '}';
    }
}

