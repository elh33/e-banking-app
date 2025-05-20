import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Account } from '../models/account.model';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  // Données des comptes (mockées pour l'instant)
  private accounts: Account[] = [
    { id: 1, accountNumber: 'FR7630001007941234567890185', type: 'courant', balance: 1250.75, currency: '€', dateCrea: new Date('2023-01-01'), limit: 500 },
    { id: 2, accountNumber: 'FR7630004000031234567890143', type: 'epargne', balance: 4500.00, currency: '€', dateCrea: new Date('2023-02-01'), limit: 1000 },
    { id: 3, accountNumber: 'FR7630006000011234567890189', type: 'livret', balance: 7800.50, currency: '€', dateCrea: new Date('2023-03-01'), limit: 2000 },
  ];


  constructor() { }

  // Récupération de tous les comptes
  getAccounts(): Observable<Account[]> {
    return of(this.accounts);
  }

  // Récupération d'un compte par son ID
  getAccountById(id: number): Observable<Account | undefined> {
    return of(this.accounts.find(account => account.id === id));
  }

  downloadAccountStatement(accountId: number, userName: string = 'Jean Dupont'): Observable<boolean> {
    const account = this.accounts.find(a => a.id === accountId);
    if (account) {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth(); // 210 mm pour A4
      const pageHeight = doc.internal.pageSize.getHeight(); // 297 mm pour A4
      const margin = 20; // Marge uniforme de 20 mm

      // Extraction des codes à partir du numéro de compte
      const accountNumber = account.accountNumber;
      const codeBanque = accountNumber.substring(4, 6); // Ajusté pour RIB français (positions 5-6)
      const codeVille = accountNumber.substring(6, 11); // Ajusté pour RIB français (positions 7-11)
      const numeroCompte = accountNumber.substring(11, 22); // Ajusté pour RIB français (positions 12-22)
      const cleRIB = accountNumber.substring(22, 24); // Ajusté pour RIB français (positions 23-24)

      // En-tête avec fond bleu
      doc.setFillColor(30, 58, 138); // Ton bleu foncé (#1e3a8a)
      doc.rect(0, 0, pageWidth, 30, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(18);
      const headerText = 'E-Bank';
      const headerTextWidth = doc.getTextWidth(headerText);
      doc.text(headerText, (pageWidth - headerTextWidth) / 2, 15); // Centré horizontalement
      doc.setFontSize(12);
      const userText = `Relevé pour ${userName}`;
      const userTextWidth = doc.getTextWidth(userText);
      doc.text(userText, (pageWidth - userTextWidth) / 2, 25); // Centré horizontalement

      // Titre du contenu
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(14);
      doc.setTextColor(30, 58, 138);
      const titleText = `Détails du compte - ${account.type}`;
      const titleTextWidth = doc.getTextWidth(titleText);
      doc.text(titleText, (pageWidth - titleTextWidth) / 2, 40); // Centré, espacement vertical ajusté

      // Tableau des informations
      const tableData = [
        ['Numéro de compte complet', accountNumber],
        ['Solde', `${account.balance} ${account.currency}`],
        ['Code banque', codeBanque],
        ['Code ville', codeVille],
        ['Numéro de compte', numeroCompte],
        ['Clé RIB', cleRIB],
        ['Code SWIFT', '[Non spécifié]']
      ];

      autoTable(doc, {
        head: [['Champ', 'Valeur']],
        body: tableData,
        startY: 50, // Position de départ du tableau
        margin: { horizontal: margin },
        theme: 'grid', // Style avec bordures
        headStyles: { fillColor: [30, 58, 138], textColor: [255, 255, 255], fontSize: 12 }, // En-tête bleu
        bodyStyles: { textColor: [0, 0, 0], fontSize: 10 }, // Corps noir
        tableWidth: 'auto', // Largeur automatique du tableau
        horizontalPageBreak: true, // Gestion des sauts de page si nécessaire
      });

      // Pied de page avec la date actuelle
      doc.setFontSize(10);
      doc.setTextColor(107, 76, 230); // Bleu plus clair (#6b4ce6)
      const footerText = `Généré le: ${new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Casablanca' })}`;
      const footerTextWidth = doc.getTextWidth(footerText);
      doc.text(footerText, (pageWidth - footerTextWidth) / 2, pageHeight - margin); // Centré horizontalement, proche du bas

      // Sauvegarde du PDF
      doc.save(`releve_compte_${accountId}.pdf`);
    }
    return of(true);
  }

}
