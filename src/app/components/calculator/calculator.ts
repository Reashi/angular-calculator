import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from '../button/button'; // kendi button component'in

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule, Button],
  templateUrl: './calculator.html',
  styleUrl: './calculator.scss'
})
export class Calculator {
  currentInput: string = '';
  previousInput: string = '';
  operator: string='';

  buttons: string[] = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    'C', '0', '<←>', '+',
    '='
  ];

  handleButtonClick(value: string) {
    if(!isNaN(+value)||value=== '.') {
      this.currentInput += value;
    } else if (value === 'C'){
      this.currentInput = '';
      this.previousInput = '';
      this.operator = '';
    } else if (value === '←'){
      this.currentInput = this.currentInput.slice(0, -1);
    } else if (value === '='){
      this.calculate();
    } else {
      if (this.currentInput === '') return;
      this.previousInput = this.currentInput;
      this.currentInput = '';
      this.operator = value;

    }
    }
    calculate(){
      const num1 = parseFloat(this.previousInput);
      const num2 = parseFloat(this.currentInput);
      let result: number = 0;

      switch (this.operator){
        case '+':
          result = num1 + num2;
          break;
        case '-':
          result = num1 - num2;
          break;
        case '*':
          result = num1 * num2;
          break;
        case '/':
          result = num2 !== 0 ? num1 / num2 : NaN;
          break;
        default:
          return;
      }
      this.currentInput = result.toString();
      this.previousInput = '';
      this.operator = '';
    }
  }


