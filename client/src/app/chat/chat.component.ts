import { Component, OnInit } from '@angular/core';
import { connect, sendMessage } from './../../api/ws.js';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  status: boolean = false;
  mes: string = 'sd ';
  list: any[] = [{ message: 'asdad', name: 'asdad' }];
  constructor() {}

  ngOnInit(): void {
    const socket = connect();
    socket.onmessage = function ({ data }) {
      const body = JSON.parse(data);
      this.list = [...body];
      console.log('this.list', this.list);
    };
    socket.onopen = () => (this.status = true);
  }

  saveInput({ target }) {
    this.mes = target.value;
  }

  send(event) {
    event.preventDefault();
    sendMessage(this.mes);
  }
}
