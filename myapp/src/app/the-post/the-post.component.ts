import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { FireService } from '../fire.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-the-post',
  imports: [CommonModule],
  templateUrl: './the-post.component.html',
  styleUrl: './the-post.component.scss'
})
export class ThePostComponent implements OnInit {





showComments:boolean=false;
  @Input() allPosts:any[]=[]
  myId=localStorage.getItem('userId')||'';

constructor(private _FireService:FireService , private _Router:Router)
{

}
ngOnInit(): void {
  
  
}
openComments()
{
  this.showComments=true;
}
  likeColor:string=''

getLike(docId:string,likes:any[],postOwnerId:string)
{
  let notNums=0;
  this._FireService.$notifs.subscribe({
    next:(res)=>{
      notNums=res;
    }
  })
  this._FireService.getLike(docId,likes,postOwnerId,notNums)

}

isLiked(likes:any):boolean
{
return likes&&likes.some((i:any)=>i.id===this.myId);
}
userProfile(id: string): void {
  console.log(id);
  localStorage.setItem('personId',id);
  this._Router.navigate(['/userProfile']);
    }


    isSubscribe:any[]=[];

    sortedPosts:any[]=[];

  


trackById(index:number,item:any)
{
  return item.docId;
}




}
