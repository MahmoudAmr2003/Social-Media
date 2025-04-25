import { Frinds } from './../frinds';
import { Subscription } from 'rxjs';
import { serverTimestamp } from '@angular/fire/firestore';
import { Component, Input, OnInit } from '@angular/core';
import { FireService } from '../fire.service';
import { CommonModule } from '@angular/common';
import { MyDataService } from '../my-data.service';
import { LikeCommentService } from '../like-comment.service';

@Component({
  selector: 'app-send-requst',
  imports: [CommonModule],
  templateUrl: './send-requst.component.html',
  styleUrl: './send-requst.component.scss'
})
export class SendRequstComponent implements OnInit {
myId=localStorage.getItem("userId")||'';
@Input() resiverId:string='';
@Input() notNum:number=0;
@Input() personName:string='';
@Input() personImage:string='';
 frinds:any[]=[];




private subscribtion:Subscription[]=[];
constructor( private _FireService:FireService, private _MyDataService:MyDataService, private _LikeCommentService:LikeCommentService)
{
  this.myId=localStorage.getItem("userId")||'';

}
 ngOnInit(): void {
   this. getMyData();
  this.getResiverPeople();
  this.getSenderPeople();
  

 }


 getMyData()
 {
 this.subscribtion.push(
   this._FireService.getMyData(this.myId).subscribe({
     next:(res)=>{
   this.frinds=res.frinds||[];

   this.check_If_The_Person_Myfrind();
 
     }
   })
 )
 }
user:any={};
  sendRequest()
  {
    this._MyDataService.setMyData();
  this.user=this._MyDataService.userData;
  
    const reqData={senderId:this.myId,resiverId:this.resiverId,userImg:this.user.image,userName:this.user.name,date:serverTimestamp()};
  const date=new Date();
    this._FireService.addFrind(reqData).subscribe({
      next:(res)=>{
   this._LikeCommentService.sendFrindRequstNotif(this.user,`${this.user.name} Sended request to you`,this.resiverId);
  this._LikeCommentService.inAndDisNotifNumber(this.user.id);

      },
      error:(error)=>{
   
      }
    })
    const message='A friend request has been sent to you by';
    

  
  }
  resivedPoeple:any[]=[];
  
  getResiverPeople()
  {
  this.subscribtion.push(
    
  this._FireService.getQuery('frindsRequst','senderId','==',this.myId).subscribe({
    next:(res)=>{
   
  this.resivedPoeple=res;
  this.check_If_ISend_To_This_Person();
  
  
    }
    
  })
  )
  }
  
  senderPeople:any[]=[];
  getSenderPeople()
  {
  this.subscribtion.push(
    
  this._FireService.getQuery('frindsRequst','resiverId','==',this.myId).subscribe({
    next:(res)=>{

  this.senderPeople=res;
  this.check_If_This_Person_Send_To_Me();
  
  
    }
    
  })
  )
  }
  
  
  isISended:boolean=false;
  check_If_ISend_To_This_Person():boolean
  {
  
   this.isISended=this.resivedPoeple.some(des=>  des.resiverId===this.resiverId);
   return this.isISended;
  }
  isImResived:boolean=false;
  check_If_This_Person_Send_To_Me():boolean
  {
   this.isImResived=this.senderPeople.some(des=>des.senderId===this.resiverId);
   return this.isImResived;
  }
  
  
  isMyfrind:boolean=false;
  
  check_If_The_Person_Myfrind():boolean
  {
    if(this.frinds.length!=0)
    {
  this.isMyfrind=this.frinds.some(des=>des.frindId===this.resiverId);
  
  return this.isMyfrind;
  }
  else
  {
    return false;
  }
  }
  
  
  CancleRequest() // مهمه جدا 
  {
    const newArray=this.senderPeople.filter(x=>x.senderId===this.resiverId);
  const docId=newArray[0].docId;
  console.log(docId);
  const collectionName='frindsRequst';
  this._FireService.deleteDoc(collectionName,docId);
  this.isImResived=false;
    console.log(newArray);
  }
  AcceptRequestToMe(frindId:string,frindImg:string,frindName:string)
  {
    const id =localStorage.getItem('userId')||'';
    const frindData={frindId:frindId,frindImg:frindImg,frindName:frindName};
    this._FireService.acceptRequest(id,frindData);

  
  }
  
  AcceptRequestToFrind()
  {
    this._MyDataService.setMyData();
    this.user=this._MyDataService.userData;
    const senderId=localStorage.getItem("userId")||'';
    const date=new Date();
  const message='The request has been accspted by '
    const frindData={frindId:senderId,frindImg:this.user.image,userName:this.user.name,message:message,senderId:senderId};
    this._FireService.acceptRequest(this.resiverId,frindData);
   this._LikeCommentService.sendFrindRequstNotif(this.user,`Accepted your requrst`,this.resiverId);
  this._LikeCommentService.inAndDisNotifNumber(senderId);
  }
  
  
}
