package org.example.backend.Util;

public enum StatutCard {
    ACTIVE,         // Carte active et utilisable
    BLOCKED,        // Carte bloquée (vol, fraude, etc.)
    EXPIRED,        // Carte expirée
    CANCELLED,      // Carte annulée par la banque ou le client
    PENDING         // Carte en cours d’émission ou activation
}
