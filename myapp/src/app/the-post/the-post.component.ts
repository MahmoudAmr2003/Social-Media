import { Firestore } from '@angular/fire/firestore';
import { MyDataService } from './../my-data.service';
import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { FireService } from '../fire.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { zoomInOut } from '../animation';
import { CommentService } from '../comment.service';
import { FormsModule } from '@angular/forms';
import { LikeCommentService } from '../like-comment.service';


@Component({
  selector: 'app-the-post',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './the-post.component.html',
  styleUrl: './the-post.component.scss',
animations:[zoomInOut]
})
export class ThePostComponent implements OnInit {
















  @Input() allPosts:any[]=[]
  myId=localStorage.getItem('userId')||'';
saved:boolean=false;
allLikes:any[]=[];
user:any={};
constructor(private _FireService:FireService , private _Router:Router ,private _CommentService:CommentService,private elRef:ElementRef,private _LikeCommentService:LikeCommentService,private _MyDataService:MyDataService ,private _Firestore:Firestore)
{
document.body.classList.remove('no-scroll');
_MyDataService.setMyData();
this.user=_MyDataService.userData;
}
ngOnInit(): void {


  this.getSPosts();
 

}


toggleLike(postId:string)
{
this._LikeCommentService.toggleLike(postId,this.user);
}
likedPoeple:any[]=[];
getLikes(postId:string)
{
this._LikeCommentService.getLikes(postId).subscribe({
  next:(res)=>{
this.likedPoeple=res;
console.log(res);
  }
})
}
sendComment(postId:string)
{
  console.log("hello");
  console.log(postId,this.user,this.comment)
this._LikeCommentService.sendComment(postId,this.user,this.comment);
}
allComments:any[]=[];
getComments(postId:string)
{
this._LikeCommentService.getComments(postId).subscribe({
  next:(res)=>{
    console.log(postId);
    console.log(res);
    console.log(this.allComments);
this.allComments=res;
  },
  error:(error)=>
  {
    console.log("ERROR"+ error);
  }
})
}
getPostId(postId:string)
{
console.log(postId);
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
this._FireService.getSavedPosts(myId).subscribe({
  next:(res)=>{
   
    this.savedPostsArray=res;
    
  },
  error:(error)=>{
    console.log(error);
  }
})
}
checkIfISavedPost(postId:string):boolean
{
console.log(postId);

 this.saved= this.savedPostsArray.some(x=>x.docId===postId);
 return this.saved;

}



}
