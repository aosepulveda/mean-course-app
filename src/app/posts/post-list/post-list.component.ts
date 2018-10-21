import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';


import { Post } from '../post.model';
import { PostService } from '../post.service';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postsSub: Subscription;
  isLoading = false;
  userIsAuthenticated = false;
  private authStatusSub: Subscription;

  constructor(public postService: PostService, private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.postService.getPosts();
    this.postsSub = this.postService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
      });
    this.userIsAuthenticated = this.authService.getIsAuthenticated();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onDelete(postId: string) {
    this.postService.deletePost(postId);
  }

  ngOnDestroy(): void {
    // prevent memory leaks
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
