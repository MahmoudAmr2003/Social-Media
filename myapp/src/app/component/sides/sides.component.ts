import { LikeCommentService } from './../../like-comment.service';
import { Component, OnDestroy } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedmoduleModule } from '../../sharedmodule/sharedmodule.module';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FireService } from '../../fire.service';
import {MatBadgeModule} from '@angular/material/badge';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-sides',
  imports: [SharedmoduleModule,MatBadgeModule,MatIconModule,NgbModule],
  templateUrl: './sides.component.html',
  styleUrl: './sides.component.scss'
})
export class  SidesComponent implements OnDestroy {
 
  

imgUrl:string='';
  show_menue:boolean=false;
  showDash=localStorage.getItem("userId");
myId=localStorage.getItem('userId')||'';

constructor(private _AuthService:AuthService, private _Router:Router, private _FireService:FireService ,private _LikeCommentService:LikeCommentService)
{

}
  userData:any;
ngOnInit():void
{




this.getmyData();

}
notifNum:number=0;
getmyData()
{
  const myId=localStorage.getItem("userId")||''
this._FireService.getMyData(myId).subscribe({
  next:(res)=>{
  
this.imgUrl=res.img1;
this.notifNum=res.notifNum;

  }
})
}
showMenue()
{
  this.show_menue=!this.show_menue;

}
logOut()
{
  this._AuthService.isUserDataCame.next(false);
  localStorage.removeItem("userId");
 localStorage.removeItem('user');
  localStorage.removeItem("userDataTaken");
  this._AuthService.logOut();
}


gotoEdite()
{
  this._AuthService.isUserDataCame.next(true);
  this._AuthService.isLogged.next(true);

this._Router.navigate(['/add_data']);
}
ngOnDestroy(): void {
  this.show_menue=false;
}
scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
 routeTo(path:string)
 {
this._Router.navigate([`/${path}`]);
this.scrollToTop();
this.show_menue=false;
 }
clearNotifNums()
{
  this._Router.navigate(['/notif']);
  this._LikeCommentService.clearNotifs(this.myId);
  
}
}
