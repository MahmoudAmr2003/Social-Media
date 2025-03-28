import { Component } from '@angular/core';

@Component({
  selector: 'app-rev',
  imports: [],
  templateUrl: './rev.component.html',
  styleUrl: './rev.component.scss'
})
export class RevComponent {
// uploding image 
  // kefjer(file:File):Observable<any>
  // {
  // const stRef=ref(this._Storage,file.name);
  //  const uploadedFile=uploadBytesResumable(stRef,file);
  //  return new Observable((observer)=>{
  //   uploadedFile.on(
  //     'state_changed',  
  //    ()=> {getDownloadURL(uploadedFile.snapshot.ref).then((Url)=>{
  //       observer.next(Url);
  //     })
  //   }
  //   )
  
    
  //  })
  
  
   
  // }
// doing query

// jkrlhtyk()
// { 
//   const collref=collection(this._Firestore,'posts');
//   const qref=query(collref,where('name','==','mahmoud'),orderBy('date','desc'));
//   collectionData(qref,{idField:'id'});
// }


}
