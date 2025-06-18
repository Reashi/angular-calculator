import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from '../button/button';
import { History } from '../../services/history';
import { DoubleDigitPipe } from '../../pipes/double-digit-pipe';
import { Calculator } from '../../services/calculator';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule, Button, DoubleDigitPipe],
  templateUrl: './calculator.html',
  styleUrl: './calculator.scss',
  providers: [History]
})
export class CalculatorComponent {
  historyList: string[] = [];

  constructor(
    private history: History,
    private calculator: Calculator
  ) {}

  // Getter'lar view için
  get currentInput(): string {
    return this.calculator.getCurrentInput();
  }

  get previousInput(): string {
    return this.calculator.getPreviousInput();
  }

  get operator(): string {
    return this.calculator.getOperator();
  }

  handleButtonClick(value: string) {
    // Sayı veya nokta
    if (!isNaN(+value) || value === '.') {
      this.calculator.addDigit(value);
    }
    // Clear butonu
    else if (value === 'C') {
      this.calculator.clear();
    }
    // Backspace butonu
    else if (value === '←') {
      this.calculator.backspace();
    }
    // Eşittir butonu
    else if (value === '=') {
      const prevInput = this.calculator.getPreviousInput();
      const currInput = this.calculator.getCurrentInput();
      const op = this.calculator.getOperator();
      
      if (prevInput && currInput && op) {
        const expression = `${prevInput} ${op} ${currInput} = `;
        this.calculator.calculateResult();
        const result = this.calculator.getCurrentInput();
        
        // History'e ekle
        this.history.add(expression + result);
        this.historyList = this.history.get();
      }
    }
    // Operatör butonları
    else {
      this.calculator.setOperator(value);
    }
  }
}

export { Calculator };

