package org.example.backend.Model;

import org.example.backend.Util.*;

import java.util.Date;

import jakarta.persistence.*;

@Entity
@Table(name = "transaction")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "reference", nullable = false, unique = true)
    private String reference;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private TypeTransaction type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "compte_source_id", nullable = false)
    private Compte compteSource;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "compte_destination_id")
    private Compte compteDestination;

    @Column(name = "montant", nullable = false)
    private double montant;

    @Enumerated(EnumType.STRING)
    @Column(name = "devise", nullable = false)
    private Devise devise;

    @Column(name = "frais")
    private double frais;

    @Column(name = "date", nullable = false)
    private Date date;

    @Enumerated(EnumType.STRING)
    @Column(name = "statut", nullable = false)
    private StatutTransaction statut;

    public Transaction() {
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

    public Compte getCompteSource() {
        return compteSource;
    }

    public void setCompteSource(Compte compteSource) {
        this.compteSource = compteSource;
    }

    public Compte getCompteDestination() {
        return compteDestination;
    }

    public void setCompteDestination(Compte compteDestination) {
        this.compteDestination = compteDestination;
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