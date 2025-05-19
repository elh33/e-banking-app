import org.example.backend.Model.Admin;
import jakarta.persistence.*;

public class AdminTest {
    public static void main(String[] args) {

        EntityManagerFactory emf = Persistence.createEntityManagerFactory("TestPersistence");
        EntityManager em = emf.createEntityManager();

        em.getTransaction().begin();

        Admin admin = new Admin();
        admin.setNom("Leila");
        admin.setPrenom("Omar");
        admin.setEmail("leila.omar@bank.com");
        admin.setTelephone("0654321987");
        admin.setMotDePasse("securePass123");

        em.persist(admin);
        em.getTransaction().commit();

        System.out.println("Admin inséré avec ID : " + admin.getId());

        em.close();
        emf.close();
    }
}
