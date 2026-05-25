import { Component, output, inject,signal,effect,input, untracked  } from '@angular/core';
import { Socket } from '../../socket';

@Component({
  selector: 'app-bubble',
  imports: [],
  templateUrl: './bubble.html',
  styleUrl: './bubble.css',
})
export class Bubble {

  private socket = inject(Socket);
  currentUserId = input<string>();
  public isHidden = signal<boolean>(true);
  public currentMessage = this.socket.lastMessage;
  public currentSender = this.socket.senderId;
  public onClickBubble = output<string>();
  constructor() {
    effect(() => {
      const msg = this.currentMessage();
      const currentUserId = untracked(() => this.currentUserId());
      const senderId = untracked(() => this.currentSender());

      if (msg && msg.trim() !== '' && currentUserId!=senderId) {
        this.isHidden.set(false);      

        // Hide after 2 seconds
        this.hideMessageDelayed(3000);
      }
    });
  }

  hideMessageDelayed(milliseconds: number) {
    setTimeout(() => {
      this.isHidden.set(true);
    }, milliseconds);
  }

  clickBubble(){
    this.onClickBubble.emit(this.currentSender());
  }
}
