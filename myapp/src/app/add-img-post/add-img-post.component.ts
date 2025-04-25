import { FireService } from './../fire.service';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CloudinaryService } from '../cloudinary.service';
import { LoadingComponent } from '../loading/loading.component';
import { Router } from '@angular/router';
import { zoomInOut } from '../animation';
import { MyDataService } from '../my-data.service';

@Component({
  selector: 'app-add-img-post',
  imports: [CommonModule,FormsModule,LoadingComponent],
  templateUrl: './add-img-post.component.html',
  styleUrl: './add-img-post.component.scss',
  animations:[zoomInOut]
})
export class AddImgPostComponent implements OnInit {
  @Output() sended=new EventEmitter<string>();

  constructor(private _CloudinaryService:CloudinaryService, private _FireService:FireService , private _Router:Router, private _MyDataService:MyDataService)
  {
    _MyDataService.setMyData();
  }

ngOnInit(): void {
  this.getmyInfo();
}
  profilData:any={};
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
  imgUrl:string='';
  realImgUrl:string='';
cabtion:string='';

creat_Url(file:HTMLInputElement)
{
const theFile=file.files?.item(0);
if(theFile)
{
  this.imgUrl=URL.createObjectURL(theFile);
}
}
uploadimages(file:HTMLInputElement)
{
  this.showSpinner=true;

const theFile=file.files?.item(0);
if(theFile)
{
  this._CloudinaryService.uplodImg(theFile).subscribe({
  next:(res)=>{
this.realImgUrl=res.secure_url;
this.senPost();
    },
    error:(error)=>{

    }
  })
}
}
showSpinner:boolean=false;

senPost()
{
  const userData=this._MyDataService.userData;
 
const date=new Date();
const dataOfPost={userData,date:date,imgUrl:this.realImgUrl,cabtio:this.cabtion,likeCount:0,commentCount:0};
this._FireService.sendPost(dataOfPost);

this.clear();
this.sended.emit('');
}


clear()
{
  
  this.realImgUrl='';
  this.imgUrl='';
  this.cabtion='';
this.showSpinner=false;
this._Router.navigate(['/home']);
}
}
