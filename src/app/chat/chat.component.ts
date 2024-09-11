import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ChatResp, ChatService } from '../../services/chat';
import { BotConfig, BotService } from '../../services/bot';

class ResponseWord {
  word: string = '';
  explanationIndex: number = -1;
}

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
      console.log(resp);
    });
  }

  chatQuery: string = '';
  botConfig: BotConfig = new BotConfig();
  response: ChatResp = new ChatResp();
  responseWords: ResponseWord[] = [];
  workingAreaContent: string = '';


  callChat() {
    this.chatService.sendMessage(this.chatQuery).subscribe((resp) => {
      this.response = resp;
      this.responseWords = [];
      this.workingAreaContent = '';
      let i = 0;
      for (let word of resp.ukrainian.split(' ')) {
        let responseWord = new ResponseWord();
        responseWord.word = word;
        if (resp.words.length > i && resp.words[i].word == word.replace(/[,\.]/g, '')) {
          responseWord.explanationIndex = i;
          i++;
          
        }
        this.responseWords.push(responseWord);
      }
    });
  }

  selectWord(index: number) {
    if (index >= 0) {
      this.workingAreaContent = this.response.words[index].explanation;
    } else {
      this.workingAreaContent = '';
    }
  }

  showField(fieldName: string) {
    this.workingAreaContent = this.response[fieldName as keyof ChatResp].toString();
  }
}
