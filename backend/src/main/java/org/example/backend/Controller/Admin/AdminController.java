package org.example.backend.Controller.Admin;


import org.example.backend.Model.Admin;
import org.example.backend.Service.Admin.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    // ✔️ Lister tous les admins
    @GetMapping("/all")
    public Iterable<Admin> getAllAdmins() {
        return adminService.getAllAdmins();
    }

    @GetMapping("/{id}")
    public Admin getAdminById(@PathVariable("id") Long id) {
        return adminService.getAdminById(id)
                .orElseThrow(() -> new RuntimeException("Admin introuvable avec ID : " + id));
    }

    @PutMapping("/update/{id}")
    public Admin updateAdmin(@PathVariable("id") Long id, @RequestBody Admin admin) {
        return adminService.updateAdmin(id, admin);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteAdmin(@PathVariable("id") Long id) {
        adminService.deleteAdmin(id);
    }

    @PutMapping("/activate/{id}")
    public Admin activateAdmin(@PathVariable("id") Long id) {
        return adminService.activateAdmin(id);
    }

    @PutMapping("/deactivate/{id}")
    public Admin deactivateAdmin(@PathVariable("id") Long id) {
        return adminService.deactivateAdmin(id);
    }}
