
import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FireService } from '../../fire.service';







@Component({
  selector: 'app-frindsrequests',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './frindsrequests.component.html',
  styleUrl: './frindsrequests.component.scss',
 
})
export class FrindsrequestsComponent {
  myRequsts:any[]=[];
myId=localStorage.getItem('userId')||'';
  constructor(private _FireService:FireService){}

ngOnInit(){
  this.getMyRequests();
}
notifNum:number=0;
getMyRequests()
{
  this._FireService.getQuery('frindsRequst','resiverId','==',this.myId).subscribe({
    next:(res)=>{
      console.log(res);
      this.myRequsts=res;
      console.log(this.myRequsts);
    }
  })
  
this._FireService.getMyData(this.myId).subscribe({
  next:(res)=>{
this.notifNum=res.notifNums;
  }
})
}
cancleRequest(id:string)
{
this._FireService.deleteDoc('frindsRequst',id);
}


AccebtReqTome(frindId:string,frindImg:string,frindName:string)
{
  const frindData={frindId:frindId,frindImg:frindImg,frindName:frindName};
  this._FireService.acceptRequest(this.myId,frindData);

}

AcceptRequestToFrind(frindId:string)
{
  const senderId=localStorage.getItem("userId");
  const userImg=localStorage.getItem("userImg");
  const userName=localStorage.getItem("userName");
  const date=new Date();
const message='The request has been accspted by '
  const frindData={frindId:senderId,frindImg:userImg,frindName:userName};
  const notif={userImg:userImg,userName:userName,date:date,message:message}
  this._FireService.acceptRequest(frindId,frindData);
  const notifType='acceptedRequests'



}
}

