/// <reference types="@angular/localize" />

import { bootstrapApplication }             from '@angular/platform-browser';
import { provideHttpClient }                from '@angular/common/http';
import { provideAnimationsAsync }           from '@angular/platform-browser/animations/async';
import { provideRouter }                    from '@angular/router';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore }    from '@angular/fire/firestore';
import { provideStorage, getStorage }        from '@angular/fire/storage';

import { AppComponent }                     from './app/app.component';
import { routes }                           from './app/app.routes';
import { LogLevel, setLogLevel } from '@angular/fire';
import { getAuth, provideAuth } from '@angular/fire/auth';
const environment = {
  firebase: {
    apiKey: "AIzaSyAfeaOPtEkZ1JF37sW0c7-LK9NiZ2Eg3S8",
    authDomain: "note-auth-4a724.firebaseapp.com",
    projectId: "note-auth-4a724",
    storageBucket: "note-auth-4a724.appspot.com",  // تأكد إنّها .appspot.com
    messagingSenderId: "156278073522",
    appId: "1:156278073522:web:d2aa2fbc2f659a61edc1ab",
    measurementId: "G-85C4KMK7SP"
  }
};

bootstrapApplication(AppComponent, {
  providers: [
    // ———— Firebase ————
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideAuth(() => getAuth()),
    

  

    // ———— بقية الـ providers ————
    provideHttpClient(),
    provideRouter(routes),
    provideAnimationsAsync(),
  ]
})

.catch(err => console.error(err));
setLogLevel(LogLevel.SILENT)