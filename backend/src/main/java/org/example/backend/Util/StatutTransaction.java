package org.example.backend.Util;

public enum StatutTransaction {
    EN_ATTENTE,     // Transaction en cours de traitement
    VALIDEE,        // Transaction validée avec succès
    ECHOUÉE,        // Transaction refusée ou échouée
    ANNULEE         // Transaction annulée par l'utilisateur ou la banque
}

