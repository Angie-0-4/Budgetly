import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionList } from './components/transaction-list/transaction-list';
import { TransactionForm } from './components/transaction-form/transaction-form';
import { AuthComponent } from './components/auth/auth';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TransactionList, TransactionForm, AuthComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  title = 'Budgetly';
  currentUser: string | null = null;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user: string | null) => {
      this.currentUser = user;
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
