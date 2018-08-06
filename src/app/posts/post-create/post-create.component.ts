import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { PostsService } from '../posts.service';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  
  postForm: FormGroup;
  enteredTitle = '';
  enteredContent = '';
  private mode = 'create';
  private postId: string
  post: Post;
  isLoading = false

  constructor(private formBuilder: FormBuilder, public postsService: PostsService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.postForm = this.formBuilder.group({
      _id : '',
      title : ['', Validators.required],
      content: ['', Validators.required]
    })

    this.route.paramMap.subscribe((paramMap )=> {
      if (paramMap.has('postId')){
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true
        this.post = this.postsService.getPostById(this.postId);
        this.isLoading = false
        this.postForm.get('title').patchValue(this.post.title);
        this.postForm.get('content').patchValue(this.post.content);
      } else {
        this.mode = 'create';
        this.postId = null
      }
    })
  }

  onSavePost(postData){  
    this.isLoading = true;
    if (this.mode === 'create'){
      this.postsService.addPost(postData);
    } else {
      postData.id = this.postId
      this.postsService.updatePost(postData)
    }
    this.postForm.reset()
  } 

}
