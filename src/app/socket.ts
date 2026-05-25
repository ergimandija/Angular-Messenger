import { Injectable } from '@angular/core';
import { signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Socket {
    private socket!: WebSocket;

    lastMessage: WritableSignal<string> = signal('');
    senderId:  WritableSignal<string> = signal('');
    allMesasges: WritableSignal<string[]> = signal([]); 

    connect( userId:number , token:string){
      this.socket = new WebSocket("ws://webp-ilv-backend.cs.technikum-wien.at:3000?user_id="+userId+"&token="+token);
      this.socket.onmessage = (event) => {
        const returnData = JSON.parse(event.data);
        this.lastMessage.set(returnData.message);
        this.senderId.set(returnData.sender_id);
        // this.allMesasges.update((values) => [...values, event.data]);
      }
    }
}
