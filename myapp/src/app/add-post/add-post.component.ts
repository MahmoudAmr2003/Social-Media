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
  colorArray = [
    "#1abc9c", // Turquoise
  "#2ecc71", // Emerald
  "#3498db", // Peter River
  "#9b59b6", // Amethyst
  "#34495e", // Wet Asphalt
  "#16a085", // Green Sea
  "#27ae60", // Nephritis
  "#2980b9", // Belize Hole
 
  
    
  ];
  
post:string='';
postbgColor:string='';
  
clear()
{
  this.post='';
  this.postbgColor='';
  this.showSpinner=false;

  this._Router.navigate(['/home'])
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
 @ViewChild('textarea') textarea!:ElementRef<HTMLDialogElement>;

changColorOfTextarea(backGrounColor:string)
{
  this.postbgColor=backGrounColor;
this.textarea.nativeElement.style.color=`${backGrounColor}`;

}
showSpinner:boolean=false;

senPost()
{
this.showSpinner=true;
  const me={
    image:localStorage.getItem("userImg"),
    id:localStorage.getItem('userId'),
    name:localStorage.getItem("userName")
  }
const date=new Date();
const dataOfPost={id:me.id,post:this.post,postOwnerName:me.name,postOwnerImg:me.image,postBg:this.postbgColor,date:date};
this._FireService.sendPost(dataOfPost);

this.clear();
}
}
