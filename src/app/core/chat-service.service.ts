import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth/auth-service.service';
import { map, switchMap } from 'rxjs/operators';
import * as firebase from "firebase/app";
import { arrayUnion, arrayRemove } from "firebase/firestore";
import { Observable, combineLatest, of, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {
  chatId = new BehaviorSubject('');
  constructor(
    private afs: AngularFirestore,
    private auth: AuthServiceService,
    private router: Router
  ) { }
  get(chatId:any) {
    console.log(chatId,'idd')
    return this.afs
      .collection<any>('chats')
      .doc(chatId)
      .snapshotChanges()
      .pipe(
        map((doc:any) => {
          console.log(doc.payload.data(),'pay')
          return { id: doc.payload.id, ...doc.payload.data() };
        })
      );
  }
  async getChats(){
    const collection = this.afs.firestore.collection('chats');
    const snapshot = await collection.get();
    let chats:any = []
    snapshot.forEach((doc:any) => {

    chats.push(
      {
      name:doc.data().name,
      uid:doc.id,
      last_message:doc.data()?.messages[doc.data()?.messages.length -1],
      image:''
    }
    )
    });
  console.log('chats',chats)
   return chats;
  }
  async create(group:any) {
    const user  = await this.auth.getUser();
    
    const data = {
      uid:user?.uid,
      name:group.name,
      image:group.image,
      createdAt: new Date(),
      count: 0,
      messages: []
    };
    console.log('group',data)
    const docRef = await this.afs.collection('chats').add(data);
    this.chatId.next(docRef.id)
    this.getChats();
    // return this.router.navigate(['chats', docRef.id]);
  }
  async sendMessage(chatId:any, content:any) {
    console.log(chatId,content,'service')
    const user = await this.auth.getUser();

    const data = {
      uid:sessionStorage.getItem('id'),
      name:user?.displayName,
      content,
      createdAt: new Date()
    };

    if (user) {
      const ref = this.afs.collection('chats').doc(chatId);
      return ref.update({
        messages: arrayUnion(data)
      });
    }
  }
  joinUsers(chat$: Observable<any>) {
    let chat:any;
    const joinKeys:any = {};

    return chat$.pipe(
      switchMap(c => {
        // Unique User IDs
        chat = c;
        const uids = Array.from(new Set(c.messages.map((v:any) => v.uid)));

        // Firestore User Doc Reads
        const userDocs = uids.map(u =>
          this.afs.doc(`users/${u}`).valueChanges()
        );

        return userDocs.length ? combineLatest(userDocs) : of([]);
      }),
      map(arr => {
        arr.forEach((v:any) => (joinKeys[v.uid] = v));
        chat.messages = chat.messages.map((v:any) => {
          return { ...v, user: joinKeys[v.uid] };
        });

        return chat;
      })
    );
  }
}
