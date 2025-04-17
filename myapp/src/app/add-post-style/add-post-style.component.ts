import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddPostComponent } from '../add-post/add-post.component';
import { CommonModule } from '@angular/common';
import { zoomInOut } from '../animation';
import { AddImgPostComponent } from '../add-img-post/add-img-post.component';

@Component({
  selector: 'app-add-post-style',
  imports: [RouterModule,AddPostComponent,CommonModule,AddImgPostComponent],
  templateUrl: './add-post-style.component.html',
  styleUrl: './add-post-style.component.scss',
  animations:[zoomInOut]

})
export class AddPostStyleComponent {
  show_dialog:boolean=false;
  showDialog()
  {
   this.show_dialog=!this.show_dialog;
  }
  type:string='';
addPost(type:string)
{
  this.type=type;
}
skip()
{
  this.type='';
}
}
