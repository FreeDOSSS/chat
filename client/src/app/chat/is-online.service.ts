import { Injectable, OnInit } from '@angular/core';
import { socket } from '../../api/ws.js';
import { Subject, BehaviorSubject, AsyncSubject } from 'rxjs';
@Injectable({
  // providedIn: 'root',
})
export class IsOnlineService {
  // public client = new BehaviorSubject<any>([]);
  client$ = new Subject<any>();
  public list = new Subject<any>();
  public client;

  constructor() {
    this.client$.subscribe({ next: (v) => console.log('v', v) });
    // this.client$.next([0]);
  }

  start() {
    // TODO: Понять почему не работает в конструкторе
    socket.onmessage = (event) => {
      const body = JSON.parse(event.data);
      const arrClient = Object.values(body.client);

      // this.client$.next([1]);
      setTimeout(() => {
        this.client$.next(arrClient);
      });

      if (body.mes) {
        this.list.next(body.mes);
      }
    };
  }
}
