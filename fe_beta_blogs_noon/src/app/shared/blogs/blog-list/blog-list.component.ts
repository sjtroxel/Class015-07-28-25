import { Component, Input } from '@angular/core';
import { Blog } from '../../models/blog';

@Component({
  selector: 'app-blog-list',
  imports: [],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss'
})
export class BlogListComponent {
  @Input({ required: true }) blogs: Blog[] = [];
}
