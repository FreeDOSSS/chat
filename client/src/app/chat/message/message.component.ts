import { Component, OnInit, Input, Injectable } from '@angular/core';
import { connect } from './../../../api/ws.js';
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
  status;

  constructor(private localService: IsOnlineService) {
    localService.client.subscribe(
      (value) => (this.status = value.includes(name))
    );
  }

  ngOnInit(): void {}
}
