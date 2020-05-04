import { Component, OnInit, Input } from '@angular/core';
import { IsOnlineService } from './../is-online.service.js';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent {
  @Input() name: string;
  @Input() message: string;
  @Input() status;

  constructor(public onlineService: IsOnlineService) {}
}
