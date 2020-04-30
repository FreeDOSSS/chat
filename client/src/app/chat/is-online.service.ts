import { Injectable, OnInit } from '@angular/core';
import { socket } from '../../api/ws.js';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class IsOnlineService {
  public client = new Subject<any>();
  public list = new Subject<any>();

  constructor() {
    this.list.next([]);
    this.client.next([]);

    this.list.next(1);
    this.list.next(2);

    //   socket.onmessage = (event) => {
    //     const body = JSON.parse(event.data);
    //   //   this.client.next(Object.values(body.client));
    //   //   if (body.mes) {
    //   //     this.list.next(body.mes);
    //   //     console.log(body.mes);
    //   //   }
    //   // };
  }

  // getList() {
  //   return this.list;
  // }

  // clientIsOnline(name) {
  //   return this.client;
  // }
}
