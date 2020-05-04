import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, ReplaySubject } from 'rxjs';
import { socket } from '../../api/ws.js';
@Injectable({
  providedIn: 'root',
})
export class IsOnlineService {
  public client$ = new BehaviorSubject<any>([]);
  // public client$ = new Subject<any>();

  // clientChenge$ = this.client$.asObservable();
  public list = new Subject<any>();

  constructor() {}

  start() {
    socket.onmessage = (event) => {
      const body = JSON.parse(event.data);
      const arrClient = Object.values(body.client);
      console.log(arrClient);
      this.client$.next(arrClient);
      if (body.mes) {
        this.list.next(body.mes);
      }
    };
  }
}
