import { Component, ElementRef, HostListener, inject, Input, OnInit, ViewChild } from '@angular/core';
import { FireService } from '../fire.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { zoomInOut } from '../animation';
import { CommentService } from '../comment.service';
import { FormsModule } from '@angular/forms';
import { CommentComponent } from '../comment/comment.component';

@Component({
  selector: 'app-the-post',
  imports: [CommonModule,FormsModule,CommentComponent,RouterModule],
  templateUrl: './the-post.component.html',
  styleUrl: './the-post.component.scss',
animations:[zoomInOut]
})
export class ThePostComponent implements OnInit {






showComments:number=-1;
  @Input() allPosts:any[]=[]
  myId=localStorage.getItem('userId')||'';
image:string=localStorage.getItem("userImg")||'';
saved:boolean=false;

constructor(private _FireService:FireService , private _Router:Router ,private _CommentService:CommentService,private elRef:ElementRef )
{
document.body.classList.remove('no-scroll');

}
ngOnInit(): void {
  this.getSPosts();
  
}


@HostListener('document:click', ['$event'])


checkoutSideClick(event:MouseEvent)
{
if(this.showComments!==-1&& !this.elRef.nativeElement.contains(event.target))
{
  this.showComments=-1;
  document.body.classList.remove('no-scroll');
}
}
show:boolean=false;

openComments(index:number)
{
  this.show!=this.show;
  console.log("hello");
  this.showComments=index;
  document.body.classList.add('no-scroll');

}
closeComments()
{
  this.showComments=-1;
  document.body.classList.remove('no-scroll');

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
  this._FireService.getLike(docId,likes,postOwnerId,notNums);

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
  return item.id;
}

////////////////
comment:string='';
sendComment(postId:string,ownerId:string)
{
if(this.comment)
{

 const  me={
    image:localStorage.getItem("userImg"),
    id:localStorage.getItem('userId'),
    name:localStorage.getItem("userName"),
    type:'comment',
    postId:postId,
    comment:this.comment,
    date:new Date()
  }
this._CommentService.sendComment(postId,me).subscribe({
  next:(res)=>{
  
    this.clearComment();
    this._CommentService.sendNotifection(ownerId,postId);
    this._FireService.inc_Dec_Notifucation(ownerId,this._FireService.notifNumber.getValue());
  },
  error:(error)=>{
    console.log(error);
  }
})

}
}
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
