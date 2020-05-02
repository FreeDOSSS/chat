import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { socket } from '../../api/ws.js';
@Injectable({
  providedIn: 'root',
})
export class IsOnlineService {
  public client$ = new BehaviorSubject<any>([]);
  // public client$ = new Subject<any[]>();
  public list = new Subject<any>();

  constructor() {
    this.client$.subscribe((v) => console.log('v', v));
  }

  start() {
    // TODO: Понять почему не работает в конструкторе
    this.client$.next([]);
    socket.onmessage = (event) => {
      const body = JSON.parse(event.data);
      const arrClient = Object.values(body.client);

      if (body.mes) {
        this.list.next(body.mes);
      }
      this.client$.next(arrClient);
    };
  }
}
