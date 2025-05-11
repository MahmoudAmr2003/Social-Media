import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../chat.service';
import { FormsModule } from '@angular/forms';
import { take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { zoomInOut } from '../animation';

@Component({
  selector: 'app-chat',
  imports: [FormsModule,CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  animations:[zoomInOut]
})
export class ChatComponent implements OnInit ,AfterViewChecked {
  showChatWindow:boolean=false;
  @ViewChild('chatContainer') chatContainer!: ElementRef;
  chatId: string = '';
  myId=localStorage.getItem('userId');
  user:any={};
  showList = false;
  message:string='';
constructor(private _ActivatedRoute:ActivatedRoute,private _ChatService:ChatService,private cd: ChangeDetectorRef,)
{
  if(_ActivatedRoute.snapshot.queryParamMap.get('id')!=null)
  {
  const id = this._ActivatedRoute.snapshot.queryParamMap.get('id');
  const name = this._ActivatedRoute.snapshot.queryParamMap.get('name');
  const photo = this._ActivatedRoute.snapshot.queryParamMap.get('photo');
  this.user={id:id,fullName:name,img1:photo};
  
  }
if(this.user.id)
{
  this.showChatWindow=true;
}

}
ngOnInit(): void {
  this.openChatByParams();
  this.getConversations();
}scrollToBottom(): void {
  try {
    const container = this.chatContainer.nativeElement;
    // نحدد موضع التمرير في الأسفل
    container.scrollTop = container.scrollHeight;
  } catch (err) {
  
  }
}

  ngAfterViewChecked(): void {
    // يضمن التمرير بعد كل تحديث في الـ view
    this.scrollToBottom();
  }


private openChatByParams() {
  // مولد الـ chatId ثابت للطرفين
  this.chatId = this._ChatService.createChatId(this.user.id);

  // جلب الرسائل
  this.loadMessages();
}

private loadMessages() {
  if (!this.chatId) return;
  this._ChatService.getMessages(this.chatId)
    .subscribe({
      next:(res)=>{
        this.messages=res;
        setTimeout(() => this.scrollToBottom(), 0);
        this.cd.detectChanges();  
     
      },error:(error)=>{
       
      }
    });
  
}
chats:any[]=[];
getConversations()
{
  this._ChatService.getUserChats().subscribe({
    next:(res)=>{
this.chats=res;
this.cd.detectChanges();  
    }
  })
}

trackById(index:number,item:any)
{
return item.chatId;
}
trackById2(index:number,item:any)
{
  return item.id;
}

@ViewChild('messageInput') messageInput!: ElementRef;

sendMassage()
{

  this._ChatService.sendMessage(this.message,this.user).then(()=>{
  this.message='';
  setTimeout(() => this.scrollToBottom(), 0);

setTimeout(() => {
      this.messageInput.nativeElement.focus();
    }, 0);
  


  }).catch((error)=>{
   
    
  })
}
getOtherUserId(users: string[]): string {
  return users.find(id => id !== this.myId) || '';
}
messages:any[]=[];
 selectChat(chat: any) {
  const otherId = chat.users.find((u: string) => u !== this.myId);
    this.user = {
      id: otherId,
      fullName: chat.userDetails[otherId].name,
      img1: chat.userDetails[otherId].photoUrl
    };
    
  this.chatId = this._ChatService.createChatId(otherId);
    if(this.chatId)
    {
  
      this.loadMessages();
  
      this.showList=!this.showList;

    }
    // أجد الطرف الآخر في الـ users array
    
  }
  deleteChat(id:string)
  {
    const deleteChat=window.confirm('Are You Sure you want to delete conversation');
    if(deleteChat)
    {
      this._ChatService.deleteChat(id);
this.cd.detectChanges();  

    }
   
  }


  

}