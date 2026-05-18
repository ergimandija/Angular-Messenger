import { Component } from '@angular/core';

@Component({
  selector: 'app-message-list',
  imports: [],
  templateUrl: './message-list.html',
  styleUrl: './message-list.css',
})
export class MessageList {
   messages = [
    { sender: 'Alice', content: 'Hello there!' },
    { sender: 'Bob', content: 'Welcome to the messenger app!' }
  ];
}
