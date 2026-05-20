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

  constructor(private apiService: ApiService,private router:Router) {
      effect(()=>{
        this.loadUsers();
      })
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

  loadConversation(userId: string) {
  this.selectedUserId.set(userId);
  }
 

}
