import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { socket, sendMessage } from './../../api/ws.js';
import { Router } from '@angular/router';

import isAuth from './../../api/isAuth.js';
import { IsOnlineService } from './is-online.service.js';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: [IsOnlineService],
})
export class ChatComponent implements OnInit {
  status: boolean = false;
  mes: string = '';
  list = [];
  // client = [];

  constructor(private router: Router, private onlineService: IsOnlineService) {}

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  ngOnInit(): void {
    isAuth(this.router);
    this.onlineService.list.subscribe((x) => {
      this.list = [...this.list, ...x];
    });
    this.onlineService.start();

    socket.onopen = () => (this.status = true);
    socket.onclose = () => (this.status = false);
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  // TODO: Убрать и перенести в send
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
