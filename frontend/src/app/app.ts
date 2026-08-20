import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TransactionList } from './components/transaction-list/transaction-list';
import { TransactionForm } from './components/transaction-form/transaction-form';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TransactionList, TransactionForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Budgetly';
}
