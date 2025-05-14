package org.example.backend.Controller.Agent;

import org.example.backend.Model.Client;
import org.example.backend.Service.Agent.AgentService;

import org.example.backend.Service.Client.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/agent")
public class AgentController {

    @Autowired
    private AgentService agentService;

    // 📄 Affiche le formulaire d’enrôlement
    @GetMapping("/create-client")
    public String showCreateClientForm(Model model) {
        model.addAttribute("client", new Client());
        return "agent/createClient"; // ↔ /WEB-INF/views/agent/createClient.jsp
    }

    @Autowired
    private ClientService clientService;

    @PostMapping("/create-client")
    public String submitCreateClient(@ModelAttribute("client") Client client) {
        clientService.addClient(client);
        return "redirect:/agent/clients";
    }

    @GetMapping("/clients")
    public String listClients(Model model) {
        model.addAttribute("clients", clientService.getAllClients());
        return "agent/listClients";

    }
}
