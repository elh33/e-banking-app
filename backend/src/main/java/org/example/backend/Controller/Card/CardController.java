package org.example.backend.Controller.Card;

import org.example.backend.DTO.CardDTO;
import org.example.backend.Model.Card;
import org.example.backend.Service.Card.CardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public class CardController {
    private final CardService cardService;

    public CardController(CardService cardService) {
        this.cardService = cardService;
    }

    @GetMapping("/all")
    public List<CardDTO> getAllCards() {
        return cardService.getAllCards();
    }

    @PostMapping("/add")
    public ResponseEntity<String> addCard(@RequestBody Card card) {
        cardService.addCard(card);
        return ResponseEntity.ok("Card ajouté avec succès");
    }

    @PostMapping("/update")
    public ResponseEntity<String> updateCard(@RequestBody Card card) {
        cardService.addCard(card);
        return ResponseEntity.ok("Card modifié avec succès");
    }

    @PostMapping("/delete")
    public ResponseEntity<String> deleteCard(@RequestBody Long id) {
        cardService.deleteCard(id);
        return ResponseEntity.ok("Card supprimé avec succès");
    }
}
