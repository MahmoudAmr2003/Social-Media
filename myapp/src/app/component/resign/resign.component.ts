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
import { user } from '@angular/fire/auth';
import { MatButtonModule }               from '@angular/material/button';

@Component({
  selector: 'app-resign',
  imports: [SharedmoduleModule,LoadingComponent,MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './resign.component.html',
  styleUrl: './resign.component.scss',
standalone:true
 
})
export class ResignComponent implements OnChanges {
  orderdDate:Date=new Date();
userDataArray:any;
constructor(private auth:AuthService,
  private _router:Router,
  private _DatabaseService:DatabaseService,
  private _MatSnackBar:MatSnackBar,
   private _FireService:FireService, 
  private _MyDataService:MyDataService,
private _AuthService:AuthService)
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
  register(FormGroup:FormGroup)
  {
    
  this.load=true;
this._AuthService.regiester(FormGroup).then((response)=>{
  localStorage.setItem('userId',response.user.uid);

   this.afterResign(response.user.uid,FormGroup.value);

})
.catch((error)=>{
  
  this.load=false;

  this.onLoginFailed();

})
  }



goToDashbored()
{
 
      this._router.navigate(['/add_data']);

 
}
logInWithGoogle() {
  this._AuthService.loginWithGoogle()
    .then((res) => {
      
      localStorage.setItem('userId',res.user.uid);
   
      this.afterResign(res.user.uid, res.user.providerData[0]);
    })
    .catch((err) => {

      this.load = false;
    });
}

afterResign(id:string, userData: any) {
  this.onLoginSuccess();

  
  this.load = true;

  this._DatabaseService.postUserData(userData,id).then(()=>{
    this.load = false;
  
    
    this.goToDashbored();

  }).catch(()=>{
    this.load=false;
  })
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
