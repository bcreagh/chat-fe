import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
// Example usage
const apiUrl = 'http://localhost:8000/botconfigs';

class BotConfigReq {
    constructor(name: string) {
        this.name = name;
    }

    name: string;
}

export interface HiddenField {
    field_name: string;
    label: string;
}

export class BotConfig {
    name: string = '';
    prompt: string = '';
    hidden_fields: HiddenField[] = [];
    answer_format: any;
}

@Injectable({
    providedIn: 'root',
})
export class BotService {

    constructor(private http: HttpClient) {}

    private botConfigs: Map<string, BotConfig> = new Map<string, BotConfig>();

    public getBot(botName: string) {
        let botConfig: BotConfig;
        if (this.botConfigs.size == 0) {
            return this.http.get<Map<string, BotConfig>>(apiUrl).pipe(map((bots) => {
                console.log(bots);
                this.botConfigs = new Map(Object.entries(bots));
                botConfig = this.botConfigs.get(botName)!;
                return botConfig;
            }));
        }
        botConfig = this.botConfigs.get(botName)!;
        return of(botConfig);
    }
}