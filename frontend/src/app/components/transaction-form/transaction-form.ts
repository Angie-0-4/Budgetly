import { Component, EventEmitter,Input, Output, OnChanges, SimpleChange, SimpleChanges} from '@angular/core';
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
export class TransactionForm implements OnChanges{
  @Input() editItem: Transaction | null = null;
  @Output() transactionSaved = new EventEmitter<void>();
  @Output() cancelEdit = new EventEmitter<void>();

  // Formular
  title: string = '';
  amount: number | null = null;
  type: 'income' | 'expense' = 'expense';
  category: string = '';
  date: string = new Date().toISOString().substring(0,10);

  constructor(private transactionService: TransactionService) {}

  ngOnChanges(changes: SimpleChanges): void {
      if (changes['editItem'] && this.editItem) {
        this.title = this.editItem.title;
        this.amount = this.editItem.amount;
        this.type = this.editItem.type;
        this.category = this.editItem.category || '';
        this.date = this.editItem.date ? this.editItem.date.substring(0, 10) : new Date().toISOString().substring(0, 10);
      }
  }

  onSubmit(): void {
    if (!this.title || !this.amount) return;

    const data: Transaction = {
      title: this.title,
      amount: this.amount,
      type: this.type,
      category: this.category,
      date: this.date
    };

    if (this.editItem && this.editItem._id) {
      this.transactionService.updateTransaction(this.editItem._id, data).subscribe({
        next: () => {
          this.resetForm();
          this.transactionSaved.emit();
        },
        error: (err) => console.error('Fehler beim Aktualisieren:', err)
      });
    } else {

    this.transactionService.createTransaction(data).subscribe({
      next: () => {
        this.resetForm();
        this.transactionSaved.emit();
      },
      error: (err) => console.error('Fehler beim Erstellen:', err)
    });
  }
}

  onCancel(): void {
    this.resetForm();
    this.cancelEdit.emit();
  }

  resetForm(): void {
    this.title = '';
    this.amount = null;
    this.category = '';
    this.type = 'expense';
    this.date = new Date().toISOString().substring(0, 10);
    this.editItem = null;
  }
}