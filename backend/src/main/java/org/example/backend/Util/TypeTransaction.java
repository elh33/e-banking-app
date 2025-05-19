package org.example.backend.Util;

public enum TypeTransaction {
    VIREMENT,       // Transfert d'argent vers un autre compte
    RETRAIT,        // Retrait d'argent (guichet, distributeur)
    DEPOT,          // Dépôt d'argent (espèces, chèque)
    PAIEMENT,       // Paiement par carte, mobile, etc.
    TRANSFERT,      // Transfert interne entre comptes du même client
    FRAIS,          // Frais bancaires appliqués
    INTERET,        // Crédit d’intérêt sur compte épargne
    ANNULATION      // Annulation / remboursement
}

