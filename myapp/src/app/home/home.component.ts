
import { Subscription } from 'rxjs';
import { FireService } from './../fire.service';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { zoomInOut } from '../animation';
import { Router, RouterModule } from '@angular/router';
import { AddPostStyleComponent } from '../add-post-style/add-post-style.component';
import { ThePostComponent } from '../the-post/the-post.component';


@Component({
  selector: 'app-home',
  imports: [CommonModule,RouterModule,AddPostStyleComponent,ThePostComponent  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations:[zoomInOut]
})
export class HomeComponent implements OnInit,OnDestroy {
  myId=localStorage.getItem('userId')||'';
  myData:object={};
  allPosts:any[]=[];
  private isSubscribe:Subscription[]=[];
constructor(private _FireService:FireService, private _Router:Router)
{

}
ngOnInit(): void {
  
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
this.frinds=res.frinds;
this.myNewFrinds=this.frinds;




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
   console.log(event.target.value);
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
