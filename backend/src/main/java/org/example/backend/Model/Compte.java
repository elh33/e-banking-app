package org.example.backend.Model;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "comptes")
public class Compte {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "type", nullable = false)
    private String type;

    @Column(name = "solde", nullable = false)
    private BigDecimal solde;

    @Column(name = "devise", nullable = false)
    private String devise;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id", nullable = false)
    private Client client;

    // --- Constructeurs ---
    public Compte() {
    }

    public Compte(String type, BigDecimal solde, String devise, Client client) {
        this.type = type;
        this.solde = solde;
        this.devise = devise;
        this.client = client;
    }

    // --- Getters & Setters ---
    public Long getId() {
        return id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public BigDecimal getSolde() {
        return solde;
    }

    public void setSolde(BigDecimal solde) {
        this.solde = solde;
    }

    public String getDevise() {
        return devise;
    }

    public void setDevise(String devise) {
        this.devise = devise;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    // --- toString (optionnel) ---
    @Override
    public String toString() {
        return "Compte{" +
                "id=" + id +
                ", type='" + type + '\'' +
                ", solde=" + solde +
                ", devise='" + devise + '\'' +
                ", client=" + (client != null ? client.getId() : null) +
                '}';
    }
}
