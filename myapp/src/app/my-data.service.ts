import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyDataService {
  userData:any={};
  constructor() { }
  setMyData()
  {
   const user:any=JSON.parse(localStorage.getItem('user')||'{}');
   console.log(user);

this.userData={
  name:user.fullName,
  id:user.userId,
  image:user.img1
}
  }
}
