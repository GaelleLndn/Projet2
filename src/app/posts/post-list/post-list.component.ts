import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import  { PostsService } from '../posts.service'
import { Post } from '../post.model'

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[] =[];
  postsSub : Subscription;


  constructor( public postsService: PostsService) { }

  ngOnInit() {
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe(
        (posts: Post[]) => {
          this.posts = posts;
        }
      )
  }

  onDeletePost(postId: String){
    this.postsService.deletePost(postId)
  }

// remove subcription / unsubscribe after compoenent is destroyed (is not in the DOM anymore) and prevent memory leaks
  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }
}