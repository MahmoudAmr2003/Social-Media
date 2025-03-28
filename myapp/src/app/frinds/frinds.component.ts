
import { CommonModule } from '@angular/common';
import { Component,ElementRef,OnDestroy,OnInit, ViewChild } from '@angular/core';
import { FrindsrequestsComponent } from '../component/frindsrequests/frindsrequests.component';
import { FireService } from '../fire.service';
import { Router } from '@angular/router';
import { zoomInOut } from '../animation';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-frinds',
  imports: [CommonModule,CommonModule,FrindsrequestsComponent  ],
  templateUrl: './frinds.component.html',
  styleUrl: './frinds.component.scss',
  animations:[zoomInOut]
})

export class FrindsComponent implements OnInit,OnDestroy {
  isSubcribe!:Subscription;
  myId=localStorage.getItem('userId')||'';
myFrinds:any[]=[];
myNewFrinds:any[]=[];
 constructor(private _FireService:FireService, private _Router:Router){

 }

 ngOnInit(): void {
this.getMyFrinds();
 }
 searchAboutFrinds(event:any)
 {
console.log(event.target.value);
this.myNewFrinds=this.myFrinds.filter((x)=>{
  return x.frindName.includes(event.target.value);
})
 }
 notifNum:number=0;
 getMyFrinds()
 {
this.isSubcribe= this._FireService.getMyData(this.myId).subscribe({
  next:(res)=>{
this.myFrinds=res.frinds||[];
this.myNewFrinds=this.myFrinds;
console.log(this.myFrinds);
  }
})
 }

 
 userProfile(id: string): void {
  console.log(id);
  localStorage.setItem('personId',id);
  this._Router.navigate(['/userProfile']);
    }
    ngOnDestroy(): void {
      
      if(this.isSubcribe)
      {
        this.isSubcribe.unsubscribe();
      }
    }
    trackById(index:number,item:any)
    {
return item.frindId;
    }
}
