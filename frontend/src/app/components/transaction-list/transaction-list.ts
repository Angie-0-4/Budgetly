import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import  { TransactionService, Transaction } from '../../services/transaction.service';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-list.html',
  styleUrl: './transaction-list.css',
})
export class TransactionList implements OnInit{
transactions: Transaction[] = [];

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
