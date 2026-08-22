import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import  { TransactionService, Transaction } from '../../services/transaction.service';


@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transaction-list.html',
  styleUrl: './transaction-list.css',
})
export class TransactionList implements OnInit{
transactions: Transaction[] = [];
selectedFilter: string = 'all';
searchQuery: string ='';

constructor(private transactionService: TransactionService) {}

//automatischer aufruf
ngOnInit(): void {
    this.loadTransactions();
}

//Dtaen laden
loadTransactions():void {
  this.transactionService.getTransactions().subscribe({
    next: (data) => this.transactions = data,
    error: (err) => console.error('Fehler beim Laden: ', err)
  });
}

//Löschen Button
deleteTransaction(id: string | undefined): void {
  if (!id) return;
  this.transactionService.deleteTransaction(id).subscribe({
    next: () => {
      //nach dem löschen liste neu laden
      this.loadTransactions();
    },
    error: (err) => console.error('Fehler beim Löschen: ', err)
  });
}

// Filter
get filteredTransaction(): Transaction[]{
  return this.transactions.filter((t) => {
    const matchesType = this.selectedFilter === 'all' || t.type === this.selectedFilter;
    const matchSearch = t.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      (t.category && t.category.toLowerCase().includes(this.searchQuery.toLowerCase()));
    return matchesType && matchSearch;
  });
}

  // berechnungen
  get totalIncome(): number{
    return this.transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + Number(t.amount), 0);
  }

  get totalExpense(): number {
    return this.transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + Number(t.amount),0);
  }
  get balance(): number {
    return this.totalIncome - this.totalExpense;
  }
}
