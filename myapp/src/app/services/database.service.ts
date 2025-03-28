import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  egyptGovernorates: string[] = [
    'Cairo',
    'Giza',
    'Alexandria',
    'Dakahlia',
    'Red Sea',
    'Beheira',
    'Fayoum',
    'Gharbia',
    'Ismailia',
    'Menofia',
    'Minya',
    'Qalyubia',
    'New Valley',
    'Suez',
    'Aswan',
    'Assiut',
    'Beni Suef',
    'Port Said',
    'Damietta',
    'South Sinai',
    'Kafr El Sheikh',
    'Matrouh',
    'Luxor',
    'Qena',
    'North Sinai',
    'Sohag'
  ];
  
  private storageUrl = 'https://firebasestorage.googleapis.com/v0/b/adding-poduct.appspot.com/o/';

 
  constructor(private _HttpClient:HttpClient) { }


postUserData(userForm:any):Observable<any>
{
  const userid=localStorage.getItem("userId");
 
const userData={
   fields:{
    name:{stringValue:userForm.name},
  email:{stringValue:userForm.email},
  password:{stringValue:userForm.password},
  userId:{stringValue:userid},
}
}
return this._HttpClient.patch(`https://firestore.googleapis.com/v1/projects/note-auth-4a724/databases/(default)/documents/users/${userid}`, userData);
}


// 

// 




 
 
}
