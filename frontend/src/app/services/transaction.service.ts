import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  private apiUrL = 'http://localhost:3000/api/transactions';

  constructor(private http: HttpClient) {}

    //GET
    getTransactions(): Observable<Transaction[]> {
      return this.http.get<Transaction[]>(this.apiUrL);
    }

    //POST
    createTransaction(transaction : Transaction): Observable<Transaction> {
      return this.http.post<Transaction>(this.apiUrL, transaction);
    }

    //Delete
    deleteTransaction(id: string): Observable<{ message: string }> {
      return this.http.delete<{ message: string }>(`${this.apiUrL}/${id}`);
    }
}