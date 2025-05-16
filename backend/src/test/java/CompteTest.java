
import org.example.backend.Model.Client;
import org.example.backend.Model.Compte;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.math.BigDecimal;
import java.time.LocalDate;

public class CompteTest {
    public static void main(String[] args) {

        EntityManagerFactory emf = Persistence.createEntityManagerFactory("default");
        EntityManager em = emf.createEntityManager();

        try {
            em.getTransaction().begin();

            // 1. Créer un nouveau client
            Client nouveauClient = new Client();
            nouveauClient.setNom("Sara");
            nouveauClient.setPrenom("Bennani");
            nouveauClient.setEmail("sara.bennani@bank.com");
            nouveauClient.setTelephone("0611223344");
            nouveauClient.setMotDePasse("securepass");
            nouveauClient.setAdresse("Marrakech");
            nouveauClient.setProfession("Comptable");
            nouveauClient.setCin("ZZ554433");
            nouveauClient.setDateCreation(LocalDate.now());
            nouveauClient.setRole("CLIENT");
            nouveauClient.setEtat(Boolean.parseBoolean("ACTIF"));

            em.persist(nouveauClient);
            System.out.println("✅ Nouveau client inséré avec ID : " + nouveauClient.getId());

            // 2. Créer un compte associé à ce client
            Compte nouveauCompte = new Compte(
                    "EPARGNE",
                    new BigDecimal("20000.00"),
                    "MAD",
                    nouveauClient
            );

            em.persist(nouveauCompte);

            em.getTransaction().commit();

            System.out.println("✅ Compte inséré avec ID : " + nouveauCompte.getId());
            System.out.println("🔗 Client lié au compte : " + nouveauCompte.getClient().getNom());

        } catch (Exception e) {
            em.getTransaction().rollback();
            e.printStackTrace();
        } finally {
            em.close();
            emf.close();
        }
    }
}
