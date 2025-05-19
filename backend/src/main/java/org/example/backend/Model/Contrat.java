package org.example.backend.Model;

import org.example.backend.Util.TypeContrat;

import java.util.Date;
import jakarta.persistence.*;


@Entity
@Table(name = "contrat")
public class Contrat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "numero_contrat", nullable = false, unique = true)
    private String numeroContrat;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id", nullable = false)
    private Client client;

    @Column(name = "date_signature", nullable = false)
    private Date dateSignature;

    @Column(name = "date_debut")
    private Date dateDebut;

    @Column(name = "date_fin")
    private Date dateFin;

    @Enumerated(EnumType.STRING)
    @Column(name = "statut", nullable = false)
    private TypeContrat statut;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "compte_id", unique = true)
    private Compte compte;

    @Column(name = "conditions", columnDefinition = "TEXT")
    private String conditions;

    public Contrat() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumeroContrat() {
        return numeroContrat;
    }

    public void setNumeroContrat(String numeroContrat) {
        this.numeroContrat = numeroContrat;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Date getDateSignature() {
        return dateSignature;
    }

    public void setDateSignature(Date dateSignature) {
        this.dateSignature = dateSignature;
    }

    public Date getDateDebut() {
        return dateDebut;
    }

    public void setDateDebut(Date dateDebut) {
        this.dateDebut = dateDebut;
    }

    public Date getDateFin() {
        return dateFin;
    }

    public void setDateFin(Date dateFin) {
        this.dateFin = dateFin;
    }

    public TypeContrat getStatut() {
        return statut;
    }

    public void setStatut(TypeContrat statut) {
        this.statut = statut;
    }

    public Compte getCompte() {
        return compte;
    }

    public void setCompte(Compte compte) {
        this.compte = compte;
    }

    public String getConditions() {
        return conditions;
    }

    public void setConditions(String conditions) {
        this.conditions = conditions;
    }
}

