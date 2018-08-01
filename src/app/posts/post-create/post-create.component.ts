import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder, public postsService: PostsService) { }

  ngOnInit() {
    this.postForm = this.formBuilder.group({
      title : ['', Validators.required],
      content: ['', Validators.required]
    })
  }

  onAddPost(postData){
    this.postsService.addPost(postData.title, postData.content);
  } 

}
