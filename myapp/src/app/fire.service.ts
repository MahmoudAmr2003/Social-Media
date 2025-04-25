
import {inject, Injectable, runInInjectionContext,Injector } from '@angular/core';
import { collection, Firestore, docData, doc, collectionData, addDoc, query, where, deleteDoc, serverTimestamp, updateDoc, arrayUnion, orderBy, deleteField, arrayRemove, DocumentReference } from '@angular/fire/firestore';
import {  from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FireService {

  private firestore = inject(Firestore);
  private injector  = inject(Injector);

constructor()
{

}
  


   
getCollection(collectionName:string):Observable<any>
{
  return runInInjectionContext(this.injector, () => {
    const collRef=collection(this.firestore,`${collectionName}`);
    // const qRef=query(collRef,orderBy('date','desc'));
    return collectionData(collRef,{idField:'docId'})  ;
  })
}
getMyData(id:string):Observable<any>
{
  return runInInjectionContext(this.injector, () => {
const docRef=doc(this.firestore,`users/${id}`);

return docData(docRef,{idField:'Docid'});

  })
}


sendPost(dataOfPost:any)
{
  return runInInjectionContext(this.injector, () => {
const collectionRef=collection(this.firestore,'posts');
return addDoc(collectionRef,dataOfPost);
  })
}
getQuery(collectionName:string,fieldName:string,condition:any,value:any):Observable<any>
{
  return runInInjectionContext(this.injector, () => {
const collRef=collection(this.firestore,collectionName);
const qRef=query(collRef,where(fieldName,condition,value),orderBy('date','desc'));
return collectionData(qRef,{idField:'docId'});
  })
}

deleteDoc(collectionName:string,id:string)
{
  return runInInjectionContext(this.injector, () => {
  const docRef=doc(this.firestore,`${collectionName}/${id}`);
  deleteDoc(docRef);
  })

}

addFrind(requestDetails:any):Observable<any>
{
  return runInInjectionContext(this.injector, () => {
  const collRef=collection(this.firestore,'frindsRequst');
 return from(
  addDoc(collRef,requestDetails)
 )
})
}


acceptTheRequest(frindShip:any)
{
  return runInInjectionContext(this.injector, () => {
const collRef=collection(this.firestore,'frinds');

addDoc(collRef,{frindShip});
  })
}

acceptTheRequest2(frindShip:any)
{
  return runInInjectionContext(this.injector, () => {
const collRef=collection(this.firestore,'frinds');

addDoc(collRef,{frindShip});
  })
}
getMyFrinds(myId:string):Observable<any>
{
  return runInInjectionContext(this.injector, () => {
  const collRef=collection(this.firestore,`frinds`);
  const q =query(collRef,where('frindShip.userId','==',myId));
  return collectionData(q,{idField:'docId'});
  })
}





 








pushUserInSaver(postId:string)
{
  return runInInjectionContext(this.injector, () => {
  const userId=localStorage.getItem('userId');
const docRef=doc(this.firestore,`posts/${postId}`);
updateDoc(docRef,{savers:arrayUnion(userId)});
  })
}

popUserInSaver(postId:string)
{
  return runInInjectionContext(this.injector, () => {
  const userId=localStorage.getItem('userId');
const docRef=doc(this.firestore,`posts/${postId}`);
updateDoc(docRef,{savers:arrayRemove(userId)});
  })
}

getSavedPosts(id:string):Observable<any>
{
  return runInInjectionContext(this.injector, () => {
const collRef=collection(this.firestore,'posts');
const qRef=query(collRef,where('savers','array-contains',id));
return collectionData(qRef,{idField:'docId'});
  })
}


getOnePost(id:string):Observable<any>
{
  return runInInjectionContext(this.injector, () => {
const docRef=doc(this.firestore,`posts/${id}`);
return docData(docRef,{idField:'docId'});
  })
}


}

