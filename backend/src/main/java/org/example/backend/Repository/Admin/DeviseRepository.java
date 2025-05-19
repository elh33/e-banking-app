package org.example.backend.Repository.Admin;

import java.util.Optional;
import java.util.List;

import org.example.backend.Model.DeviseEntity;
import org.example.backend.Util.Devise;
import org.springframework.data.repository.CrudRepository;

public interface DeviseRepository extends CrudRepository<DeviseEntity, Long> {
    Optional<DeviseEntity> findByCode(Devise code);
    List<DeviseEntity> findByActiveTrue();
}
