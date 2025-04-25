
import {Injectable, NgZone } from '@angular/core';
import { Storage, ref, uploadBytesResumable,getDownloadURL } from '@angular/fire/storage';
import { collection, Firestore, docData, doc, collectionData, addDoc, query, where, deleteDoc, serverTimestamp, updateDoc, arrayUnion, orderBy, deleteField, arrayRemove, DocumentReference } from '@angular/fire/firestore';
import { BehaviorSubject, from, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FireService {

 
constructor(private _Storage:Storage, private _Firestore:Firestore, private _NgZone:NgZone)
{

}
  
  
//     uploadImg(file1:File):Observable<string>
//     {
   
        
//   const sRef=ref(this._Storage,`${file1.name}`);
//   const uploadField=uploadBytesResumable(sRef,file1);
//  return new Observable((observer)=>{
//   uploadField.on(
//     'state_changed',
//     (snapshot)=>{
//   const process=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
//   console.log(process+'% Uploaded');
//     },
//     (error)=>{
//   console.log(error);
//     },
  
//     ()=>{
//       getDownloadURL(uploadField.snapshot.ref).then((Url)=>{
     
//    observer.next(Url);
//       })
//     }
//   )

  
//       })
//     }
   
getMyData(id:string):Observable<any>
{
const docRef=doc(this._Firestore,`users/${id}`);
return docData(docRef,{idField:'Docid'});
}

getCollection(collectionName:string):Observable<any>
{
    const collRef=collection(this._Firestore,`${collectionName}`);
    // const qRef=query(collRef,orderBy('date','desc'));
    return collectionData(collRef,{idField:'docId'})  
}

sendPost(dataOfPost:any)
{
const collectionRef=collection(this._Firestore,'posts');
return addDoc(collectionRef,dataOfPost);
}
getQuery(collectionName:string,fieldName:string,condition:any,value:any):Observable<any>
{
const collRef=collection(this._Firestore,collectionName);
const qRef=query(collRef,where(fieldName,condition,value),orderBy('date','desc'));
return collectionData(qRef,{idField:'docId'});
}

deleteDoc(collectionName:string,id:string)
{
  const docRef=doc(this._Firestore,`${collectionName}/${id}`);
  deleteDoc(docRef);

}

addFrind(requestDetails:any):Observable<any>
{
  const collRef=collection(this._Firestore,'frindsRequst');
 return from(
  addDoc(collRef,requestDetails)
 )
}

acceptRequest(id:string,frindData:any)
{

  const docRef=doc(this._Firestore,`users/${id}`);
  updateDoc(docRef,{frinds:arrayUnion(frindData)}); // add obj -- obj //  array:arrayUnion(obj); 

}





 








pushUserInSaver(postId:string)
{
  const userId=localStorage.getItem('userId');
const docRef=doc(this._Firestore,`posts/${postId}`);
updateDoc(docRef,{savers:arrayUnion(userId)});
}

popUserInSaver(postId:string)
{
  const userId=localStorage.getItem('userId');
const docRef=doc(this._Firestore,`posts/${postId}`);
updateDoc(docRef,{savers:arrayRemove(userId)});
}

getSavedPosts(id:string):Observable<any>
{
const collRef=collection(this._Firestore,'posts');
const qRef=query(collRef,where('savers','array-contains',id));
return collectionData(qRef,{idField:'docId'});

}


getOnePost(id:string):Observable<any>
{
const docRef=doc(this._Firestore,`posts/${id}`);
return docData(docRef,{idField:'docId'});
}


}

