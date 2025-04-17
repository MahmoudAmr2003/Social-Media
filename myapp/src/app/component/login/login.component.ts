
import { Component, ChangeDetectionStrategy, signal, ViewChild, ElementRef, input, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { SharedmoduleModule } from '../../sharedmodule/sharedmodule.module';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingComponent } from '../../loading/loading.component';

import { ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { FireService } from '../../fire.service';


@Component({
  selector: 'app-login',
  imports: [SharedmoduleModule,LoadingComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true
})
export class LoginComponent implements OnChanges,OnDestroy {
  isSubscribe!:Subscription;
  @ViewChild('email') email!:ElementRef;
// num:number=0;
mahmoud:string='Mahmoud';
  userDataArray:any;
  login=new FormGroup({
    email:new FormControl(null,[Validators.email,Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'),Validators.required]),
    password:new FormControl(null,[Validators.minLength(5),Validators.maxLength(20),Validators.pattern('^[a-zA-Z0-9\u0621-\u064A\u0660-\u0669]+$'),Validators.required]),
  })
  
  constructor(private _AuthService:AuthService, private _Router:Router,private cd:ChangeDetectorRef, private _FireService:FireService)
  {
  }
  ngOnChanges(): void {
  
  }
load:boolean=false;

  loginForm(login:FormGroup)

  {
this.load=true;
this.isSubscribe= this._AuthService.login(login.value).subscribe(
    {
    next:(response)=>{
  this.load=false;
  
      this._AuthService.isLogged.next(true);
    localStorage.setItem("userDataTaken","done");
    this._Router.navigate(['/home']);
    localStorage.setItem("userId",response.localId);
this.getmyInfo();


     
},
error:(error)=>{
  this.load=false;
  this.cd.detectChanges();
alert("Error");
}

  }
)


}


subscription:any[]=[];

profilData:any={};
getmyInfo()
{ 
  const id=localStorage.getItem('userId')||'';
this.subscription.push(
  this._FireService.getMyData(id).subscribe({
    next:(res)=>{
      
  this.profilData=res;
  localStorage.setItem("userImg",res.img1);
  localStorage.setItem("userName",res.fullName);
  localStorage.setItem("userId",res.userId);


  
    },
    error:(error)=>{
  alert(`Eror:  ${error}`);
    }
   }) 
)
}






    eye:string='visibility';
  // 
  hide = signal(true);
  clickEvent(event: MouseEvent) {
if(this.eye=="visibility")
{
  this.eye="visibility_off"
}
  else if( this.eye=="visibility_off")
  {
    this.eye="visibility"
  
}
    this.hide.set(!this.hide());
    
    event.stopPropagation();
  }


  getMyData()
  {

  }
  ngOnDestroy(): void {
    if(this.isSubscribe)
    {
    this.isSubscribe.unsubscribe();
  }}

}
