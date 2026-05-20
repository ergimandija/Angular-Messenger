import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlSegment } from '@angular/router';
const initialLoginStatus = {
  loggedIn: false,
  loginError: false,
  id: "",
  username: "",
  token: ""
};

export interface Message {
  sender_id: string,
  reciever_id: string,
  message: string,
  timestamp?: string
}

export interface UserData {
  token?: string;
  id?: string;
  error?: string;
}

export interface UserListItem{
  id?:string;
  name?:string;
  group_id?:string;
  error?: string;
}



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = `http://webp-ilv-backend.cs.technikum-wien.at/messenger/`;

  private _loginStatus = signal(initialLoginStatus);
  public loginStatus = this._loginStatus.asReadonly();

  constructor(private httpClient: HttpClient) { }

  /**
   * logs in and updates signal loginStatus
   * @param username 
   * @param password 
   * @returns 
   */
  async login(username: string, password: string) {
    // TODO: implement login using fetch()
    const userData = this.httpClient.post<UserData>(this.apiUrl+"/login.php", new URLSearchParams({
                username_or_email: username,
                password: password
            }),
            {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
    );
    userData.subscribe(data=>{
        if(data.error){
            console.log(data.error);
        } else {
          if(data.id != null && data.token != null){
             this._loginStatus.set({
              loggedIn: true,
              loginError: false,
              id: data.id,
              username: username,
              token: data.token
            });
            
          }
        }
    });

    
   
  }

  getUserList(){
    const token =  this._loginStatus().token;
    const userList = this.httpClient.get<UserListItem[]| {error: string}>(this.apiUrl+"/get_users.php?token="+token+"&id="+this._loginStatus().id);
    return userList;

  }


  async getConversation(user2Id:string){
    const token = this._loginStatus().token;
    const data = await fetch(this.apiUrl + "get_conversation.php?token=" + token + "&user1_id=" + this._loginStatus().id + "&user2_id=" + user2Id);
        const conversation = await data.json();
        if (conversation.error) {
            return { error: conversation.error };
        }
        return conversation;
  }
  
  async sendMessage(recieverId: string,message: string){
    const token = this._loginStatus().token;
    const response = await fetch(this.apiUrl + "send_message.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                sender_id: this._loginStatus().id,
                receiver_id: recieverId,
                token: token,
                message: message
            })
        });
        const responseData = await response.json();
        if (responseData.error) {
            return { success: false, error: responseData.error };
        }
        return responseData;
  }


  /**
   * logs out and updates signal loginStatus
   */
  logout() {
    this._loginStatus.set(initialLoginStatus);
  }

  // TODO implement other API calls
}