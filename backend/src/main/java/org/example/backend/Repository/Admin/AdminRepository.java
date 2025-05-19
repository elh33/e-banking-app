package org.example.backend.Repository.Admin;

import org.example.backend.Model.*;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

public interface AdminRepository extends CrudRepository<Admin, Long> {
    Admin findByEmail(String email);
}
