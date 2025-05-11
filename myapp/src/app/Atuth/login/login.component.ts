
import { Component, ChangeDetectionStrategy, signal, ViewChild, ElementRef, input, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { SharedmoduleModule } from '../../sharedmodule/sharedmodule.module';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingComponent } from '../../loading/loading.component';
import { MatButtonModule }               from '@angular/material/button';

import { ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { FireService } from '../../fire.service';
import { MyDataService } from '../../my-data.service';


@Component({
  selector: 'app-login',
  imports: [SharedmoduleModule,LoadingComponent,MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true
})
export class LoginComponent implements OnChanges,OnDestroy {
  hh:any;

  isSubscribe!:Subscription;
  @ViewChild('email') email!:ElementRef;
// num:number=0;
mahmoud:string='Mahmoud';
  userDataArray:any;
  login=new FormGroup({
    email:new FormControl(null,[Validators.email,Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'),Validators.required]),
    password:new FormControl(null,[Validators.minLength(5),Validators.maxLength(20),Validators.pattern('^[a-zA-Z0-9\u0621-\u064A\u0660-\u0669]+$'),Validators.required]),
  })
  constructor(private _AuthService:AuthService, private _Router:Router,private cd:ChangeDetectorRef, private _FireService:FireService, private _MyDataService:MyDataService)
  {
   
  }
  ngOnChanges(): void {
  
  }
load:boolean=false;

Email:string='';

subscription:any[]=[];

profilData:any={};
getmyInfo()
{ 
  const id=localStorage.getItem('userId')||'';
  if(id)
  {
    this.subscription.push(
      this._FireService.getMyData(id).subscribe({
        next:(res)=>{
          
      this.profilData=res;
    
     localStorage.setItem('user',JSON.stringify(res));
     this._MyDataService.setMyData();
        },
        error:(error)=>{
      alert(`Eror:  ${error}`);
        }
       }) 
    )
  }

}

logIn(form:FormGroup)
{
this.load=true;
this.subscription.push(
  this._AuthService.logIn(form).then((response)=>{
    console.log(response.user);
    this._AuthService.isLogged.next(true);
    localStorage.setItem("userDataTaken","done");
    this._Router.navigate(['/home']);
    localStorage.setItem('reloadOnce', 'true');
    localStorage.setItem("userId",response.user.uid);
  this.getmyInfo();
  
  
  }).catch((error)=>{
    console.log(error);
    this.load=false;
    this.cd.detectChanges();
  alert("Error");
  })
)
{

}
}




    eye:string='visibility';
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


logInWithGoogle()
{
  this._AuthService.loginWithGoogle().then((res)=>{
    console.log(res);
  })
}
resetPassword()
{
  this._AuthService.resstPassword(this.Email).then(()=>{
    alert('RESET password has been sended to your email check')
  }).catch((error)=>{
    console.log(error)
  })
}
reset:boolean=false;


  ngOnDestroy(): void {
    if(this.isSubscribe)
    {
    this.isSubscribe.unsubscribe();
  }}

}
