import { Component } from '@angular/core';
import { SharedmoduleModule } from '../../sharedmodule/sharedmodule.module';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { doc, Firestore, serverTimestamp, updateDoc } from '@angular/fire/firestore';
import { FireService } from '../../fire.service';
import { Router } from '@angular/router';
import {LoadingComponent } from '../../loading/loading.component';
import { CloudinaryService } from '../../cloudinary.service';



@Component({
  selector: 'app-add-profile-data',
  imports: [SharedmoduleModule,LoadingComponent],
  templateUrl: './add-profile-data.component.html',
  styleUrl: './add-profile-data.component.scss'
})
export class AddProfileDataComponent {
img2Url:string='';
img1Url:string='';
date:any;
  constructor(private _Firestore:Firestore, private _FireService:FireService, private _Router:Router, private _CloudinaryService:CloudinaryService)
  {
  }
 myForm=new FormGroup({
  img1:new FormControl(''),
  img2:new FormControl(''),
  fullName:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.pattern('^[a-zA-Z ]+$'),Validators.maxLength(20)]),
  mobilePhone:new FormControl(null,[Validators.required,Validators.pattern('^(010|011|012|015)[0-9]{8}$')]),
  jop:new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z ]{3,15}')]),
  gender:new FormControl(null,[Validators.required]),
  birthDay:new  FormControl(null,[Validators.required]),
  hobbies:new FormControl('sport',[Validators.required]),
  shortBio:new FormControl(null,[Validators.required]),
date:new FormControl(serverTimestamp())
 })


getLinkForImg1(img1:HTMLInputElement)
  {
  if(img1.files)
  {


 this.img1Url=URL.createObjectURL(img1.files[0]);


  }
}

getLinkForImg2(img2:HTMLInputElement)
  {
  if(img2.files)
  {


 this.img2Url=URL.createObjectURL(img2.files[0]);


  }
}
load:boolean=false;



uploadImg(file:HTMLInputElement)
{
this.load=true;

  const theFile=file.files?.item(0);
if(theFile)
{
  this._CloudinaryService.uplodImg(theFile).subscribe({
    next:(res)=>{

      if(this.myForm.get('img1')?.value=='')
              {
        this.myForm.get('img1')?.setValue(res.secure_url);
              }
              else
              {
        this.myForm.get('img2')?.setValue(res.secure_url);
        
              }
                    this.saveUserData();
      
this._Router.navigate(['/profile']);
              
    },
    error:(error)=>{
      this.load=false;
    }
  })
}
  

}
saveUserData()
{
  const id=localStorage.getItem('userId');
  const docRef=doc(this._Firestore,`users/${id}`);
  updateDoc(docRef,this.myForm.value);
  localStorage.setItem("userDataTaken",'true');
}

show_hide:boolean=false;
showAndHide()
{
  this.show_hide=!this.show_hide;
}
  }




