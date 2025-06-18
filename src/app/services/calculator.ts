import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Calculator {
  private currentInput: string = '';
  private previousInput: string = '';
  private operator: string = '';

  getCurrentInput(): string {
    return this.currentInput || '0';
  }

  getPreviousInput(): string {
    return this.previousInput;
  }

  getOperator(): string {
    return this.operator;
  }

  addDigit(digit: string): void {
    if (digit === '.' && this.currentInput.includes('.')) {
      return; // Zaten nokta var, ekleme
    }
    this.currentInput += digit;
  }

  setOperator(op: string): void {
    if (this.currentInput === '') return;
    
    if (this.previousInput !== '' && this.operator !== '') {
      // Mevcut işlemi hesapla
      this.calculateResult();
    }
    
    this.previousInput = this.currentInput;
    this.currentInput = '';
    this.operator = op;
  }

  calculateResult(): void {
    if (this.previousInput === '' || this.currentInput === '' || this.operator === '') return;
    
    const num1 = parseFloat(this.previousInput);
    const num2 = parseFloat(this.currentInput);
    const result = this.calculate(num1, num2, this.operator);
    
    if (!isNaN(result)) {
      this.currentInput = result.toString();
      this.previousInput = '';
      this.operator = '';
    }
  }

  clear(): void {
    this.currentInput = '';
    this.previousInput = '';
    this.operator = '';
  }

  backspace(): void {
    if (this.currentInput.length > 0) {
      this.currentInput = this.currentInput.slice(0, -1);
    }
  }

  private calculate(a: number, b: number, operator: string): number {
    switch (operator) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return b !== 0 ? a / b : NaN;
      default: return NaN;
    }
  }
}
