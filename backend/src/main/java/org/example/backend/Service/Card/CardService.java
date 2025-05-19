package org.example.backend.Service.Card;

import org.example.backend.DTO.*;
import org.example.backend.Model.Card;
import org.example.backend.Repository.Card.CardRepository;
import org.example.backend.Service.Compte.CompteService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CardService {
    private final CardRepository cardRepository;
    private final CompteService compteService;

    public CardService(CardRepository cardRepository, CompteService compteService) {
        this.cardRepository = cardRepository;
        this.compteService = compteService;
    }

    public void addCard(Card card) {
        cardRepository.save(card);
    }

    public CardDTO getCard(Long id) {
        Card card = cardRepository.findById(id).orElse(null);
        if (card == null) return null;
        return new CardDTO(card.getId(),card.getNumeroCarte(),card.getTypeCarte(),card.getDateExpiration(),card.getStatut(),card.getLimitePaiement(),compteService.getCompte(card.getCompte().getId()));
    }

    public List<CardDTO> getAllCards() {
        List<Card> cards = (List<Card>) cardRepository.findAll();
        List<CardDTO> cardDTOS = new ArrayList<>();
        for(Card card : cards){
            cardDTOS.add(getCard(card.getId()));
        }
        return cardDTOS;
    }

    public void deleteCard(Long id) {
        cardRepository.delete(cardRepository.findById(id).orElse(null));
    }
}
