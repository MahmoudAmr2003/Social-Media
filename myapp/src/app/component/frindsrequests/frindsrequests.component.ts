
import { Component,OnDestroy,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FireService } from '../../fire.service';
import { SendRequstComponent } from '../../send-requst/send-requst.component';
import { Subscription } from 'rxjs';







@Component({
  selector: 'app-frindsrequests',
  standalone:true,
  imports: [CommonModule,SendRequstComponent],
  templateUrl: './frindsrequests.component.html',
  styleUrl: './frindsrequests.component.scss',
 
})
export class  FrindsrequestsComponent implements OnDestroy{
  myRequsts:any[]=[];
myId=localStorage.getItem('userId')||'';
subs:Subscription[]=[];
  constructor(private _FireService:FireService){}

ngOnInit(){
  this.getMyRequests();
}
notifNum:number=0;
getMyRequests()
{
this.subs.push(
  this._FireService.getQuery('frindsRequst','resiverId','==',this.myId).subscribe({
    next:(res)=>{
    
      this.myRequsts=res;
    }
  })
  
)
this.subs.push(
  this._FireService.getMyData(this.myId).subscribe({
    next:(res)=>{
  this.notifNum=res.notifNums;
    }
  })
)
}
ngOnDestroy(): void {
  
  this.subs.forEach(sub=>sub.unsubscribe());
}

}

