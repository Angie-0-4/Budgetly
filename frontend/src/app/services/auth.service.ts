import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private currentUserSubject = new BehaviorSubject<string | null>(localStorage.getItem('budgetly_user'));
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  register(userData: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(userData: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, userData).pipe(
      tap((res) => {
        if (res.token && res.username) {
          localStorage.setItem('budgetly_token', res.token);
          localStorage.setItem('budgetly_user', res.username);
          if (res.userId) {
            localStorage.setItem('budgetly_userId', res.userId);
          }
          this.currentUserSubject.next(res.username);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('budgetly_token');
    localStorage.removeItem('budgetly_user');
    localStorage.removeItem('budgetly_userId');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('budgetly_user');
  }

  getUsername(): string | null {
    return localStorage.getItem('budgetly_user');
  }

  getUserId(): string | null {
    return localStorage.getItem('budgetly_userId');
  }
}