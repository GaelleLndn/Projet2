import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http'

import { Post } from './post.model';


@Injectable({
  providedIn: 'root'
})
export class PostsService {
  
  constructor(private http: HttpClient) { }

  private posts: Post [] = [];
  private postsUpdated = new Subject<Post[]>()

  getPosts(){
    this.http.get<{message: string, posts: any}>('http://localhost:8000/api/posts')
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          }
        })
      }))
      .subscribe( transformedPosts => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts])
      });
  }

  getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }

  addPost(id: String, title: String, content: String){
    const post: Post = {
      id: id,
      title: title,
      content: content
    } ;
    this.http.post<{message: string, postId: string}>('http://localhost:8000/api/posts', post)
      .subscribe((responseData) => {
        const id = responseData.postId;
        post.id = id;
        this.posts.push(post)
        this.postsUpdated.next([...this.posts])
      });
  }

  deletePost(postId: String){
    this.http.delete('http://localhost:8000/api/posts/' + postId)
      .subscribe(()=> {
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts])
      })
  }



}