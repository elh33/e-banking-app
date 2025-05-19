package org.example.backend.Service.Admin;


import org.example.backend.Model.Admin;
import org.example.backend.Repository.Admin.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public Iterable<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    public Optional<Admin> getAdminById(Long id) {
        return adminRepository.findById(id);
    }

    public Admin createAdmin(Admin admin) {
        admin.setRole("ADMIN");
        admin.setEtat(true); // actif par défaut
        return adminRepository.save(admin);
    }

    public Admin updateAdmin(Long id, Admin adminDetails) {
        Admin admin = adminRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Admin non trouvé"));

        admin.setNom(adminDetails.getNom());
        admin.setPrenom(adminDetails.getPrenom());
        admin.setEmail(adminDetails.getEmail());
        admin.setTelephone(adminDetails.getTelephone());
        admin.setMotDePasse(adminDetails.getMotDePasse());
        // Pas de modification du rôle ni de la date de création ici

        return adminRepository.save(admin);
    }

    public void deleteAdmin(Long id) {
        adminRepository.deleteById(id);
    }

    public Admin activateAdmin(Long id) {
        Admin admin = adminRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Admin non trouvé"));
        admin.setEtat(true);
        return adminRepository.save(admin);
    }

    public Admin deactivateAdmin(Long id) {
        Admin admin = adminRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Admin non trouvé"));
        admin.setEtat(false);
        return adminRepository.save(admin);
    }
}

