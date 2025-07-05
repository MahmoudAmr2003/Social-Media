import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Injector, runInInjectionContext } from '@angular/core';
import { addDoc, collection, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { getDoc } from 'firebase/firestore';
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
  
 fireStore=inject(Firestore);
 injector=inject(Injector)
 
  constructor(private _HttpClient:HttpClient) { }


async postUserData(form:any,id:string)
{
return await runInInjectionContext(this.injector,()=>{
  const UserData={
email:form.email,
name:form.displayName,
uid:id
  }
  const collRef=doc(this.fireStore,`users/${id}`);
   setDoc(collRef,{UserData,id});

})
}
checkIfUserExist(uId:string):Promise<boolean>
{
  return runInInjectionContext(this.injector, () => {
    const docRef = doc(this.fireStore, `users/${uId}`);
    return getDoc(docRef).then(docBack => docBack.exists());
  });
}

// 

// 




 
 
}
