import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.html',
  styleUrls: ['./auth.css']
})
export class AuthComponent {
  isLoginMode = true;
  username = '';
  password = '';
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService) {}

  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = '';
    this.successMessage = '';
  }

  onSubmit(): void {
    if (!this.username || !this.password) return;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.isLoginMode) {
      this.authService.login({ username: this.username, password: this.password }).subscribe({
        next: () => {
          this.username = '';
          this.password = '';
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Login fehlgeschlagen.';
        }
      });
    } else {
      this.authService.register({ username: this.username, password: this.password }).subscribe({
        next: (res) => {
          alert('Konto erfolgreich erstellt!');
          this.successMessage = res.message || 'Konto erstellt! Bitte einloggen.';
          this.isLoginMode = true;
          this.password = '';
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Registrierung fehlgeschlagen.';
        }
      });
    }
  }
}