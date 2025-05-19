package org.example.backend.Model;
import jakarta.persistence.*;

@Entity
@Table(name = "admin")
public class Admin extends User {
    public Admin() {
        super();
        this.setRole("ADMIN");
    }
}
