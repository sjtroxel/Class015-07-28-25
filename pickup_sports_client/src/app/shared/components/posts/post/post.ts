import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Post as PostModel } from '../../../models/post';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './post.html',
  styleUrl: './post.scss'
})
export class PostComponent {
  @Input({required: true}) post!: PostModel;
}
