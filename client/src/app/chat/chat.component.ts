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
  client = [];

  constructor(private router: Router, private onlineService: IsOnlineService) {
    // socket.onmessage = (event) => {
    //   const body = JSON.parse(event.data);
    //   console.log('In Chat');
    //   if (body.mes) {
    //     this.list = [...this.list, ...body.mes];
    //   }
    // };
  }

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  ngOnInit(): void {
    console.log('this.onlineService.getList()', this.onlineService.getList());
    this.onlineService.getList().subscribe((value) => {
      console.log('value', value);
      this.list = value;
    });
    isAuth(this.router);
    // this.onlineService.list.subscribe({
    //   next: (value) => {
    //     console.log('value', value);
    //     this.list = value;
    //   },
    // });

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
