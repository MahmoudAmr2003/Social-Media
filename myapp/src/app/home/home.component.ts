
import { Subscription } from 'rxjs';
import { FireService } from './../fire.service';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { zoomInOut } from '../animation';
import { Router, RouterModule } from '@angular/router';
import { AddPostStyleComponent } from '../add-post-style/add-post-style.component';
import { ThePostComponent } from '../the-post/the-post.component';
import { FrindsComponent } from '../frinds/frinds.component';
import { AuthService } from '../services/auth.service';
import { MyDataService } from '../my-data.service';


@Component({
  selector: 'app-home',
  imports: [CommonModule,RouterModule,AddPostStyleComponent,ThePostComponent,FrindsComponent  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations:[zoomInOut]
})
export class HomeComponent implements OnInit,OnDestroy {
  myId=localStorage.getItem('userId')||'';
  myData:object={};
  allPosts:any[]=[];
  private isSubscribe:Subscription[]=[];
constructor(private _FireService:FireService, private _Router:Router,private _AuthService:AuthService, private _MyDataService:MyDataService)
{
}
ngOnInit(): void {
    const shouldReload = localStorage.getItem('reloadOnce');

  if (shouldReload === 'true') {
    localStorage.removeItem('reloadOnce'); // نحذفه عشان متعملش ريلود تاني
    window.location.reload();
  }
this._AuthService.isLogged.next(true);  
this.getMyData();

this.getPosts();
}
notNum:number=0;
frinds:any[]=[];
myNewFrinds:any[]=[];

getMyData()
{
this.isSubscribe.push(
  
this._FireService.getMyData(this.myId).subscribe({
  next:(res)=>{
 
this.myData=res;
localStorage.setItem('user',JSON.stringify(res));
this._MyDataService.setMyData();
  }
})
)
}


// like styling


ngOnDestroy(): void {
  this.isSubscribe.forEach(sub=>sub.unsubscribe());
}


    searchAboutFrinds(event:any)
    {
  
   this.myNewFrinds=this.frinds.filter((x)=>{
     return x.frindName.toUpperCase().includes(event.target.value.toUpperCase());
   })
    }


    sortedPosts:any[]=[];
getPosts()
{
this.isSubscribe.push(
  this._FireService.getCollection('posts').subscribe({
    next:(res)=>{

this.allPosts=res;

this.sortedPosts=this.allPosts.sort((a,b)=>b.date?.seconds-a.date?.seconds);
    }
  })
)
}
}
