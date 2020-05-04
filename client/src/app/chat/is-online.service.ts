import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import params from './../../constants/params.js';
const { wsServerUrl } = params;
@Injectable({
  providedIn: 'root',
})
export class IsOnlineService {
  public client$ = new BehaviorSubject<any>([]);
  public list = new Subject<any>();
  public socket;

  constructor() {}

  connect() {
    this.socket = new WebSocket(
      `${wsServerUrl}?name=${localStorage.getItem('name')}`
    );

    this.socket.onmessage = (event) => {
      const body = JSON.parse(event.data);

      const arrClient = Object.values(body.client);

      this.client$.next(arrClient);
      if (body.mes) {
        this.list.next(body.mes);
      }
    };
  }

  sendMessage(message) {
    const body = JSON.stringify({
      message,
      name: localStorage.getItem('name'),
    });
    this.socket.send(body);
  }
}
