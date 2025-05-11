
import { pipe, Subscription, take } from 'rxjs';
import { serverTimestamp } from '@angular/fire/firestore';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
export class SendRequstComponent implements OnInit,OnDestroy {
myId=localStorage.getItem("userId")||'';
@Input() resiverId:string='';
@Input() personName:string='';
@Input() personImage:string='';
 frinds:any[]=[];




private subscribtion:Subscription[]=[];
constructor( private _FireService:FireService, private _MyDataService:MyDataService, private _LikeCommentService:LikeCommentService)
{
  this.myId=localStorage.getItem("userId")||'';

}
 ngOnInit(): void {
  this._MyDataService.setMyData();
    this.user=this._MyDataService.userData; 
   this. getMyData();
  this.getResiverPeople();
  this.getSenderPeople();
  
this.getMyFrinds();
 }


 getMyData()
 {
 this.subscribtion.push(
   this._FireService.getMyData(this.myId).subscribe({
     next:(res)=>{
 
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
 console.log(this.user);
 console.log(this.resiverId);
    const reqData={senderId:this.myId,resiverId:this.resiverId,userImg:this.user.image,userName:this.user.name,date:serverTimestamp()};
  const date=new Date();
    this._FireService.addFrind(reqData).subscribe({
      next:(res)=>{
   this._LikeCommentService.sendFrindRequstNotif(this.user,`${this.user.name} Sended request to you`,this.resiverId);
  this._LikeCommentService.inAndDisNotifNumber(this.resiverId);

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
    return this.myFrins.includes(this.resiverId);

  
  
  }
  
  
  CancleRequest() // مهمه جدا 
  {
    const newArray=this.senderPeople.filter(x=>x.senderId===this.resiverId);
  const docId=newArray[0].docId;
  
  const collectionName='frindsRequst';
  this._FireService.deleteDoc(collectionName,docId);
  this.isImResived=false;
    
  }
  
  
  AcceptRequst()
  {
    this._MyDataService.setMyData();
    this.user=this._MyDataService.userData; 
  
const frindShip=
{
userId:this.user.id,
frindId:this.resiverId,
frindName:this.personName,
frindImage:this.personImage
}

this._FireService.acceptTheRequest(frindShip);
  }
  AcceptRequst2()
  {
    this._MyDataService.setMyData();
    this.user=this._MyDataService.userData; 
  
const frindShip=
{
userId:this.resiverId,
frindId:this.user.id,
frindName:this.user.name,
frindImage:this.user.image
}

this._FireService.acceptTheRequest2(frindShip);
  }
  myFrins:any[]=[];
  getMyFrinds()
  {
   
  this.subscribtion.push(
    this._FireService.getMyFrinds(this.user.id).pipe(take(1)).subscribe({
      next:(res)=>{

this.myFrins=res.map((f:any)=>f.frindShip.frindId);

      }
    })
  )
  }

  ngOnDestroy(): void {
    this.subscribtion.forEach(sub=>sub.unsubscribe);
  }
}
