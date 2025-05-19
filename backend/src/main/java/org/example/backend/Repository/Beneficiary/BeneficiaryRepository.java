package org.example.backend.Repository.Beneficiary;

import org.example.backend.Model.Beneficiary;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BeneficiaryRepository extends JpaRepository<Beneficiary, Long> {
}