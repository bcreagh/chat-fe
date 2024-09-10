import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

export interface HiddenField {
    fieldName: string;
    label: string;
}

export interface Word {
    word: string;
    explanation: string;
}

export interface Answer {
    english: string;
    ukrainian: string;
    hiddenFields: HiddenField[];
    words: Word[];
}

export interface ChatResp  {
    message: string;
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