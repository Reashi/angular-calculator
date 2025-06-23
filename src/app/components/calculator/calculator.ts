import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from '../button/button';
import { History } from '../../services/history.service';
import { DoubleDigitPipe } from '../../pipes/double-digit-pipe';
import { Calculator } from '../../services/calculator.service';
import { CalculatorApiService } from '../../services/calculator-api.service';
import { 
  HistoryEntry, 
  OperationType, 
  OperationSymbols 
} from '../../models/calculation.model';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule, Button, DoubleDigitPipe],
  templateUrl: './calculator.html',
  styleUrl: './calculator.scss',
  providers: [History]
})
export class CalculatorComponent implements OnInit {
  historyList: HistoryEntry[] = [];

  constructor(
    private history: History,
    private calculator: Calculator,
    private calculatorApi: CalculatorApiService
  ) {}

  ngOnInit() {
    // Sayfa yüklendiğinde API'den history'yi çek
    this.loadHistory();
  }

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
        const a = parseFloat(prevInput);
        const b = parseFloat(currInput);
        const expression = `${prevInput} ${op} ${currInput} = `;
        
        // API'ye göre operasyon seçimi
        this.calculateWithApi(a, b, op, expression);
      }
    }
    // Karekök işlemi
    else if (value === '√') {
      const currInput = this.calculator.getCurrentInput();
      if (currInput && currInput !== '0') {
        const a = parseFloat(currInput);
        this.calculatorApi.squareRoot(a).subscribe({
          next: (response) => {
            this.calculator.clear();
            this.calculator.addDigit(response.result.toString());
            // API'den history'yi yeniden yükle
            this.loadHistory();
          },
          error: (error) => {
            console.error('Karekök hesaplanırken hata:', error);
          }
        });
      }
    }
    // Operatör butonları
    else {
      this.calculator.setOperator(value);
    }
  }

  private calculateWithApi(a: number, b: number, operator: string, expression: string) {
    let apiCall;
    
    switch (operator) {
      case '+':
        apiCall = this.calculatorApi.add(a, b);
        break;
      case '-':
        apiCall = this.calculatorApi.subtract(a, b);
        break;
      case '*':
        apiCall = this.calculatorApi.multiply(a, b);
        break;
      case '/':
        apiCall = this.calculatorApi.divide(a, b);
        break;
      case '^':
        apiCall = this.calculatorApi.power(a, b);
        break;
      default:
        // Fallback to local calculation
        this.calculator.calculateResult();
        const result = this.calculator.getCurrentInput();
        // API'den history'yi yeniden yükle (local ekleme yapmıyoruz)
        this.loadHistory();
        return;
    }

    // API çağrısını yap
    apiCall.subscribe({
      next: (response) => {
        // Calculator state'ini güncelle
        this.calculator.clear();
        this.calculator.addDigit(response.result.toString());
        
        // API'den history'yi yeniden yükle
        this.loadHistory();
      },
      error: (error) => {
        console.error('API çağrısında hata:', error);
        // Hata durumunda lokal hesaplama yap
        this.calculator.calculateResult();
        const result = this.calculator.getCurrentInput();
        // API'den history'yi yeniden yükle
        this.loadHistory();
      }
    });
  }

  // History API metodları
  loadHistory() {
    this.calculatorApi.getHistory().subscribe({
      next: (history) => {
        // API'den gelen history'yi local history'ye dönüştür
        this.historyList = history.map(item => {
          let expression = '';
          
          // Operation type'ı enum'a dönüştür ve sembol al
          const operationType = item.operation as OperationType;
          
          if (operationType === OperationType.SQUARE_ROOT) {
            expression = `${OperationSymbols[OperationType.SQUARE_ROOT]}${item.parameter1} = ${item.result}`;
          } else {
            const symbol = OperationSymbols[operationType] || '?';
            expression = `${item.parameter1} ${symbol} ${item.parameter2} = ${item.result}`;
          }
          
          return {
            expression: expression,
            timestamp: new Date(item.date).toLocaleTimeString('tr-TR', { 
              hour: '2-digit', 
              minute: '2-digit', 
              second: '2-digit' 
            })
          };
        });
      },
      error: (error) => {
        console.error('History yüklenirken hata:', error);
      }
    });
  }

  clearApiHistory() {
    this.calculatorApi.clearHistory().subscribe({
      next: () => {
        this.historyList = [];
        console.log('API history temizlendi');
        // API'den güncel history'yi yeniden yükle
        this.loadHistory();
      },
      error: (error) => {
        console.error('History temizlenirken hata:', error);
      }
    });
  }

  clearHistory() {
    // Sadece API history'yi temizle
    this.clearApiHistory();
  }
}

export { Calculator };

