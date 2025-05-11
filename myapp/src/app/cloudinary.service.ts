import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {
cloudName='dalg2drqy';
uploadPreset='Mahmoud';


  constructor( private _HttpClient:HttpClient) { }
  uplodImg1(file1:File):Observable<any>
  {
const formData1=new FormData();
formData1.append('file',file1);
formData1.append('upload_preset',this.uploadPreset);
const url = `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`;
return this._HttpClient.post(url,formData1);

  }
  uploadImage2(file2:File):Observable<any>
  {

    const formData2=new FormData();
    formData2.append('file',file2);
    formData2.append('upload_preset',this.uploadPreset);
    const url = `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`;
    return this._HttpClient.post(url,formData2);
    
  }
}
