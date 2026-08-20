import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import  { TransactionService, Transaction } from '../../services/transaction.service';
import { errorContext } from 'rxjs/internal/util/errorContext';

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
}
