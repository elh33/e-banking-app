package org.example.backend.DTO;

public class BeneficiaryDTO {
    private Long id;
    private String name;
    private String accountNumber;
    private String bankName;
    private boolean favorite;

    public BeneficiaryDTO() {
    }

    public BeneficiaryDTO(Long id, String name, String accountNumber, String bankName, boolean favorite) {
        this.id = id;
        this.name = name;
        this.accountNumber = accountNumber;
        this.bankName = bankName;
        this.favorite = favorite;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public boolean isFavorite() {
        return favorite;
    }

    public void setFavorite(boolean favorite) {
        this.favorite = favorite;
    }
}