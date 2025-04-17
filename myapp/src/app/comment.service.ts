import { Injectable } from '@angular/core';
import { arrayUnion, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private _Firestore:Firestore) { }


  sendComment(docId:string,comment:any):Observable<any>
  {
const docRef=doc(this._Firestore,`posts/${docId}`);
return from(
updateDoc(docRef,{comments:arrayUnion(comment)})
);
  }
  getComments(postId:string)
{
const docRef=doc(this._Firestore,`posts/${postId}`);
docData(docRef,{idField:'docId'})
}
sendNotifection(id:string,postId:string)
{
  const name=localStorage.getItem("userName");
  const message=`${name} Add Comment To YOur Post`;

  const myNotif={
    image:localStorage.getItem("userImg"),
    id:localStorage.getItem('userId'),
    name:name,
    postId:postId,
     message:message,
  type:'comment',
  date:new Date()
  }
const docRef=doc(this._Firestore,`users/${id}`);

   updateDoc(docRef,{notfications:arrayUnion(myNotif)}).then((res)=>{
console.log(res);
  })
.catch((error)=>{
console.log(error);
})
  }

}
