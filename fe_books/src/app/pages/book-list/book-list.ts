import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../services/book';
import { Book } from '../../models/book';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './book-list.html',
  styleUrl: './book-list.scss',
})

export class BookListComponent implements OnInit {
  books: Book[] = [];
  newBook: Book = new Book();

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe((data) => (this.books = data));
  }

  addBook(): void {
    console.log('Adding book:', this.newBook); // Debug log
    this.bookService.createBook(this.newBook).subscribe((book) => {
      this.books.push(book);
      this.newBook = new Book(); // reset form
    });
  }

  updateBook(book: Book): void {
    this.bookService.updateBook(book).subscribe();
  }

  deleteBook(bookId: number): void {
    this.bookService.deleteBook(bookId).subscribe(() => {
      this.books = this.books.filter((b) => b.id !== bookId);
    });
  }
}
