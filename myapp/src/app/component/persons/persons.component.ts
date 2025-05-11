import { Router, RouterModule } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

import { FireService } from '../../fire.service';
import { zoomInOut } from '../../animation';
import { Observable, Subscription } from 'rxjs';
import { SendRequstComponent } from '../../send-requst/send-requst.component';


@Component({
  selector: 'app-persons',
  imports: [CommonModule,RouterModule,SendRequstComponent],
  templateUrl: './persons.component.html',
  styleUrl: './persons.component.scss',
  animations:[zoomInOut]
})
export class PersonsComponent implements OnInit,OnDestroy {
 isSubscribe!:Subscription
  userId: string = '';
  noresult: boolean = false;
  myId:string='';
  usersData: any[] = [];
  usersDataShowing:any[]=[];

  constructor(
   
    private _AuthService: AuthService,
    private _Router: Router,
private _FireService:FireService
  ) {
   
  }

  ngOnInit(): void {
    this._AuthService.isLogged.next(true);
    this.getPersonsData();
    this.myId=localStorage.getItem('userId')||'';
  }

  searchUsers(event: any): void {

    this.noresult = false;
    const query = event.target.value.toLowerCase();

    
    if(!query)
    {
      this.usersDataShowing=this.usersData;
    }
    else
    {
      this.usersDataShowing = this.usersData.filter((x) =>
        x.fullName?.toLowerCase().includes(query)
      );
      if (this.usersDataShowing.length === 0) {
        this.noresult = true;
      }
    }}
 
    getPersonsData()
    {
      this.isSubscribe=this._FireService.getCollection('users').subscribe({
        next:(res)=>{
          this.usersData=res;
          this.usersDataShowing=this.usersData;


        }
      })
    }

//   userProfile(id: string): void {

// localStorage.setItem('personId',id);
// this._Router.navigate(['/userProfile']);
//   }
  trackById(index:number,item:any)
  {
return item.docId;
  }
  ngOnDestroy():void
  {
if(this.isSubscribe)
{
this.isSubscribe.unsubscribe();

  }
}}