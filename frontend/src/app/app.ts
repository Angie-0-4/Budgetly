import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TransactionList } from './components/transaction-list/transaction-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TransactionList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
