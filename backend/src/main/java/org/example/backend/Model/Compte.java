package org.example.backend.Model;
import org.example.backend.Util.*;
import java.util.Date;
import java.util.List;

import jakarta.persistence.*;

@Entity
@Table(name = "compte")
public class Compte {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "numero_compte", nullable = false, unique = true)
    private String numeroCompte;

    @Column(name = "rib", nullable = false, unique = true)
    private String RIB;

    @OneToOne(mappedBy = "compte")
    private Contrat contrat;

    @Column(name = "solde", nullable = false)
    private double solde;

    @Column(name = "plafond")
    private double plafond;

    @Column(name = "date_creation", nullable = false)
    private Date dateCreation;

    @Enumerated(EnumType.STRING)
    @Column(name = "type_compte", nullable = false)
    private TypeCompte typeCompte;


    @Column(name = "iban", unique = true)
    private String IBAN;

    @Enumerated(EnumType.STRING)
    @Column(name = "devise", nullable = false)
    private Devise devise;

    @Enumerated(EnumType.STRING)
    @Column(name = "statut", nullable = false)
    private StatutCompte statut;

    @OneToMany(mappedBy = "compteSource")
    private List<Transaction> transactionsEmises;

    @OneToMany(mappedBy = "compteDestination")
    private List<Transaction> transactionsRecues;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "card_id", unique = true)
    private Card card;


    public Compte() {
        this.dateCreation = new Date();
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

    public String getRIB() {
        return RIB;
    }

    public void setRIB(String RIB) {
        this.RIB = RIB;
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

    public Contrat getContrat() {
        return contrat;
    }

    public void setContrat(Contrat contrat) {
        this.contrat = contrat;
    }

    public String getIBAN() {
        return IBAN;
    }

    public void setIBAN(String IBAN) {
        this.IBAN = IBAN;
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

    public List<Transaction> getTransactionsEmises() {
        return transactionsEmises;
    }

    public void setTransactionsEmises(List<Transaction> transactionsEmises) {
        this.transactionsEmises = transactionsEmises;
    }

    public List<Transaction> getTransactionsRecues() {
        return transactionsRecues;
    }

    public void setTransactionsRecues(List<Transaction> transactionsRecues) {
        this.transactionsRecues = transactionsRecues;
    }

    public Card getCard() {
        return card;
    }

    public void setCard(Card card) {
        this.card = card;
    }
}