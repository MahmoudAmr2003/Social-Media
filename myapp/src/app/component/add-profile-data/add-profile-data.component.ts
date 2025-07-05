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
import { LoadingComponent } from '../../loading/loading.component';


@Component({
  selector: 'app-add-profile-data',
  imports: [MatFormFieldModule,MatRadioModule,
  
    ReactiveFormsModule,RouterModule,LoadingComponent,
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
  fullName:new FormControl(null,),
  mobilePhone:new FormControl(null),
  jop:new FormControl(null),
  gender:new FormControl(null),
  birthDay:new  FormControl(null),
  hobbies:new FormControl('sport'),
  shortBio:new FormControl(null),
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


async upload(file: HTMLInputElement, file2: HTMLInputElement) {
  this.load = true;

  try {
    if (file && file.files?.length && file2 && file2.files?.length) {
      await this.uploadImg1(file);
      await this.uploadImg2(file2);
      this.saveAndRoute();
      console.log('Tow');
    }

    else if (file && file.files?.length && (!file2 || !file2.files?.length)) {
      await this.uploadImg1(file);
      this.saveAndRoute();
      console.log('one');
    }

    else if (file2 && file2.files?.length && (!file || !file.files?.length)) {
      console.log('kkkkkkkkkk');
      
      await this.uploadImg2(file2);

      this.saveAndRoute();
      
    }

    else {
      this.saveAndRoute();
    }

  } catch (error) {
    console.error('حدث خطأ أثناء رفع الصور:', error);
    this.load = false;
  }
}

async uploadImg1(file: HTMLInputElement): Promise<void> {
  const theFile = file.files?.item(0);
  if (!theFile) return;

  return new Promise((resolve, reject) => {
    this._CloudinaryService.uplodImg1(theFile).subscribe({
      next: (res) => {
        this.myForm.get('img1')?.setValue(res.secure_url);
        resolve();
      },
      error: (err) => {
        this.load = false;
        reject(err);
      }
    });
  });
}

async uploadImg2(file2: HTMLInputElement): Promise<void> {
  const theFile = file2.files?.item(0);
  if (!theFile) return;

  return new Promise((resolve, reject) => {
    this._CloudinaryService.uplodImg1(theFile).subscribe({
      next: (res) => {
        this.myForm.get('img2')?.setValue(res.secure_url);
console.log(this.myForm.get('img2')?.value);

        this._AuthService.isLogged.next(true);
        resolve();
      },
      error: (err) => {
        this.load = false;
        reject(err);
      }
    });
  });
}

saveAndRoute()
{
  console.log('saved');
this.saveUserData();
  this._Router.navigate(['/home']);

}



saveUserData()
{
  const id=localStorage.getItem('userId');
  const docRef=doc(this._Firestore,`users/${id}`);
  updateDoc(docRef,this.myForm.value);
this.getMyData();
}



getMyData()
{
const myId:string=localStorage.getItem("userId")||'';
  if(myId)
  {
    this._FireService.getMyData(myId).subscribe({
      next:(res)=>{
    this.myForm.patchValue(res);
    this.img1Url=res.img1;
    localStorage.setItem('user',JSON.stringify(res));
    this.img2Url=res.img2;
    
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




