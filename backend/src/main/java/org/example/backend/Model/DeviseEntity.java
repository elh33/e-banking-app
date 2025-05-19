package org.example.backend.Model;

import jakarta.persistence.*;

@Entity
public class DeviseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private org.example.backend.Util.Devise code;

    private double tauxChange; // par rapport à MAD

    private boolean active;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public org.example.backend.Util.Devise getCode() {
        return code;
    }

    public void setCode(org.example.backend.Util.Devise code) {
        this.code = code;
    }

    public double getTauxChange() {
        return tauxChange;
    }

    public void setTauxChange(double tauxChange) {
        this.tauxChange = tauxChange;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}
