import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class History {
  private history: string[] = [];

    add(entry: string) {
      this.history.unshift(entry); // en üste ekle
      if (this.history.length > 5) {
        this.history.pop(); // en eskiyi sil
      }
    }

    get() {
      return this.history;
    }
} 