import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-post-style',
  imports: [RouterModule],
  templateUrl: './add-post-style.component.html',
  styleUrl: './add-post-style.component.scss'
})
export class AddPostStyleComponent {
  show_dialog:boolean=false;
  showDialog()
  {
   this.show_dialog=!this.show_dialog;
  }
}
