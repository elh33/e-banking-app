package org.example.backend.Service.Transaction;

import org.example.backend.DTO.TransactionDTO;
import org.example.backend.Model.Transaction;
import org.example.backend.Repository.Transaction.TransactionRepository;
import org.example.backend.Service.Compte.CompteService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final CompteService compteService;

    public TransactionService(TransactionRepository transactionRepository, CompteService compteService) {
        this.transactionRepository = transactionRepository;
        this.compteService = compteService;
    }

    public void addTransaction(Transaction transaction) {
        transactionRepository.save(transaction);
    }

    public TransactionDTO getTransaction(Long id) {
        Transaction transaction = transactionRepository.findById(id).orElse(null);
        if (transaction == null) return null;

        return new TransactionDTO(
                transaction.getId(),
                transaction.getReference(),
                transaction.getType(),
                transaction.getCompteSource() != null ? compteService.getCompte(transaction.getCompteSource().getId()) : null,
                transaction.getCompteDestination() != null ? compteService.getCompte(transaction.getCompteDestination().getId()) : null,
                transaction.getMontant(),
                transaction.getDevise(),
                transaction.getFrais(),
                transaction.getDate(),
                transaction.getStatut()
        );
    }

    public List<TransactionDTO> getAllTransactions() {
        List<Transaction> transactions = (List<Transaction>) transactionRepository.findAll();
        List<TransactionDTO> transactionDTOs = new ArrayList<>();

        for (Transaction transaction : transactions) {
            transactionDTOs.add(getTransaction(transaction.getId()));
        }

        return transactionDTOs;
    }

    public void deleteTransaction(Long id) {
        transactionRepository.delete(transactionRepository.findById(id).orElse(null));
    }
}