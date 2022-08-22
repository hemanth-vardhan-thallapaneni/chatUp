import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import {AngularFireModule} from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';

import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './features/home/home.component';

//External imports 
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


import { ChatListComponent, GroupDetailsDialog } from './features/home/chat-list/chat-list.component';
import { ChatScreenComponent } from './features/home/chat-screen/chat-screen.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ChatListComponent,
    ChatScreenComponent,
    NavbarComponent,
    GroupDetailsDialog


  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    AngularFireDatabaseModule,
    AngularFireStorageModule,

    BrowserAnimationsModule,


    FlexLayoutModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatSlideToggleModule,
    provideDatabase(() => getDatabase()),
    provideStorage(() => getStorage()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
