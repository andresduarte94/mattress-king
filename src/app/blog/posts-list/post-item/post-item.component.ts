import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../post.model';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {
  @Input() post: Post;
  @Input() postIndex: number;
  postDescription: string;

  constructor() { }

  ngOnInit() {
    this.postDescription = this.post.content.slice(0, 120) + '...';
  }

}
