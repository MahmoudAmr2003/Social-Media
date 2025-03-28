import { Component, OnInit } from '@angular/core';
import { FireService } from '../fire.service';

@Component({
  selector: 'app-user-frinds',
  imports: [],
  templateUrl: './user-frinds.component.html',
  styleUrl: './user-frinds.component.scss'
})
export class UserFrindsComponent implements OnInit {
constructor(private _FireService:FireService)
{

}
ngOnInit(): void {
  
}
}
