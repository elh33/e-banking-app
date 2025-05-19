package org.example.backend.Controller.Transaction;

import org.example.backend.DTO.TransactionDTO;
import org.example.backend.Model.Transaction;
import org.example.backend.Service.Transaction.TransactionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transaction")
public class TransactionController {
    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping("/all")
    public List<TransactionDTO> getAllTransactions() {
        return transactionService.getAllTransactions();
    }

    @PostMapping("/add")
    public ResponseEntity<String> addTransaction(@RequestBody Transaction transaction) {
        transactionService.addTransaction(transaction);
        return ResponseEntity.ok("Transaction ajouté avec succès");
    }

    @PostMapping("/update")
    public ResponseEntity<String> updateTransaction(@RequestBody Transaction transaction) {
        transactionService.addTransaction(transaction);
        return ResponseEntity.ok("Transaction modifié avec succès");
    }

    @PostMapping("/delete")
    public ResponseEntity<String> deleteTransaction(@RequestBody Long id) {
        transactionService.deleteTransaction(id);
        return ResponseEntity.ok("Transaction supprimé avec succès");
    }
}
