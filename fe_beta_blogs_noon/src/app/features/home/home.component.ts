import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../core/services/blog.service';
import { BlogListComponent } from '../../shared/blogs/blog-list/blog-list.component';
import { Blog } from '../../shared/models/blog';

@Component({
  selector: 'app-home',
  imports: [BlogListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  homeBlogs: Blog[] = [];

  constructor(private blogsService: BlogService) {}

  ngOnInit(): void {
    this.blogsService.getBlogs().subscribe({
      next: (blogs) => {
        this.homeBlogs = blogs;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
