
import {  Routes } from '@angular/router';
import { ResignComponent } from './component/resign/resign.component';
import { LoginComponent } from './Atuth/login/login.component';
import { mygardGuard } from './gards/mygard.guard';
import { SidesComponent } from './component/sides/sides.component';
import { PersonsComponent } from './component/persons/persons.component';
// import { bootstrapApplication } from '@angular/platform-browser';








export const routes: Routes = [

    {path:"",redirectTo:'login',pathMatch:'full'},
    {path:"login",component:LoginComponent},
 
    {path:"side",canActivate:[mygardGuard],component:SidesComponent},


    {path:"resign",component:ResignComponent},

    {
        path: 'frindsrequests', 
     
        canActivate:[mygardGuard],
        loadComponent: () => import('./component/frindsrequests/frindsrequests.component').then(m => m.FrindsrequestsComponent),
      },
      {
path:'add_data',
canActivate:[mygardGuard],
loadComponent:()=>import('./component/add-profile-data/add-profile-data.component').then(m=>m.AddProfileDataComponent)
      },
      
      {
        path: 'addPost', 
     
        canActivate:[mygardGuard],
        loadComponent: () => import('./add-post/add-post.component').then(m => m.AddPostComponent),
      },
      {
        path: 'post', 
     
        canActivate:[mygardGuard],
        loadComponent: () => import('./the-post/the-post.component').then(m => m.ThePostComponent),
      },
      {
        path: 'addImg', 
     
        canActivate:[mygardGuard],
        loadComponent: () => import('./add-img-post/add-img-post.component').then(m => m.AddImgPostComponent),
      },
      {
        path: 'home', 
     
        canActivate:[mygardGuard],
        loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
      },
      

     
      {
        path: 'profile', 
     
        canActivate:[mygardGuard],
        loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent),
      },

      {
        path:'userProfile/:id',
        canActivate:[mygardGuard,],
        loadComponent:()=> import('./component/user/user.component').then(m=>m.UserComponent),
      },
      {
        path:'persons',
        canActivate:[mygardGuard,],
component:PersonsComponent
      },
      {
        path:'frinds',
        canActivate:[mygardGuard,],
loadComponent:()=>import('./frinds/frinds.component').then(m=>m.FrindsComponent)
      },

      {
        path:'notif',
        canActivate:[mygardGuard],
        loadComponent:()=>import('./notif/notif.component').then(m=>m.NotifComponent)
      }
,
      {
        path:'comment',
        canActivate:[mygardGuard],
        loadComponent:()=>import('./comment/comment.component').then(m=>m.CommentComponent)
      },
      {
path:'chat',
loadComponent:()=>import('./chat/chat.component').then(x=>x.ChatComponent)
      },
      {
        path:'send',
        canActivate:[mygardGuard],
        loadComponent:()=>import('./send-requst/send-requst.component').then(m=>m.SendRequstComponent)
      },
      {
        path:'savedPosts',
        canActivate:[mygardGuard],
        loadComponent:()=>import('./saved-posts/saved-posts.component').then(m=>m.SavedPostsComponent)
      },
    {path:"**",redirectTo:'login',pathMatch:'full'},

];