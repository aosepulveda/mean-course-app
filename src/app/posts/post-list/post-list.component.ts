import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';


import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  /*posts = [
    { title: 'First Post', content: 'this is the first post\'s content'},
    { title: 'Second Post', content: 'this is the second post\'s content'},
    { title: 'Third Post', content: 'this is the third post\'s content'},
  ];*/
  posts: Post[] = [];
  private postsSub: Subscription;

  constructor(public postService: PostService) {}

  ngOnInit(): void {
    this.posts = this.postService.getPosts();
    this.postsSub = this.postService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  ngOnDestroy(): void {
    // prevent memory leaks
    this.postsSub.unsubscribe();
  }
}
