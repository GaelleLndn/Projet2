import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

import { Post } from './post.model';


@Injectable({
  providedIn: 'root'
})
export class PostsService {
  
  constructor(private http: HttpClient, private router: Router) { }

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


  getPostById(id: string){
    return {...this.posts.find(p => p.id === id )}
  }


  addPost(postData){
    const post: Post = {
      id: postData.id,
      title: postData.title,
      content: postData.content
    } ;
    this.http.post<{message: string, postId: string}>('http://localhost:8000/api/posts', post)
      .subscribe((responseData) => {
        const id = responseData.postId;
        post.id = id;
        this.posts.push(post)
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(["/list"])
      });
  }

  updatePost(postData){
    const post: Post = {
      id: postData.id,
      title: postData.title,
      content: postData.content
    } ;
    this.http.put('http://localhost:8000/api/posts/' + postData.id, post)
      .subscribe(response => console.log(response))
      this.router.navigate(["/list"])
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