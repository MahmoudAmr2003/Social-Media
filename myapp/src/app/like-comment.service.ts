import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, getDoc, getDocs, increment, orderBy, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikeCommentService {
  





  constructor(private _Firestore:Firestore ) { }
toggleLike(postId:string,user:any)
{
const collRef=collection(this._Firestore,`likes`);
const docRef=doc(this._Firestore,`posts/${postId}`);
const q = query(collRef,
  where('postId', '==', postId),
  where('userId', '==', user.id)
);
getDocs(q).then(snapshot => {
  if (!snapshot.empty) {
    // اللايك موجود، نحذفه
    snapshot.forEach(doc => {
      deleteDoc(doc.ref);
      updateDoc(docRef,{likeCount:increment(-1)});
    });
  } else {
    // اللايك مش موجود، نضيفه
    addDoc(collRef, {
      postId: postId,
      userId: user.id,
      userName: user.name,
      userImage: user.image,
      date: new Date()
    });
    updateDoc(docRef,{likeCount:increment(1)});

  }
});

}
getLikes(postId:string):Observable<any>
{
const collRef=collection(this._Firestore,`likes`);
const q =query(collRef,where('postId','==',postId),orderBy('date','asc'));
return collectionData(q);
}

sendComment(postId:string,user:any,comment:string)
{
  const collRef=collection(this._Firestore,`comments`);
const docRef=doc(this._Firestore,`posts/${postId}`);
addDoc(collRef,{userId:user.id,userName:user.name,userImage:user.image,comment:comment,postId:postId,date:new Date()});
updateDoc(docRef,{commentCount:increment(1)});

}
getComments(postId:string):Observable<any>
{
  const collRef=collection(this._Firestore,`comments`);
  const q=query(collRef,where('postId','==',postId));
return collectionData(q);
}
}