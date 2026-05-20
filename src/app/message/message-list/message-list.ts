import { Component } from '@angular/core';
import { signal,input, effect,  } from '@angular/core';
import { ApiService, Message } from '../../apiservice';

@Component({
  selector: 'app-message-list',
  imports: [],
  templateUrl: './message-list.html',
  styleUrl: './message-list.css',
})
export class MessageList {
   userId = input<string>('');
  readonly messages = signal<Message[]>([]);
  readonly isLoading = signal(false);
  readonly errorMessage = signal('');
  constructor (private apiService: ApiService){

    effect(() => {
      const id = this.userId();

      if (id) {
        this.loadMessages(id);
      }
    });
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
}
  

