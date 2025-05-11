import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BudgetCategory, Expense, BudgetAlert } from '../models/Budget.model';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  // Données simulées
  private mockCategories: BudgetCategory[] = [
    { id: 1, name: 'Alimentation', color: '', budgetLimit: 300, currentSpending: 220 },
    { id: 2, name: 'Transport', color: '', budgetLimit: 150, currentSpending: 80 },
    { id: 3, name: 'Loisirs', color: '', budgetLimit: 200, currentSpending: 250 }
  ];

  private mockExpenses: Expense[] = [
    { id: 1, date: new Date(), amount: 45.5, description: 'Courses alimentaires', categoryId: 1, accountId: 1, isAutomatic: false },
    { id: 2, date: new Date(), amount: 25.8, description: 'Essence', categoryId: 2, accountId: 1, isAutomatic: false }
  ];

  // Suppression du constructeur avec HttpClient
  constructor() {}

  getBudgetCategories(): Observable<BudgetCategory[]> {
    return of(this.mockCategories);
  }

  getExpenses(startDate: Date, endDate: Date): Observable<Expense[]> {
    // Filtrer par date si nécessaire
    return of(this.mockExpenses);
  }

  addExpense(expense: Omit<Expense, 'id'>): Observable<Expense> {
    const newExpense = { ...expense, id: this.mockExpenses.length + 1 };
    this.mockExpenses.push(newExpense);

    // Mettre à jour les dépenses dans la catégorie
    const category = this.mockCategories.find(c => c.id === expense.categoryId);
    if (category) {
      category.currentSpending += expense.amount;
    }

    return of(newExpense);
  }

  getBudgetAlerts(): Observable<BudgetAlert[]> {
    const alerts: BudgetAlert[] = [];
    this.mockCategories.forEach(category => {
      if (category.currentSpending > category.budgetLimit) {
        alerts.push({
          id: alerts.length + 1,
          categoryId: category.id,
          threshold: 100,
          message: `Vous avez dépassé votre budget ${category.name}`,
          isActive: true
        });
      }
    });
    return of(alerts);
  }

  checkBudgetOverages(): Observable<BudgetCategory[]> {
    return of(this.mockCategories.filter(c => c.currentSpending > c.budgetLimit));
  }

  getMonthlyExpenseData(year: number): Observable<{month: string, amount: number}[]> {
    const monthlyData = [
      {month: 'Jan', amount: 320},
      {month: 'Fév', amount: 280},
      {month: 'Mar', amount: 310},
      {month: 'Avr', amount: 340},
      {month: 'Mai', amount: 290},
      {month: 'Juin', amount: 350}
    ];
    return of(monthlyData);
  }


  addCategory(category: Omit<BudgetCategory, 'id' | 'currentSpending'>): Observable<BudgetCategory> {
    const newCategory = {
      ...category,
      id: this.mockCategories.length + 1,
      currentSpending: 0
    };
    this.mockCategories.push(newCategory);
    return of(newCategory);
  }

  deleteCategory(categoryId: number): Observable<boolean> {
    const initialLength = this.mockCategories.length;
    this.mockCategories = this.mockCategories.filter(c => c.id !== categoryId);

    // Supprimer également les dépenses associées à cette catégorie
    this.mockExpenses = this.mockExpenses.filter(e => e.categoryId !== categoryId);

    return of(initialLength > this.mockCategories.length);
  }

// Méthode déjà existante, mais importante pour les mises à jour
  updateBudgetCategory(category: BudgetCategory): Observable<BudgetCategory> {
    const index = this.mockCategories.findIndex(c => c.id === category.id);
    if (index !== -1) {
      this.mockCategories[index] = category;
    }
    return of(category);
  }
}
