import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FireService } from '../fire.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ThePostComponent } from '../the-post/the-post.component';
import { zoomInOut } from '../animation';
import { LikeCommentService } from '../like-comment.service';
@Component({
  selector: 'app-notif',
  imports: [CommonModule,RouterModule,ThePostComponent],
  templateUrl: './notif.component.html',
  styleUrl: './notif.component.scss',
  animations:[zoomInOut]
})
export class NotifComponent implements OnInit,OnDestroy {
  isSubscirbe!:Subscription;
notifications:any[]=[];
sortedNotifications:any[]=[];
constructor(private _FireService:FireService,private _LikeCommentService:LikeCommentService, private _Router:Router)
{

  
  

}
ngOnInit(): void {
  this.getMyData()
}
trackById(index:number,item:any)
{
return item.senderId;
}
ngOnDestroy(): void {
  if(this.isSubscirbe)
  {
this.isSubscirbe.unsubscribe();
  }
}

thePost:any[]=[];
showPost:boolean=false;
getThePost(postId:string,notif:string)
{
if(notif=='love'||notif=='comment')
{
  console.log(postId);
this._FireService.getOnePost(postId).subscribe({
  next:(res)=>{
this.thePost=res;
this.showPost=true;
  }

})
}
else
{
this._Router.navigate(['/frinds'])
}
}
hidePost()
{
  this.showPost=false;
}

notifs:any[]=[];
getMyData()
{

const id =localStorage.getItem('userId')||'';  
this._FireService.getMyData(id).subscribe({
  next:(res)=>{
this.notifs=res.notifs;
  }
})

}


}
// getQuery(collectionName:string,fieldName:string,condition:any,value:any):Observable<any>

