import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Injector, runInInjectionContext } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { createUserWithEmailAndPassword ,Auth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',

})
export class AuthService {
  userId=new BehaviorSubject<string>(localStorage.getItem("userId")||'');
  private injector=inject(Injector);
  $userId=this.userId.asObservable();
//  counter=new BehaviorSubject<number>(9);
// $conter=this.counter.asObservable();
 islight=new BehaviorSubject<boolean>(false);
 $islight=this.islight.asObservable();
isUserDataCame=new BehaviorSubject<boolean>(localStorage.getItem("userDataTaken")!==null);
$isUserDataCame=this.isUserDataCame.asObservable();

  isLogged=new BehaviorSubject<boolean>(localStorage.getItem("userDataTaken")!==null); 
  $isLogged=this.isLogged.asObservable();
  constructor(private _http:HttpClient,private _Router:Router,private auth:Auth)
  {

  }

logOut()
{
  localStorage.removeItem("userId");
  localStorage.removeItem("userImg");
  localStorage.removeItem("userName");
  this.isLogged.next(false);
  this.islight.next(false);
this._Router.navigate(['/login']);

}


async regiester(form:any)
{
return await createUserWithEmailAndPassword(this.auth,form.get('email')?.value,form.get('password')?.value);
}
logIn(form:any)
{
return signInWithEmailAndPassword(this.auth,form.get('email')?.value,form.get('password')?.value);
}

loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(this.auth, provider)
}
async resstPassword(email:string)
{
return  await sendPasswordResetEmail(this.auth,email)
}

}


