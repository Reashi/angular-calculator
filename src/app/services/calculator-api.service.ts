import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

export interface CalculationRequest {
  parameter1: number;
  parameter2?: number; // squareRoot için parameter2 gerekli değil
}

export interface CalculationResponse {
  result: number;
  operation: string;
  timestamp: string;
}

export interface HistoryItem {
  id: string;
  operation: string;
  result: number;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class CalculatorApiService {
  private readonly baseUrl = '/api';
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${environment.apiToken}`
  });

  constructor(private http: HttpClient) {}

  // Calculator operations
  add(a: number, b: number): Observable<CalculationResponse> {
    const request: CalculationRequest = { parameter1: a, parameter2: b };
    return this.http.post<CalculationResponse>(
      `${this.baseUrl}/calculator/add`, 
      request, 
      { headers: this.headers }
    ).pipe(
      catchError(this.handleError)
    );
  }

  subtract(a: number, b: number): Observable<CalculationResponse> {
    const request: CalculationRequest = { parameter1: a, parameter2: b };
    return this.http.post<CalculationResponse>(
      `${this.baseUrl}/calculator/subtract`, 
      request, 
      { headers: this.headers }
    );
  }

  multiply(a: number, b: number): Observable<CalculationResponse> {
    const request: CalculationRequest = { parameter1: a, parameter2: b };
    return this.http.post<CalculationResponse>(
      `${this.baseUrl}/calculator/multiply`, 
      request, 
      { headers: this.headers }
    );
  }

  divide(a: number, b: number): Observable<CalculationResponse> {
    const request: CalculationRequest = { parameter1: a, parameter2: b };
    return this.http.post<CalculationResponse>(
      `${this.baseUrl}/calculator/divide`, 
      request, 
      { headers: this.headers }
    );
  }

  power(a: number, b: number): Observable<CalculationResponse> {
    const request: CalculationRequest = { parameter1: a, parameter2: b };
    return this.http.post<CalculationResponse>(
      `${this.baseUrl}/calculator/power`, 
      request, 
      { headers: this.headers }
    );
  }

  squareRoot(a: number): Observable<CalculationResponse> {
    const request: CalculationRequest = { parameter1: a };
    return this.http.post<CalculationResponse>(
      `${this.baseUrl}/calculator/squareRoot`, 
      request, 
      { headers: this.headers }
    );
  }

  // History operations
  getHistory(): Observable<HistoryItem[]> {
    return this.http.get<HistoryItem[]>(
      `${this.baseUrl}/history/getHistory`, 
      { headers: this.headers }
    );
  }

  clearHistory(): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}/history/clearHistory`, 
      { headers: this.headers }
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API çağrısında hata:', error);
    
    if (error.status === 0) {
      // Network hatası veya CORS
      console.error('Network hatası - API sunucusu çalışmıyor olabilir:', error.error);
      return throwError(() => new Error('Sunucuya bağlanılamıyor. Lütfen daha sonra tekrar deneyin.'));
    }
    
    return throwError(() => error);
  }
}

 