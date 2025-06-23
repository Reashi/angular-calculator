import { Injectable } from '@angular/core';
import { HistoryEntry } from '../models/calculation.model';

@Injectable({
  providedIn: 'root'
})
export class History {
  private history: HistoryEntry[] = [];

    add(entry: string) {
      const now = new Date();
      const timestamp = now.toLocaleTimeString('tr-TR', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      });
      
      this.history.unshift({ 
        expression: entry, 
        timestamp: timestamp 
      }); // en üste ekle
      
      if (this.history.length > 5) {
        this.history.pop(); // en eskiyi sil
      }
    }

    get(): HistoryEntry[] {
      return this.history;
    }

    clear() {
      this.history = [];
    }
} 