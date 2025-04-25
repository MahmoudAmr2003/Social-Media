
import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FireService } from '../../fire.service';
import { SendRequstComponent } from '../../send-requst/send-requst.component';







@Component({
  selector: 'app-frindsrequests',
  standalone:true,
  imports: [CommonModule,SendRequstComponent],
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


}

