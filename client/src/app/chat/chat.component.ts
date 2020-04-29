import { Component, OnInit } from '@angular/core';
import { connect } from './../../api/ws.js';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  status: boolean = false;

  constructor() {}

  ngOnInit(): void {
    connect().onopen = () => (this.status = true);
    // let socket = new WebSocket('ws://localhost:7000');
    // socket.onopen = function (e) {
    //   // socket.send('Меня зовут Джон');
    // };
    // socket.onmessage = function (event) {
    //   alert(`[message] Данные получены с сервера: ${event.data}`);
    // };
    // socket.onclose = function (event) {
    //   if (event.wasClean) {
    //   } else {
    //   }
    // };
    // socket.onerror = function (error) {};
  }

  // sendMessage({ target }) {
  //   socket
  // }
}
