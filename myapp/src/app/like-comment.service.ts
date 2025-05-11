import { addDoc, arrayUnion, collection, collectionData, deleteDoc, doc, docData, Firestore, getDoc, getDocs, increment, orderBy, query, runTransaction, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { inject, Injectable, Injector, runInInjectionContext } from '@angular/core';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikeCommentService {
  
private firestore=inject(Firestore);
private inject=inject(Injector);



  constructor() { }
async toggleLike(post:any,user:any)
{
    return runInInjectionContext(this.inject, () => {
const collRef=collection(this.firestore,`likes`);
const docRef=doc(this.firestore,`posts/${post.docId}`);
const q = query(collRef,
  where('postId', '==', post.docId),
  where('userId', '==', user.id)
);

getDocs(q).then(async snapshot => {
  if (!snapshot.empty) {
    // اللايك موجود، نحذفه
    snapshot.forEach(async doc => {
      deleteDoc(doc.ref)
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
this.inAndDisNotifNumber(post.userData.id);

  }
});
    })
}
getLikes(postId:string):Observable<any>
{
  return runInInjectionContext(this.inject, () => {
const collRef=collection(this.firestore,`likes`);
const q =query(collRef,where('postId','==',postId),orderBy('date','asc'));
return collectionData(q);
  })
}

sendComment(post:any,user:any,comment:string):Observable<any>
{
  return runInInjectionContext(this.inject, () => {
  const collRef=collection(this.firestore,`comments`);
const docRef=doc(this.firestore,`posts/${post.docId}`);
return from(
  runTransaction(this.firestore,async(transaction)=>{
    transaction.update(docRef,{commentCount:increment(1)})
await addDoc(collRef,{userId:user.id,userName:user.name,userImage:user.image,comment:comment,postId:post.docId,date:new Date()})
this.sendPostNotification(user,`${user.name} Commented your Post `,post.docId,'comment',post.userData.id);
this.inAndDisNotifNumber(post.userData.id);
  })

)
  })

}
getComments(postId:string):Observable<any>
{
  return runInInjectionContext(this.inject, () => {
  const collRef=collection(this.firestore,`comments`);
  const q=query(collRef,where('postId','==',postId),orderBy('date','desc'));
return collectionData(q);
  })
}

getUserLikes(userId:string):Observable<any>
{
  return runInInjectionContext(this.inject, () => {
const collRef=collection(this.firestore,`likes`);
const q=query(collRef,where('userId','==',userId));
return collectionData(q,{idField:'docId'});
  })
}

 sendPostNotification(user:any,message:string,postId:string,type:string,notifId:string)
{
  
  return runInInjectionContext(this.inject, () => {
  const docRef=doc(this.firestore,`users/${notifId}`);
 updateDoc(docRef,{notifs:arrayUnion({user,postId:postId,message:message,type:type,notifId:notifId,date:new Date()})});
  })
}

 sendFrindRequstNotif(user:any,message:string,notifId:string) // الشخص ال هيروحله الاشعار 
{
  
  
  return runInInjectionContext(this.inject, () => {
    const docRef=doc(this.firestore,`users/${notifId}`);

   updateDoc(docRef,{notifs:arrayUnion({user,message:`${user.name} ${message}`,type:'request',notifId:notifId,date:new Date()})});
  })

}

 inAndDisNotifNumber(userId:string)
{
  return runInInjectionContext(this.inject, () => {
  const docRef=doc(this.firestore,`users/${userId}`);
   updateDoc(docRef,{notifNum:increment(1)});
  })
}
 clearNotifs(userId:string)
{
  return runInInjectionContext(this.inject, () => {
  const docRef=doc(this.firestore,`users/${userId}`);
   updateDoc(docRef,{notifNum:0});
  })
}



}