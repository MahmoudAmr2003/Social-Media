import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidesComponent } from './component/sides/sides.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { FireService } from './fire.service';





@Component({
  selector: 'app-root',
  imports: [RouterOutlet,SidesComponent,FormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  islight:boolean=false;
  isLogged:boolean=false;
  constructor(private _AuthService:AuthService, private FireService:FireService)
  {
  

  }
  ngOnInit()
  {
this._AuthService.$isLogged.subscribe((res)=>{
  this.isLogged=res;
})
this._AuthService.$islight.subscribe((res)=>{
  this.islight=res;
})
  }
  title = 'myapp';

}
