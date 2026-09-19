import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Transaction {
  _id?: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  category?: string;
  date?: string;
}

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private apiUrL = 'https://budgetly-011m.onrender.com/api/transactions';

  constructor(private http: HttpClient) {}

  private getHeaders(): { headers: HttpHeaders } {
    const userId = localStorage.getItem('budgetly_userId') || '';
    return {
      headers: new HttpHeaders({
        'user-id': userId
      })
    }
  }

    //GET
    getTransactions(): Observable<Transaction[]> {
      return this.http.get<Transaction[]>(this.apiUrL, this.getHeaders());
    }

    //POST
    createTransaction(transaction : Transaction): Observable<Transaction> {
      return this.http.post<Transaction>(this.apiUrL, transaction, this.getHeaders());
    }

    //Update
    updateTransaction(id: string, transaction: Transaction): Observable<Transaction> {
      return this.http.put<Transaction>(`${this.apiUrL}/${id}`, transaction, this.getHeaders());
    }

    //Delete
    deleteTransaction(id: string): Observable<{ message: string }> {
      return this.http.delete<{ message: string }>(`${this.apiUrL}/${id}`, this.getHeaders());
    }
}