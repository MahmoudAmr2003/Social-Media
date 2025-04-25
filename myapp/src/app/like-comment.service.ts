import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, getDoc, getDocs, increment, orderBy, query, runTransaction, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { catchError, from, map, Observable, of, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikeCommentService {
  





  constructor(private _Firestore:Firestore ) { }
async toggleLike(post:any,user:any)
{
  
const collRef=collection(this._Firestore,`likes`);
const docRef=doc(this._Firestore,`posts/${post.docId}`);
const q = query(collRef,
  where('postId', '==', post.docId),
  where('userId', '==', user.id)
);

getDocs(q).then(async snapshot => {
  if (!snapshot.empty) {
    // اللايك موجود، نحذفه
    snapshot.forEach(async doc => {
     await deleteDoc(doc.ref)
    await updateDoc(docRef,{likeCount:increment(-1)});

    });
  } else {
    // اللايك مش موجود، نضيفه
   await addDoc(collRef, {
      postId: post.docId,
      userId: user.id,
      userName: user.name,
      userImage: user.image,
      date: new Date()
    });
   await updateDoc(docRef,{likeCount:increment(1)});
this.sendPostNotification(user,`${user.name} Liked Your Post`,post.docId,'love',post.userData.id);
this.inAndDisNotifNumber(user.id);

  }
});

}
getLikes(postId:string):Observable<any>
{
const collRef=collection(this._Firestore,`likes`);
const q =query(collRef,where('postId','==',postId),orderBy('date','asc'));
return collectionData(q);
}

sendComment(post:any,user:any,comment:string):Observable<any>
{
  const collRef=collection(this._Firestore,`comments`);
const docRef=doc(this._Firestore,`posts/${post.docId}`);
return from(
  runTransaction(this._Firestore,async(transaction)=>{
    transaction.update(docRef,{commentCount:increment(1)})
await addDoc(collRef,{userId:user.id,userName:user.name,userImage:user.image,comment:comment,postId:post.docId,date:new Date()})
this.sendPostNotification(user,`${user.name} Commented your Post `,post.docId,'comment',post.userData.id);
this.inAndDisNotifNumber(user.id);
  })

)


}
getComments(postId:string):Observable<any>
{
  const collRef=collection(this._Firestore,`comments`);
  const q=query(collRef,where('postId','==',postId),orderBy('date','desc'));
return collectionData(q);
}

getUserLikes(userId:string):Observable<any>
{
const collRef=collection(this._Firestore,`likes`);
const q=query(collRef,where('userId','==',userId));
return collectionData(q,{idField:'docId'});
}

async sendPostNotification(user:any,message:string,postId:string,type:string,notifId:string)
{
  const collRef=collection(this._Firestore,`notifs`);
await addDoc(collRef,{user,postId:postId,message:message,type:type,notifId:notifId,date:new Date()});
}

async sendFrindRequstNotif(user:any,message:string,notifId:string) // الشخص ال هيروحله الاشعار 
{
  const collRef=collection(this._Firestore,`notifs`);
  await addDoc(collRef,{user,message:`${user.name} ${message}`,type:'request',notifId:notifId,date:new Date()});

}
getNotifications(userId:string):Observable<any>
{
const collRef=collection(this._Firestore,`notifs`);
const q =query(collRef,where('notifId','==',userId));
return collectionData(q,{idField:'docId'});
}

async inAndDisNotifNumber(userId:string)
{
  const docRef=doc(this._Firestore,`users/${userId}`);
  await updateDoc(docRef,{notifNum:increment(1)});
}
async clearNotifs(userId:string)
{
  const docRef=doc(this._Firestore,`users/${userId}`);
  await updateDoc(docRef,{notifNum:0});

}


}