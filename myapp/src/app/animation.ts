import { animate, style, transition, trigger } from '@angular/animations';

export const zoomInOut=
  trigger('zoomInOut', [
    transition(':enter', [
      style({ transform: 'scale(0.5)', opacity: 0 }),
      animate('300ms ease-out', style({ transform: 'scale(1)', opacity: 1 }))
    ]),
    transition(':leave', [
      animate('300ms ease-in', style({ transform: 'scale(0.5)', opacity: 0 }))
    ])
  ])


  import { Injectable } from '@angular/core';
import { Firestore, doc, updateDoc, arrayUnion, arrayRemove } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private firestore: Firestore) {}

  // // إضافة إعجاب (like) لمنشور معين
  // likePost(postId: string, userId: string): Promise<void> {
  //   const postRef = doc(this.firestore, 'posts', postId);
  //   return updateDoc(postRef, {
  //     likes: arrayUnion(userId)
  //   });
  // }

  // // إزالة إعجاب (unlike) لمنشور معين
  // unlikePost(postId: string, userId: string): Promise<void> {
  //   const postRef = doc(this.firestore, 'posts', postId);
  //   return updateDoc(postRef, {
  //     likes: arrayRemove(userId)
  //   });
  // }
}
