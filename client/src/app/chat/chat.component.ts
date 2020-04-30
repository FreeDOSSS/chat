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
  public list = [{ message: '1', name: '1' }];

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  constructor(private router: Router) {}

  ngOnInit(): void {
    const socket = connect();
    isAuth(this.router);
    socket.onmessage = ({ data }) => {
      const body = JSON.parse(data);
      body.forEach((el) => this.list.push(el));
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

  send(event) {
    event.preventDefault();
    sendMessage(this.mes);
    this.mes = '';
  }
}
