import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/book';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/books`);
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/books/${id}`);
  }

  getMyBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/my_books`)
  }

  createBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.apiUrl}/books`, { book });
}

  updateBook(book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/books/${book.id}`, { book });
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/books/${id}`);
  }
}