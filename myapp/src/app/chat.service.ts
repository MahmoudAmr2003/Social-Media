import { Injectable, runInInjectionContext } from '@angular/core';
import { addDoc, collection, collectionData, doc, Firestore, getDoc, serverTimestamp, setDoc, updateDoc, where, query, orderBy, getDocs, writeBatch } from '@angular/fire/firestore';
import { inject, Injector } from '@angular/core';
import { MyDataService } from './my-data.service';
import { Observable } from 'rxjs';
import { deleteDoc } from 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  myData:any={};

  constructor(private _MyDataService:MyDataService)
   {

   }
 firestore=inject(Firestore);
 injector=inject(Injector);
 
 
 createChatId( presonId: string): string {
   this._MyDataService.setMyData();
   const myId=this._MyDataService.userData.id;
   

   return  [myId, presonId].sort().join('_');
   
 }
 
 async sendMessage(  messageText: string,user:any) {
  this._MyDataService.setMyData();
  this.myData=this._MyDataService.userData;
   const chatId = this.createChatId( user.id);
 
   const chatRef = doc(this.firestore, `chats/${chatId}`);
   const messagesRef = collection(chatRef, 'messages');
 
   // 1. إنشاء الوثيقة الرئيسية لو مش موجودة
   const chatSnap = await getDoc(chatRef);
   if (!chatSnap.exists()) {

     await setDoc(chatRef, {
       users: [this.myData.id, user.id],
       userDetails: {
         [this.myData.id]: {
           name: this.myData.name,
           photoUrl:this.myData.image
         },
         [user.id]: {
           name: user.fullName,
           photoUrl: user.img1
         }
       },
       lastMessage: '',
       lastMessageTime: serverTimestamp()
     });
   }
 
  await addDoc(messagesRef, {    
    senderId: this.myData.id,
    text: messageText,
    timestamp: serverTimestamp()
  });


  // 3. تحديث بيانات آخر رسالة
  await updateDoc(chatRef, {
    lastMessage: messageText,
    lastMessageTime: serverTimestamp()
  });
 
   // 2. إرسال الرسالة
  
 }
 

 getUserChats(): Observable<any[]> {
return runInInjectionContext(this.injector,()=>{
  this._MyDataService.setMyData();
  this.myData=this._MyDataService.userData;
  const chatsRef = collection(this.firestore, 'chats');
  const q = query(chatsRef, where('users', 'array-contains', this.myData.id));
  return collectionData(q, { idField: 'chatId' });
})
}

 getMessages(chatId: string): Observable<any[]> {
return runInInjectionContext(this.injector, ()=>{
  const messagesRef = collection(this.firestore, `chats/${chatId}/messages`);
  const q = query(messagesRef, orderBy('timestamp'));
  return  collectionData(q, { idField: 'id' });
})
}

  deleteChat(id:string)
 {

runInInjectionContext(this.injector,async ()=>{
  const collRef=collection(this.firestore,`chats/${id}/messages`);
  const masseges=await getDocs(collRef);
  const batch=writeBatch(this.firestore);
masseges.forEach((doc)=>{
  batch.delete(doc.ref);
})
await batch.commit();


  const docRef=doc(this.firestore,`chats/${id}`);
  return await deleteDoc(docRef).then(()=>{

   
  }).catch((error)=>{
    
  })
  
  })
 }
}
