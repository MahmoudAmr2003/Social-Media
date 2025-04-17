import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FireService } from '../fire.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';


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
  constructor(private _FireService:FireService, private _Router:Router){}
 
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

  const me={
    image:localStorage.getItem("userImg"),
    id:localStorage.getItem('userId'),
    name:localStorage.getItem("userName")
  }
  console.log(me);
const date=new Date();
const dataOfPost={id:me.id,post:this.post,postOwnerName:me.name,postOwnerImg:me.image,date:date};
this._FireService.sendPost(dataOfPost);

this.clear();
}
}
