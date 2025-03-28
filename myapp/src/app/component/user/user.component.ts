import { Component,OnDestroy,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FireService } from '../../fire.service';
import { serverTimestamp, collection } from '@angular/fire/firestore';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import { Subscription } from 'rxjs';
import { zoomInOut } from '../../animation';
import { ActivatedRoute } from '@angular/router';
import { ThePostComponent } from '../../the-post/the-post.component';

@Component({
  selector: 'app-user',
  imports: [CommonModule,MatTabsModule,MatCardModule,ThePostComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  animations:[zoomInOut]
})
export class  UserComponent implements OnInit, OnDestroy {
  private subscribtion:Subscription[]=[];
userId:string='';
   userFrinds:any[]=[];
myId:string=localStorage.getItem("userId")||'';

  profileData:any={};
  userPosts:any[]=[];
  constructor( private _FireService:FireService, private _ActivatedRoute:ActivatedRoute)
  {
this.userId=_ActivatedRoute.snapshot.params['id'];

  }
  ngOnInit()
  {
  this.getUserData();
  this.getUserPosts();
  this.getResiverPeople();
  this.getSenderPeople();
this.getMyData();
  }
  notNum:number=0;
  getUserData()
  {
 if(this.userId!=null)
 {
  this.subscribtion.push(
    this._FireService.getMyData(this.userId).subscribe({
      next:(res)=>{
  
  this.profileData=res;
  this.userFrinds=this.profileData.frinds;
  this.notNum=res.notifNums;
  
      }
     })
  
  )

    
    
 }

  }
  getUserPosts()
  {
    const condition="=="
  this.subscribtion.push(
    this._FireService.getQuery('posts','id',condition,this.userId).subscribe({
      next:(res)=>{
        
this.userPosts=res;
      }
    })
  )
  }

sendRequest()
{

  const resiverId=localStorage.getItem("personId")||'';
  const userImg=localStorage.getItem("userImg");
  const userName=localStorage.getItem("userName");
  const reqData={senderId:this.myId,resiverId:resiverId,userImg:userImg,userName:userName,date:serverTimestamp()};
const date=new Date();
  this._FireService.addFrind(reqData);
  const message='A friend request has been sent to you by';
  console.log(this.notNum);
  this._FireService.sendNotifection(resiverId,{userImg:userImg,userName:userName,date,message:message,senderId:this.myId});
this.inc_Dec_Notifucation();

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
    console.log(res);
this.senderPeople=res;
this.check_If_This_Person_Send_To_Me();


  }
  
})
)
}


isISended:boolean=false;
check_If_ISend_To_This_Person():boolean
{
  console.log(this.userId);
 this.isISended=this.resivedPoeple.some(des=>  des.resiverId===this.userId);
 return this.isISended;
}
isImResived:boolean=false;
check_If_This_Person_Send_To_Me():boolean
{
 this.isImResived=this.senderPeople.some(des=>des.senderId===this.userId);
 return this.isImResived;
}


isMyfrind:boolean=false;
frinds:any[]=[];
getMyData()
{
this.subscribtion.push(
  this._FireService.getMyData(this.myId).subscribe({
    next:(res)=>{
  this.frinds=res.frinds||[];
  console.log(this.frinds);
  this.check_If_The_Person_Myfrind();

    }
  })
)
}
check_If_The_Person_Myfrind():boolean
{
  if(this.frinds.length!=0)
  {
this.isMyfrind=this.frinds.some(des=>des.frindId===this.userId);
console.log(this.isMyfrind);
return this.isMyfrind;
}
else
{
  return false;
}
}


CancleRequest() // مهمه جدا 
{
  const newArray=this.senderPeople.filter(x=>x.senderId===this.userId);
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
  const senderId=localStorage.getItem("userId");
  const userImg=localStorage.getItem("userImg");
  const userName=localStorage.getItem("userName");
  const date=new Date();
const message='The request has been accspted by '

  const frindData={frindId:senderId,frindImg:userImg,frindName:userName,message:message,senderId:senderId};
  this._FireService.acceptRequest(this.userId,frindData);

this._FireService.sendNotifection(this.userId,{userImg:userImg,userName:userName,date,message:message,senderId:this.myId});
this.inc_Dec_Notifucation();
}

trackById(index:number,item:any)
{
return item.docId;
}

trackById2(index:number,item:any)
{
return item.frindId;
}

inc_Dec_Notifucation()
{
  this._FireService.inc_Dec_Notifucation(this.userId,this.notNum);
}



ngOnDestroy(): void {
  
  this.subscribtion.forEach(sub=>sub.unsubscribe());
}

}
