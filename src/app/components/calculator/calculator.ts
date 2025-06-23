import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Button } from '../button/button';
import { DoubleDigitPipe } from '../../pipes/double-digit-pipe';
import { HistoryEntry } from '../../models/calculation.model';
import { AppState } from '../../store/calculator.state';
import * as CalculatorActions from '../../store/calculator.actions';
import * as CalculatorSelectors from '../../store/calculator.selectors';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule, Button, DoubleDigitPipe],
  templateUrl: './calculator.html',
  styleUrl: './calculator.scss'
})
export class CalculatorComponent implements OnInit {
  
  // Observable state from store
  currentInput$: Observable<string>;
  previousInput$: Observable<string>;
  operator$: Observable<string>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  historyList$: Observable<HistoryEntry[]>;
  historyLoading$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    // Store'dan observables'ları al
    this.currentInput$ = this.store.select(CalculatorSelectors.selectCurrentInput);
    this.previousInput$ = this.store.select(CalculatorSelectors.selectPreviousInput);
    this.operator$ = this.store.select(CalculatorSelectors.selectOperator);
    this.loading$ = this.store.select(CalculatorSelectors.selectCalculatorLoading);
    this.error$ = this.store.select(CalculatorSelectors.selectCalculatorError);
    this.historyList$ = this.store.select(CalculatorSelectors.selectFormattedHistory);
    this.historyLoading$ = this.store.select(CalculatorSelectors.selectHistoryLoading);
  }

  ngOnInit() {
    // Sayfa yüklendiğinde history'yi yükle
    this.store.dispatch(CalculatorActions.loadHistory());
  }

  // Getter'lar view için (backward compatibility)
  get currentInput(): string {
    let current = '';
    this.currentInput$.subscribe(value => current = value).unsubscribe();
    return current;
  }

  get previousInput(): string {
    let previous = '';
    this.previousInput$.subscribe(value => previous = value).unsubscribe();
    return previous;
  }

  get operator(): string {
    let op = '';
    this.operator$.subscribe(value => op = value).unsubscribe();
    return op;
  }

  get historyList(): HistoryEntry[] {
    let history: HistoryEntry[] = [];
    this.historyList$.subscribe(value => history = value).unsubscribe();
    return history;
  }

  handleButtonClick(value: string) {
    // Sayı veya nokta
    if (!isNaN(+value) || value === '.') {
      this.store.dispatch(CalculatorActions.addDigit({ digit: value }));
    }
    // Clear butonu
    else if (value === 'C') {
      this.store.dispatch(CalculatorActions.clearCalculator());
    }
    // Backspace butonu
    else if (value === '←') {
      this.store.dispatch(CalculatorActions.backspace());
    }
    // Eşittir butonu
    else if (value === '=') {
      const prevInput = this.previousInput;
      const currInput = this.currentInput;
      const op = this.operator;
      
      if (prevInput && currInput && op) {
        const a = parseFloat(prevInput);
        const b = parseFloat(currInput);
        
        // NgRx action dispatch et
        this.store.dispatch(CalculatorActions.performCalculation({ 
          a, b, operator: op 
        }));
      }
    }
    // Karekök işlemi
    else if (value === '√') {
      const currInput = this.currentInput;
      if (currInput && currInput !== '0') {
        const a = parseFloat(currInput);
        this.store.dispatch(CalculatorActions.performSquareRoot({ value: a }));
      }
    }
    // Operatör butonları
    else {
      this.store.dispatch(CalculatorActions.setOperator({ operator: value }));
    }
  }

  clearHistory() {
    this.store.dispatch(CalculatorActions.clearHistory());
  }
}

