import { Component, OnInit } from '@angular/core';
import { SharedmoduleModule } from '../../sharedmodule/sharedmodule.module';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { doc, Firestore, serverTimestamp, updateDoc } from '@angular/fire/firestore';
import { FireService } from '../../fire.service';
import { Router, RouterModule } from '@angular/router';
import { CloudinaryService } from '../../cloudinary.service';
import {MatFormFieldModule} from '@angular/material/form-field';

import { AuthService } from '../../services/auth.service';
import { ReactiveFormsModule }           from '@angular/forms';
import { MatInputModule }                from '@angular/material/input';
import { MatButtonModule }               from '@angular/material/button';
import { MatRadioModule }                from '@angular/material/radio';
import { MatDatepickerModule }           from '@angular/material/datepicker';
import { MatNativeDateModule }           from '@angular/material/core';
import { MatSelectModule }               from '@angular/material/select';
import { MatIconModule }                 from '@angular/material/icon';       // إذا أردت أيقونات
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-profile-data',
  imports: [MatFormFieldModule,MatRadioModule,
  
    ReactiveFormsModule,RouterModule,
    CommonModule,
   
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatIconModule,],
  templateUrl: './add-profile-data.component.html',
  styleUrl: './add-profile-data.component.scss',
  standalone:true
})
export class AddProfileDataComponent implements OnInit {
img2Url:string='';
img1Url:string='';
date:any;
  constructor(private _Firestore:Firestore, private _FireService:FireService, private _Router:Router, private _CloudinaryService:CloudinaryService, private _AuthService:AuthService)
  {
  }
  ngOnInit(): void {
    
    this.getMyData();
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

uploadImg1(file:HTMLInputElement,file2:HTMLInputElement)
{
this.load=true;
const theFile=file.files?.item(0);
if(theFile)
{
  console.log('file1 exist');
  this._CloudinaryService.uplodImg1(theFile).subscribe({
    next:(res)=>{

        this.myForm.get('img1')?.setValue(res.secure_url);
        this.uploadImg2(file2);
    },
    error:(error)=>{
      this.load=false;
    }
  })
}
  else
  {
    this.saveAndRoute();
  }
}
uploadImg2(file2:HTMLInputElement)
{
this.load=true;
const theFile=file2.files?.item(0);
if(theFile)
{
  console.log('file2 exist');

  this._CloudinaryService.uplodImg1(theFile).subscribe({
    next:(res)=>{
        this.myForm.get('img2')?.setValue(res.secure_url);   
         this.saveUserData();
                    this._AuthService.isLogged.next(true);
    },
    error:(error)=>{
      this.load=false;
    }
  })
}
else
{
    this.saveAndRoute();
}
  
}
 
saveAndRoute()
{
    this.load=true;
this.saveUserData()
this._Router.navigate(['/home']);
    localStorage.setItem('reloadOnce', 'true');


}



// editeData()
// {
//   const theFile=file.files?.item(0);

//   if(theFile)
//     {
//       this._CloudinaryService.uplodImg(theFile).subscribe({
//         next:(res)=>{
    
//           if(this.myForm.get('img1')?.value=='')
//                   {
//             this.myForm.get('img1')?.setValue(res.secure_url);
//                   }
//                   else
//                   {
//             this.myForm.get('img2')?.setValue(res.secure_url);
            
//                   }
//                         this.saveUserData();
          
//     this._Router.navigate(['/home']);
                  
//         },
//         error:(error)=>{
//           this.load=false;
//         }
//       })
//     }
// }
saveUserData()
{
  const id=localStorage.getItem('userId');
  console.log(id);
  const docRef=doc(this._Firestore,`users/${id}`);
  updateDoc(docRef,this.myForm.value);
this.getMyData();
  localStorage.setItem("userDataTaken",'true');
}



getMyData()
{
const myId:string=localStorage.getItem("userId")||'';
  if(myId)
  {
    this._FireService.getMyData(myId).subscribe({
      next:(res)=>{
    this.myForm.patchValue(res);
    this.img1Url=res.img2;
    localStorage.setItem('user',JSON.stringify(res));
    this.img2Url=res.img1;
    
      }
    })
  }

}



show_hide:boolean=false;
showAndHide()
{
  this.show_hide=!this.show_hide;
}
  }




