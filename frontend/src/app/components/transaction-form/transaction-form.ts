import { Component, EventEmitter, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionService, Transaction  } from '../../services/transaction.service';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transaction-form.html',
  styleUrl: './transaction-form.css',
})
export class TransactionForm {
  @Output() transactionAdded = new EventEmitter<void>();

  // Formular
  title: string = '';
  amount: number | null = null;
  type: 'income' | 'expense' = 'expense';
  category: string = '';

  constructor(private transactionService: TransactionService) {}

  onSubmit(): void {
    if (!this.title || !this.amount) return;

    const newTransaction: Transaction = {
      title: this.title,
      amount: this.amount,
      type: this.type,
      category: this.category
    };

    this.transactionService.createTransaction(newTransaction).subscribe({
      next: () => {
        // Formular zurücksetzen
        this.title = '';
        this.amount = null;
        this.category = '';
        this.type = 'expense';
        // benachrichtigung
        this.transactionAdded.emit();
      },
      error: (err) => console.error('Fehler beim Erstellen:', err)
    });
  }
}
