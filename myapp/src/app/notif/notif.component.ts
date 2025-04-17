import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FireService } from '../fire.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThePostComponent } from '../the-post/the-post.component';
import { zoomInOut } from '../animation';

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
constructor(private _FireService:FireService)
{
  this._FireService.notifNumber.next(0);
  localStorage.setItem('notifSeen?','true')
  

}
ngOnInit(): void {
this.getNotif();
}
getNotif()
{
  const myId=localStorage.getItem('userId')||'';
 this.isSubscirbe=this._FireService.getMyData(myId).subscribe({
  next:(res)=>{
this.notifications=res.notfications;
console.log(res.notfications);
this.sortedNotifications=this.notifications.sort((a,b)=>b.date?.seconds-a.date?.seconds); // معناها ان لb هو الاكبر يعني فنتا خليه الاحدث 

  }
 })
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
getThePost(postId:string)
{
  console.log(postId);
this._FireService.getOnePost(postId).subscribe({
  next:(res)=>{
    
this.thePost=res;
console.log(res);
console.log(this.thePost);
this.showPost=true;
  }
})
}

}
// getQuery(collectionName:string,fieldName:string,condition:any,value:any):Observable<any>

