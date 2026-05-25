import { Component, effect, signal } from '@angular/core';
import { ApiService, UserData, UserListItem } from '../../apiservice';
import { CommonModule } from '@angular/common';
import { MessageList } from '../message-list/message-list';
import { Router } from '@angular/router';
import { Socket } from '../../socket';
import { Bubble } from '../bubble/bubble';

@Component({
  selector: 'app-conversation',
  standalone: true,
  imports: [CommonModule,MessageList,Bubble],
  templateUrl: './conversation.html',
  styleUrl: './conversation.css',
})
export class Conversation {
  
  users =  signal<UserListItem[]>([]);
  errorMessage = signal('');
  selectedUserId = signal('');
  public knownUsers;
  constructor(private apiService: ApiService,private socketService: Socket,private router:Router) {
      effect(()=>{
        this.loadUsers();
      });
      socketService.connect(apiService.loginStatus().id,apiService.loginStatus().token);
      this.knownUsers = JSON.parse(localStorage.getItem("known-contacts")||'[]');
      // if(!this.apiService.loginStatus().loggedIn){
      //     this.router.navigate(['/login']);
      // }
  }

 

  loadUsers(): void {
    this.apiService.getUserList().subscribe( (data) => {

        if ('error' in data) {
          this.errorMessage.set(data.error);
          return;
        }

        this.users.set(data);
      },

      
    );
  }

  addKnownConversation(userName: string){
    let contactsArray:String[] = [];
    const contactListString = localStorage.getItem("known-contacts");
      if(contactListString!=null){
        contactsArray = JSON.parse(contactListString);
      }
      if(!contactsArray.includes(userName)){ 
        contactsArray.push(userName); 
       } 
       localStorage.setItem("known-contacts", JSON.stringify(contactsArray));
     
       
  }
  loadConversation(userId: string) {
       this.selectedUserId.set(userId);
  }
 

}
