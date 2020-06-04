import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MoreComponent } from './more/more.component';
import { ContactComponent } from './contact/contact.component';
import { AccountComponent } from './account/account.component';
import { ViewComponent } from './view/view.component';
import { NoteComponent } from './note/note.component';


const routes: Routes = [{
  path: '',redirectTo:'home',pathMatch:'full'
},{
  path:'home',component:HomeComponent
},{
  path:'welcome',component:WelcomeComponent
},{
  path:'login',component:LoginComponent
},{
  path:'signup',component:SignupComponent
},{
  path:'more' ,component:MoreComponent
},{
  path:'contact', component:ContactComponent
},{
  path:'account', component:AccountComponent
},{
  path:'note',component:NoteComponent
},{
  path:'view', component:ViewComponent
},{
  path:'**', redirectTo: 'home'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
