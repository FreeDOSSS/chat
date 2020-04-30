import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { connect, sendMessage } from './../../api/ws.js';
import { Router } from '@angular/router';

import isAuth from './../../api/isAuth.js';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  status: boolean = false;
  mes: string = '';
  list = [];
  client = [];

  constructor(private router: Router) {}

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  ngOnInit(): void {
    const socket = connect();
    isAuth(this.router);
    socket.onmessage = (event) => {
      const body = JSON.parse(event.data);

      if (body.mes) {
        this.list = [...this.list, ...body.mes];
      }
      this.client = Object.values(body.client);
      console.log('body.client', body.client);
      console.log('this.client', this.client);
    };
    this.scrollToBottom();
    socket.onopen = () => (this.status = true);
    socket.onclose = () => (this.status = false);
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  saveInput({ target }) {
    this.mes = target.value;
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  send(event) {
    event.preventDefault();
    sendMessage(this.mes);
    this.mes = '';
  }
}
