import { Component, OnInit, Input, Injectable } from '@angular/core';
import { IsOnlineService } from '../is-online.service.js';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  providers: [IsOnlineService],
})
export class MessageComponent implements OnInit {
  @Input() name: string;
  @Input() message: string;
  @Input() status;

  constructor(private onlineService: IsOnlineService) {}

  ngOnInit(): void {
    this.getStatus();
    // this.onlineService.client$.subscribe((x) => {
    //   console.log('x', x);
    // });
  }

  getStatus() {}
}
