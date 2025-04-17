import { Component } from '@angular/core';
import { FireService } from '../fire.service';
import { ThePostComponent } from '../the-post/the-post.component';

@Component({
  selector: 'app-saved-posts',
  imports: [ThePostComponent],
  templateUrl: './saved-posts.component.html',
  styleUrl: './saved-posts.component.scss'
})
export class SavedPostsComponent {
  savedPostsArray:any[]=[];
constructor(private _FireService:FireService)
{
this.getSPosts();
}
getSPosts()
{
const myId=localStorage.getItem('userId')||'';
this._FireService.getSavedPosts(myId).subscribe({
  next:(res)=>{
   
    this.savedPostsArray=res;
  },
  error:(error)=>{
    console.log(error);
  }
})
}
}
