import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

// Example usage
const apiUrl = 'http://localhost:8000/chat';

class ChatReq {
    constructor(input: string, bot: string) {
        this.input = input;
        this.bot = bot;
    }

    input: string;
    bot: string;
}

export class Word {
    word: string = "";
    explanation: string = "";
}

export class ChatResp {
    english: string = "";
    ukrainian: string = "";
    stressed: string = "";
    words: Word[] = [];
}

@Injectable({
    providedIn: 'root',
})
export class ChatService {
    constructor(private http: HttpClient) {}

    public sendMessage(query: string) {
        return this.http.post<ChatResp>(apiUrl, new ChatReq(query, "translator"));
    }
}