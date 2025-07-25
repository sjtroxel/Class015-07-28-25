import { Component, } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlogService } from '../../../core/services/blog.service';
import { Router } from '@angular/router';
import { Blog } from '../../../shared/models/blog';

@Component({
  selector: 'app-blogs-new',
  imports: [ReactiveFormsModule],
  templateUrl: './blogs-new.component.html',
  styleUrl: './blogs-new.component.scss'
})
export class BlogsNewComponent {
  blogForm = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
  });

  constructor(private blogService: BlogService, private router: Router) { }

  onSubmit() {
    this.blogService.createBlog(this.blogForm.value as { title: string; content: string }).subscribe({
      next: (blog: Blog) => {
        console.log(blog);
        this.router.navigate(['/']);
      },
      error: (error: any) => {
        console.error('Error creating blog: ', error);
      }
    });
  }
}
