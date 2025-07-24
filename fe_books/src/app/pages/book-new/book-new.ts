import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../../services/book';

@Component({
  selector: 'app-book-new',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './book-new.html',
  styleUrl: './book-new.scss'
})

export class BookNewComponent {
  bookForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private router: Router
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      read: [false]
    });
  }

  onSubmit() {
    if (this.bookForm.invalid) return;

    this.bookService.createBook(this.bookForm.value).subscribe({
      next: () => this.router.navigate(['/books']),
      error: err => console.error('Book creation failed:', err)
    });
  }
}
