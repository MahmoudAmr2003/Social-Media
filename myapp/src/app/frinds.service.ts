import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore'; 

@Injectable({
  providedIn: 'root'
})
export class FrindsService {
  findsRequestUrl:string='https://firestore.googleapis.com/v1/projects/note-auth-4a724/databases/(default)/documents/frindsRequests';
fireStoreUrl:string='https://firestore.googleapis.com/v1/projects/note-auth-4a724/databases/(default)/documents';
  constructor(private _HttpClient:HttpClient) { }

}
