import { RouterModule, Routes } from '@angular/router';
import { Intro } from './intro/intro';
import { Login } from './auth/login/login';
import { MessageList } from './message/message-list/message-list';
import { Conversation } from './message/conversation/conversation';

export const routes: Routes = [
    { path: '' , component: Intro},
    { path: 'login' , component: Login},
    { path: 'messages' , component: MessageList},
    { path: 'conversation', component: Conversation}
];
