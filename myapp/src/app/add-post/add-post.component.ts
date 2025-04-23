
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FireService } from '../fire.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MyDataService } from '../my-data.service';


@Component({
  selector: 'app-add-post',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.scss'
})
export class AddPostComponent implements OnInit {

  profilData:any={};
  
ngOnInit(): void {
this.getmyInfo();
  
}
  constructor(private _FireService:FireService, private _Router:Router,private _MyDataService:MyDataService){
this._MyDataService.setMyData();

  }
 
post:string='';
postbgColor:string='';
  
clear()
{
  this.post='';
  
}
getmyInfo()
{ const id=localStorage.getItem('userId')||'';

  this._FireService.getMyData(id).subscribe({
    next:(res)=>{

  this.profilData=res;

    },
    error:(error)=>{
  alert(`Eror:  ${error}`);
    }
   }) 

}
 

senPost()
{
  const userData=this._MyDataService.userData;
  console.log(userData);
const date=new Date();
const dataOfPost={userData,post:this.post,date:date,likeCount:0,commentCount:0};
this._FireService.sendPost(dataOfPost);

this.clear();
}
}
