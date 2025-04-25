
import { Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FireService } from '../fire.service';
import { zoomInOut } from '../animation';
import { Subscription } from 'rxjs';
import { CloudinaryService } from '../cloudinary.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ThePostComponent } from '../the-post/the-post.component';
import {MatButtonModule} from '@angular/material/button';
import { AddPostStyleComponent } from '../add-post-style/add-post-style.component';
import { FrindsComponent } from '../frinds/frinds.component';

@Component({
  selector: 'app-profile',
imports: [FormsModule,CommonModule, FormsModule,RouterModule,NgbModule,ThePostComponent,MatButtonModule,AddPostStyleComponent,FrindsComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
animations:[zoomInOut]

})
export class ProfileComponent implements OnDestroy {
private subscription:Subscription[]=[]

show_menue:boolean=false;


 index:number|null=null;
menuNum:number=-1;
getMenuNum(index:number)
{
this.menuNum=index;
}
  
id:string=localStorage.getItem("userId")||'';

profilData:any={};
 constructor(private _AuthService:AuthService, private _FireService:FireService, private _CloudinaryService:CloudinaryService ){
  
  _AuthService.isLogged.next(true);
 }



ngOnInit()
{

this.getmyInfo();
this.getMyPosts();
}


notNum:number=0;
getmyInfo()
{ 
  const id=localStorage.getItem('userId')||'';
this.subscription.push(
  this._FireService.getMyData(id).subscribe({
    next:(res)=>{
      this.notNum=res.notifNums;
  this.profilData=res;

  
    },
    error:(error)=>{
  alert(`Eror:  ${error}`);
    }
   }) 
)
}
show_dialog:boolean=false

post:string='';

myPosts:any[]=[];
mySortedPosts:any[]=[];


load:boolean=false;

allPosts:any[]=[];
getMyPosts()
{
  const condition="=="
this.subscription.push(
  this._FireService.getQuery('posts','userData.id',condition,this.id).subscribe({
    next:(res)=>{
      
this.allPosts=res;
    }
  })
)
}





ngOnDestroy(): void {
  this.subscription.forEach(sub=>sub.unsubscribe());
 
}

}






