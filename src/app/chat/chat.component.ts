import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ChatService } from '../../services/chat';
import { BotConfig, BotService } from '../../services/bot';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {

  constructor(private chatService: ChatService, private botService: BotService) { }

  ngOnInit() {
    this.botService.getBot('translator').subscribe((resp) => {
      this.botConfig = resp;
    });
  }

  chatQuery: string = '';
  botConfig: BotConfig = new BotConfig();
  response: any;


  callChat() {
    this.chatService.sendMessage(this.chatQuery).subscribe((resp) => {
      console.log(resp);
      // console.log("ukrainian" + resp.ukrainian);
      console.log(this.botConfig);
    });
  }
}
