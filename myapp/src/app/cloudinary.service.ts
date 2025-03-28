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
  uplodImg(file:File):Observable<any>
  {
const formData=new FormData();
formData.append('file',file);
formData.append('upload_preset',this.uploadPreset);
const url = `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`;
return this._HttpClient.post(url,formData);
  }
}
