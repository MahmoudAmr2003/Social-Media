
import {Injectable, NgZone } from '@angular/core';
import { Storage, ref, uploadBytesResumable,getDownloadURL } from '@angular/fire/storage';
import { collection, Firestore, docData, doc, collectionData, addDoc, query, where, deleteDoc, serverTimestamp, updateDoc, arrayUnion, orderBy, deleteField, arrayRemove, DocumentReference } from '@angular/fire/firestore';
import { BehaviorSubject, from, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FireService {

  notifNumber=new BehaviorSubject<number>(0);
  $notifs=this.notifNumber.asObservable();
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
sendNotifection(id:string,noti:any)
{
  
const docRef=doc(this._Firestore,`users/${id}`);

   updateDoc(docRef,{notfications:arrayUnion(noti)}).then((res)=>{
console.log(res);
  })
.catch((error)=>{
console.log(error);
})
  }



numderOfNotifecation(id:string,theNumber:number)
{
const docRef=doc(this._Firestore,`users/${id}`);
updateDoc(docRef,{notifNums:theNumber}); // ممكن تعمل  then
}
 clearNotifNums()
 {
  const myId=localStorage.getItem('userId')||'';
  const docRef=doc(this._Firestore,`users/${myId}`);
  updateDoc(docRef,{notifNums:0});
 }
sendLike(postId:string,myData:any)
{
const docRef=doc(this._Firestore,`posts/${postId}`);
updateDoc(docRef,{likes:arrayUnion(myData)});
}
removeLike(postId:string,myData:any)
{
const docRef=doc(this._Firestore,`posts/${postId}`);
updateDoc(docRef,{likes:arrayRemove(myData)}).then((docref)=>{
  console.log(myData);
console.log(docref);
}).catch((error)=>{
  console.log(error);
});
}
increaceNotNum()
{
  
}




getLike(docId:string,likes:any[],postOwnerId:string,notNum:number)
{
  
  const me={
    image:localStorage.getItem("userImg"),
    id:localStorage.getItem('userId'),
    name:localStorage.getItem("userName"),
    type:'like',
    postId:docId
    
  }
  const user =JSON.parse(localStorage.getItem('user')||'{}');

const myNotif={name:user.fullName,image:user.img1,id:user.userId,   message:`Your Post has been liked by `,type:'like',posId:docId,date:new Date()}
  const id=localStorage.getItem('userId');
 if(likes)
 {
  const didILiked=likes.some(i=>i.id==id);

  if(didILiked==true)
  {
   this.removeLike(docId,me);

console.log('removed');

  }
  else
  {
   
    console.log(postOwnerId);

   this.sendLike(docId,me);
    this.inc_Dec_Notifucation(postOwnerId,notNum);
    this.sendNotifection(postOwnerId,myNotif);
  
console.log('added')
  }
 }
 else
 {
 this.sendLike(docId,me);
console.log('added under');


 this.sendNotifection(postOwnerId,myNotif);
  this.inc_Dec_Notifucation(postOwnerId,notNum);

 }
}



inc_Dec_Notifucation(postId:string,notNum:number)
{
  if(Number.isNaN(notNum))
    {
     this.numderOfNotifecation(postId,1);
    }
    else
    {
     this.numderOfNotifecation(postId,notNum+1);
    
    }
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

