import { LoadingComponent } from './../../loading/loading.component';
import { SharedmoduleModule } from '../../sharedmodule/sharedmodule.module';
import { ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, signal, SimpleChanges, ViewChild, NgModule } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { DatabaseService } from '../../services/database.service';
import { FireService } from '../../fire.service';
import { MyDataService } from '../../my-data.service';

@Component({
  selector: 'app-resign',
  imports: [SharedmoduleModule,LoadingComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './resign.component.html',
  styleUrl: './resign.component.scss',
standalone:true
 
})
export class ResignComponent implements OnChanges {
  orderdDate:Date=new Date();
userDataArray:any;
constructor(private auth:AuthService,private _router:Router,private _DatabaseService:DatabaseService,private _MatSnackBar:MatSnackBar, private _FireService:FireService, private _MyDataService:MyDataService)
  {
// auth.isLogged.next(false);

  }
  ngOnChanges(): void {
     }
  show:boolean=false;
resign=new FormGroup({
  name:new FormControl(null,[Validators.maxLength(30),Validators.minLength(3),Validators.pattern('^[a-z A-Z]+$'),Validators.required]),
  email:new FormControl(null,[Validators.email,Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'),Validators.required]),
  password:new FormControl(null,[Validators.minLength(5),Validators.maxLength(20),Validators.pattern('^[a-zA-Z0-9\u0621-\u064A\u0660-\u0669]+$'),Validators.required]),
  
})

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
// 
  // 


  load:boolean=false;
  resignForm(resign:FormGroup)
{
  this.load=true;
  this.auth.resign(resign.value).subscribe({
    next:(response)=>{
      this.onLoginSuccess();
      
    localStorage.setItem("userId",response.localId);
    localStorage.setItem("role",resign.value.role);

    console.log(localStorage.getItem("userId"))
  this.load=false;
    //********************************** */
  this._DatabaseService.postUserData(resign.value).subscribe({
    next:(response)=>{
    // إيقاف التحميل في النهاية.
 
      this.goToDashbored()
    },
  
  })

//******************************** */
    },
    error:(error)=>
    {
     
      this.onLoginFailed();
    // إيقاف التحميل في النهاية.

      

    },
    
  })
  }



  getmyInfo()
{ 
  const id=localStorage.getItem('userId')||'';

  this._FireService.getMyData(id).subscribe({
    next:(res)=>{
      
  
 localStorage.setItem('user',JSON.stringify(res));
 this._MyDataService.setMyData();
    },
    error:(error)=>{
  alert(`Eror:  ${error}`);
    }
   }) 

}


goToDashbored()
{
 
      this._router.navigate(['/add_data']);
 
}



onLoginSuccess() {
  this._MatSnackBar.open('تم تسجيل الدخول بنجاح!', 'إغلاق', {
    duration: 2000,  // مدة عرض التنبيه بالميلي ثانية
    verticalPosition: 'bottom',  // عرض التنبيه في الأعلى
    
  });
}

onLoginFailed() {

  this._MatSnackBar.open('البريد الالكتروني مستخدم بالفعل', 'إغلاق', {
    duration: 2000,  // مدة عرض التنبيه بالميلي ثانية
    verticalPosition: 'bottom',  // عرض التنبيه في الأعلى
    
  });

}
}


// @ViewChild('name') name!:ElementRef;
// @ViewChild('email') email!:ElementRef;
// @ViewChild('password') password!:ElementRef;


// catchInValid(field:string)
// {
//   let myfield;
// if(field=="name")
// {
//  myfield=this.name;
// }
// else if(field=="email")
// {
//   myfield=this.email;

// }
// else
// {
//  myfield=this.password;

// }
//   if(this.resign.get(field)?.errors!=null)
//   {
//    myfield.nativeElement.style.outline="none";
//    myfield.nativeElement.style.border="red solid 2px";

//   }
//   else
//   {
//     myfield.nativeElement.style.border="green solid 2px";
  

//   }






