import { NgModule } from '@angular/core';
import { ChatComponent } from './chat.component';
import { MessageComponent } from './message/message.component';
import { IsOnlineService } from './is-online.service';
import { OnlinePipe } from './online.pipe';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [BrowserModule],
  declarations: [ChatComponent, MessageComponent, OnlinePipe],
  providers: [IsOnlineService],
})
export class ChatModule {}
