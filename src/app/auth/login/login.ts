import { Component } from '@angular/core';
import { ApiService } from '../../apiservice';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { effect,signal } from '@angular/core';
import { Socket } from '../../socket';

@Component({
  selector: 'app-login',
  imports: [ FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})


export class Login {
    username = '';
    password = '';
    constructor(private apiService: ApiService, private router: Router){
           effect(()=>{
              if(this.apiService.loginStatus().loggedIn){
                   this.router.navigate(['/conversation']);
              }
          });
    }
    login(){
      this.apiService.login(this.username,this.password);
    }
   
}

