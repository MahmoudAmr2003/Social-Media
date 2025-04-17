import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortArray'
})
export class SortArrayPipe implements PipeTransform {

  transform(theArray:any[]): any[] {

  const newArray= theArray.sort((a,b)=>a.date?.seconds-b.date?.seconds);
  return newArray
  }

}
