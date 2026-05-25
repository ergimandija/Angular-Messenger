import { Component, effect, signal } from '@angular/core';
import { ApiService, UserData, UserListItem } from '../../apiservice';
import { CommonModule } from '@angular/common';
import { MessageList } from '../message-list/message-list';
import { Router } from '@angular/router';
@Component({
  selector: 'app-conversation',
  standalone: true,
  imports: [CommonModule,MessageList],
  templateUrl: './conversation.html',
  styleUrl: './conversation.css',
})
export class Conversation {
  
  users =  signal<UserListItem[]>([]);
  errorMessage = signal('');
  selectedUserId = signal('');
  public knownUsers;
  constructor(private apiService: ApiService,private router:Router) {
      effect(()=>{
        this.loadUsers();
      });

      this.knownUsers = JSON.parse(localStorage.getItem("known-contacts")||'[]');
      console.log(this.knownUsers);
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
        console.log(data);
      },

      
    );
  }

  loadConversation(userId: string,userName: string) {
    let contactsArray:String[] = [];
    console.log(userName);
    const contactListString = localStorage.getItem("known-contacts");
      if(contactListString!=null){
        contactsArray = JSON.parse(contactListString);
      }
       if(!contactsArray.includes(userName)){ 
        contactsArray.push(userName); 
       } 
       localStorage.setItem("known-contacts", JSON.stringify(contactsArray));

       this.selectedUserId.set(userId);
  }
 

}
