import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',

})
export class AuthService {
  userId=new BehaviorSubject<string>(localStorage.getItem("userId")||'');
  $userId=this.userId.asObservable();
//  counter=new BehaviorSubject<number>(9);
// $conter=this.counter.asObservable();
 islight=new BehaviorSubject<boolean>(false);
 $islight=this.islight.asObservable();
isUserDataCame=new BehaviorSubject<boolean>(localStorage.getItem("userDataTaken")!==null);
$isUserDataCame=this.isUserDataCame.asObservable();

  isLogged=new BehaviorSubject<boolean>(localStorage.getItem("userDataTaken")!==null);
  $isLogged=this.isLogged.asObservable();
  constructor(private _http:HttpClient,private _Router:Router)
  {

  }
  resign(userForm:any):Observable<any>
  {
    return this._http.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAfeaOPtEkZ1JF37sW0c7-LK9NiZ2Eg3S8",userForm);
  }
  
  login(userForm:any):Observable<any>
  {
    return this._http.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAfeaOPtEkZ1JF37sW0c7-LK9NiZ2Eg3S8",userForm);
  }
logOut()
{
  localStorage.removeItem("userId");
  localStorage.removeItem("userId");

  this.isLogged.next(false);
  this.islight.next(false);
this._Router.navigate(['/login']);
console.log(this.isLogged.getValue());

}

 isLight()
 {
this.islight.next(!this.islight.getValue());
 }
}



// increament()
// {
//  this.counter.next(this.counter.getValue()+1);
// }