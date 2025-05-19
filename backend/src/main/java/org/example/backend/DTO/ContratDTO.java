package org.example.backend.DTO;

import org.example.backend.Model.Client;
import org.example.backend.Util.TypeContrat;

import java.util.Date;
import java.util.Optional;

public class ContratDTO {
    private Long id;
    private String numeroContrat;
    private ClientDTO client;
    private CompteDTO compte;
    private Date dateSignature;
    private Date dateDebut;
    private Date dateFin;
    private TypeContrat statut;
    private String conditions;

    public ContratDTO(Long id, String numeroContrat, ClientDTO client, CompteDTO compte, Date dateSignature, Date dateDebut, Date dateFin, TypeContrat statut, String conditions) {
        this.id = id;
        this.numeroContrat = numeroContrat;
        this.client = client;
        this.compte = compte;
        this.dateSignature = dateSignature;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.statut = statut;
        this.conditions = conditions;
    }

    public ContratDTO() {
    }

    public ContratDTO(Long id, String numeroContrat, Optional<Client> clientById, CompteDTO compte, Date dateSignature, Date dateDebut, Date dateFin, TypeContrat statut, String conditions) {
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

    public ClientDTO getClient() {
        return client;
    }

    public void setClient(ClientDTO client) {
        this.client = client;
    }

    public CompteDTO getCompte() {
        return compte;
    }

    public void setCompte(CompteDTO compte) {
        this.compte = compte;
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

    public String getConditions() {
        return conditions;
    }

    public void setConditions(String conditions) {
        this.conditions = conditions;
    }
}
