

import org.example.backend.Model.Admin;
import org.example.backend.Model.Agent;

import jakarta.persistence.*;

public class AgentTest {
    public static void main(String[] args) {

        EntityManagerFactory emf = Persistence.createEntityManagerFactory("TestPersistence");
        EntityManager em = emf.createEntityManager();

        em.getTransaction().begin();

        Agent agent = new Agent();
        agent.setNom("xxx");
        agent.setPrenom("Akram");
        agent.setEmail("leila.omar@bank.com");
        agent.setTelephone("0654321987");
        agent.setMotDePasse("securePass123");
        em.persist(agent);
        em.getTransaction().commit();

        System.out.println("Agent inséré avec ID : " + agent.getId());

        em.close();
        emf.close();
    }
}
