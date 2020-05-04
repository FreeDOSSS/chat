import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import isAuth from './../../api/isAuth.js';
import { IsOnlineService } from './is-online.service.js';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  status: boolean = false;
  list = [];
  // client = [];

  constructor(private router: Router, public onlineService: IsOnlineService) {}

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  ngOnInit(): void {
    isAuth(this.router);
    // this.onlineService.socket;
    this.onlineService.connect();
    this.onlineService.list.subscribe((x) => {
      this.list = [...this.list, ...x];
    });

    this.onlineService.socket.onopen = () => (this.status = true);
    this.onlineService.socket.onclose = () => (this.status = false);
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  send(event) {
    event.preventDefault();
    const { message } = event.target;
    if (message.value) {
      this.onlineService.sendMessage(message.value);
      message.value = '';
    }
  }
}
