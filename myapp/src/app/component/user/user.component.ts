import { Component,OnDestroy,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FireService } from '../../fire.service';
import { serverTimestamp, collection } from '@angular/fire/firestore';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import { Subscription } from 'rxjs';
import { zoomInOut } from '../../animation';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ThePostComponent } from '../../the-post/the-post.component';
import { SendRequstComponent } from '../../send-requst/send-requst.component';
import { FrindsComponent } from '../../frinds/frinds.component';

@Component({
  selector: 'app-user',
  imports: [CommonModule,MatTabsModule,MatCardModule,ThePostComponent,SendRequstComponent,FrindsComponent,RouterModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  animations:[zoomInOut]
})
export class  UserComponent implements OnInit, OnDestroy {
  private subscribtion:Subscription[]=[];
userId:string='';
   userFrinds:any[]=[];
myId:string=localStorage.getItem("userId")||'';

  profileData:any={};
  userPosts:any[]=[];
  constructor( private _FireService:FireService, private _ActivatedRoute:ActivatedRoute)
  {
// this.userId=_ActivatedRoute.snapshot.params['id'];
this.scrollToTop();

  }
  ngOnInit()
  {
    this._ActivatedRoute.paramMap.subscribe(params => {
      this.userId = params.get('id')!;
  this.getUserData();
      
    });
  this.getUserPosts();


  }
  notNum:number=0;


  scrollToTop()
  {
    window.scrollTo({top:0,behavior:'smooth'});
  }
  getUserPosts()
  {
    const condition="=="
  this.subscribtion.push(
    this._FireService.getQuery('posts','userData.id',condition,this.userId).subscribe({
      next:(res)=>{
        
this.userPosts=res;
      }
    })
  )
  }


  getUserData()
  {
 if(this.userId!=null)
 {
  this.subscribtion.push(
    this._FireService.getMyData(this.userId).subscribe({
      next:(res)=>{
  
  this.profileData=res;
  this.userFrinds=this.profileData.frinds;
  this.notNum=res.notifNums;
  
      }
     })
  
  )

    
    
 }

  }


trackById(index:number,item:any)
{
return item.docId;
}

trackById2(index:number,item:any)
{
return item.frindId;
}



ngOnDestroy(): void {
  
  this.subscribtion.forEach(sub=>sub.unsubscribe());
}


}
