

import org.example.backend.Model.Agent;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class AgentTest {
    public static void main(String[] args) {

        EntityManagerFactory emf = Persistence.createEntityManagerFactory("default");
        EntityManager em = emf.createEntityManager();

        em.getTransaction().begin();

        Agent agent = new Agent(
                "Ali", "Bennani", "ali.bennani@bank.com", "0612345678",
                "password123", "AG-001"
        );

        em.persist(agent);
        em.getTransaction().commit();

        System.out.println("Agent inséré avec ID : " + agent.getId());

        em.close();
        emf.close();
    }
}
