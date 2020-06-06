import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FootComponent } from './foot/foot.component';
import { MoreComponent } from './more/more.component';
import { ContactComponent } from './contact/contact.component';
import { AccountComponent } from './account/account.component';
import { ViewComponent } from './view/view.component';
import { NoteComponent } from './note/note.component';
import { CopyClipboardModule } from './shared/copyToClipboard/copy-clipboard.module';


import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AuthService } from './shared/service/auth.service';
import { DataService } from './shared/service/data.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WelcomeComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    FootComponent,
    MoreComponent,
    ContactComponent,
    AccountComponent,
    ViewComponent,
    NoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CopyClipboardModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule
  ],
  providers: [ AuthService, DataService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
