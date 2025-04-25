
import { CommonModule } from '@angular/common';
import { Component,ElementRef,Input,OnDestroy,OnInit } from '@angular/core';
import { FrindsrequestsComponent } from '../component/frindsrequests/frindsrequests.component';
import { FireService } from '../fire.service';
import { Router } from '@angular/router';
import { zoomInOut } from '../animation';
import { Subscription } from 'rxjs';
import { hide } from '@popperjs/core';
import { sub } from 'date-fns';
@Component({
  selector: 'app-frinds',
  imports: [CommonModule,CommonModule,FrindsrequestsComponent],
  templateUrl: './frinds.component.html',
  styleUrl: './frinds.component.scss',
  animations:[zoomInOut]
})

export class FrindsComponent implements OnInit,OnDestroy {
  isSubcribe!:Subscription;
  id=localStorage.getItem('userId')||'';
  @Input() myId:string='';
  showAllFrinds:boolean=false;
 constructor(private _FireService:FireService, private _Router:Router){

 }
myFrinds:any[]=[];

searchedFrinds:any[]=[];
 ngOnInit(): void {
this.getMyFrinds();
 }
 subs!:Subscription;
 getMyFrinds()
 {
this.subs=  this._FireService.getMyFrinds(this.myId).subscribe({
  next:(res)=>{
this.myFrinds=res;
this.searchedFrinds=this.myFrinds;
console.log(this.myFrinds);
  }
})
 }
 state:string='show';
 showAll()
 {
  this.showAllFrinds=!this.showAllFrinds;
  if(this.state=='show')
  {
    this.state='hide';

  }
  else
  {
    this.state='show';
  }
 }

 search(frind:HTMLInputElement)
 {
this.searchedFrinds=this.myFrinds.filter(word=>word.frindShip.frindName.includes(frind.value));
 }
 trackById(index:number,item:any)
 {
return item.frindShip.userId;
 }


 ngOnDestroy(): void {
   this.subs.unsubscribe();
 }
}
