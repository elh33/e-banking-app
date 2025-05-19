package org.example.backend.Repository.Client;
import org.example.backend.Model.Client;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends CrudRepository<Client, Long> {
    Client findByEmail(String email);
    Client findByCin(String cin);

}
