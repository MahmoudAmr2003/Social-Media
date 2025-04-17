import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SortArrayPipe } from '../sort-array.pipe';
import { SpicialDatePipe } from '../spicial-date.pipe';

@Component({
  selector: 'app-comment',
  imports: [CommonModule,SortArrayPipe,SpicialDatePipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
@Input() comments:any[]=[];
trackById(index:number,item:any)
{
  return item.docId;
}
  
}
