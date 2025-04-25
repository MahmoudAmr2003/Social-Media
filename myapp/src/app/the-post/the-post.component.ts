import { map, Subscription } from 'rxjs';
import { Firestore } from '@angular/fire/firestore';
import { MyDataService } from './../my-data.service';
import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { FireService } from '../fire.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { zoomInOut } from '../animation';
import { CommentService } from '../comment.service';
import { FormsModule } from '@angular/forms';
import { LikeCommentService } from '../like-comment.service';
import { sub } from 'date-fns';


@Component({
  selector: 'app-the-post',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './the-post.component.html',
  styleUrl: './the-post.component.scss',
animations:[zoomInOut]
})
export class ThePostComponent implements OnInit,OnDestroy {
  @Input() allPosts:any[]=[]
  myId=localStorage.getItem('userId')||'';
saved:boolean=false;
allLikes:any[]=[];
user:any={};
private subsArray:Subscription[]=[];
constructor(private _FireService:FireService , private _Router:Router ,private _CommentService:CommentService,private elRef:ElementRef,private _LikeCommentService:LikeCommentService,private _MyDataService:MyDataService ,private _Firestore:Firestore)
{

_MyDataService.setMyData();
this.user=_MyDataService.userData;
}
ngOnInit(): void {
  this.getUserLikes();

  this.getSPosts();
 

}


allUserLikes:any[]=[];
getUserLikes()
{
this.subsArray.push(
  this._LikeCommentService.getUserLikes(this.user.id).subscribe({
    next:(res)=>{
      this.allUserLikes=res.map((like:any)=>like.postId)
      
    }
  })
)
}

isLiked(postId:string):boolean
{
return this.allUserLikes.includes(postId);
}


toggleLike(post:any)
{
this._LikeCommentService.toggleLike(post,this.user);
}
likedPoeple:any[]=[];
getLikes(postId:string)
{
this.subsArray.push(
  this._LikeCommentService.getLikes(postId).subscribe({
    next:(res)=>{
  this.likedPoeple=res;
  
    }
  })
)
}
sendComment(post:any)
{

this._LikeCommentService.sendComment(post,this.user,this.comment);
this.comment='';
}

allComments:any[]=[];
getComments(postId:string)
{
this.subsArray.push(
  this._LikeCommentService.getComments(postId).subscribe({
    next:(res)=>{
     
  this.allComments=res;
    },
    error:(error)=>
    {
      
    }
  })
)
}







    


  


trackById(index:number,item:any)
{
  return item.userData.id;
}


trackById2(index:number,item:any)
{
  return item.postId;
}

////////////////
comment:string='';

clearComment()
{
  this.comment='';
}


indexOfMore:number=-1;
showAndaHideMore(index:number,id:string)
{
  this.checkIfISavedPost(id);
  if(this.indexOfMore==index)
  {
    this.indexOfMore=-1;

  }
  else
  {
    this.indexOfMore=index;
  }

}



deletePost(id:string)
{
  const collectionName='posts';
  this._FireService.deleteDoc(collectionName,id);

  this.indexOfMore=-1;
}
pushUserInSaver(postId:string)
{


  this.saved=!this.saved;
  if(this.saved==true)
  {
    this._FireService.pushUserInSaver(postId);

  }
  else
  {
    this._FireService.popUserInSaver(postId);

  }
}

savedPostsArray:any[]=[];
getSPosts()
{
const myId=localStorage.getItem('userId')||'';
this.subsArray.push(
  this._FireService.getSavedPosts(myId).subscribe({
    next:(res)=>{
     
      this.savedPostsArray=res;
      
    },
    error:(error)=>{
      
    }
  })
)
}
checkIfISavedPost(postId:string):boolean
{


 this.saved= this.savedPostsArray.some(x=>x.docId===postId);
 return this.saved;

}



ngOnDestroy(): void {
  this.subsArray.forEach(sub=>sub.unsubscribe());
}

}
