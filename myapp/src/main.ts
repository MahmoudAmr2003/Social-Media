/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideFirebaseApp, initializeApp as initializeApp_alias } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';
const environment = {
  firebase: {
  apiKey: "AIzaSyAfeaOPtEkZ1JF37sW0c7-LK9NiZ2Eg3S8",
  authDomain: "note-auth-4a724.firebaseapp.com",
  projectId: "note-auth-4a724",
  storageBucket: "note-auth-4a724.firebasestorage.app",
  messagingSenderId: "156278073522",
  appId: "1:156278073522:web:d2aa2fbc2f659a61edc1ab",
  measurementId: "G-85C4KMK7SP"
  }
};
const secondaryApp = {
  apiKey: "AIzaSyBoZic311jisygiV7Cw97TJsEtqeDtEK8c",
  authDomain: "adding-poduct.firebaseapp.com",
  projectId: "adding-poduct",
  storageBucket: "adding-poduct.appspot.com",
  messagingSenderId: "890097519125",
  appId: "1:890097519125:web:970859bdaa8fd7e790dc1c",
  measurementId: "G-EQ38006WD9"
};
const MysecondaryApp=initializeApp(secondaryApp,'secondary');


bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideAnimationsAsync(),
    provideRouter(routes),
  provideFirebaseApp(()=>initializeApp(environment.firebase)) , provideFirestore(() => getFirestore()), provideStorage(() => getStorage(MysecondaryApp)),
  
  
  
     // التوجيه
  ]
}).catch((err) => console.error(err));