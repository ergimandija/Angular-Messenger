import { Component } from '@angular/core';
import { signal,input, effect,  } from '@angular/core';
import { ApiService, Message } from '../../apiservice';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-message-list',
  imports: [FormsModule],
  templateUrl: './message-list.html',
  styleUrl: './message-list.css',
})
export class MessageList {
  messageEntry = '';
   userId = input<string>('');
  readonly messages = signal<Message[]>([]);
  readonly isLoading = signal(false);
  readonly errorMessage = signal('');
  constructor (private apiService: ApiService, private router: Router){

    effect(() => {
      const id = this.userId();

      if (id) {
        this.loadMessages(id);
      }
    });

     if(!this.apiService.loginStatus().loggedIn){
          this.router.navigate(['/login']);
      }
  }
  async loadMessages(user2Id:string){
    this.isLoading.set(true);
    const data = await this.apiService.getConversation(user2Id);
    if(data.error){
      this.errorMessage.set(data.error);
    } else {
      this.messages.set(data);
      this.isLoading.set(false);
    }
    
  }

  async sendMessage(){
      const response =  await this.apiService.sendMessage(this.userId(),this.messageEntry);
      const message: Message = {
            sender_id: this.apiService.loginStatus().id,
            reciever_id: this.userId(),
            message: this.messageEntry,
      };
      if(response.error){
      this.errorMessage.set(response.error);
    } else {
      console.log(response);
      this.messages.update(msgs => [...msgs, message]);
      this.scrollToBottom();
    }
  }

  scrollToBottom(): void {
    setTimeout(() => {
      const container = document.getElementById('messageContainer');
      if (container) container.scrollTop = container.scrollHeight;
    }, 0);
  }

  async refreshMessages() {
  await this.loadMessages(this.userId());
  this.scrollToBottom();
}
}
  

