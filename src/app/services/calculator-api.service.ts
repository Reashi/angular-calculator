import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { CalculationRequest, CalculationResponse, HistoryItem } from '../models/calculation.model';

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
    console.log('API İsteği gönderiliyor:', request);
    return this.http.post<CalculationResponse>(
      `${this.baseUrl}/calculator/add`, 
      request, 
      { headers: this.headers }
    ).pipe(
      tap(response => console.log('API Yanıtı:', response)),
      catchError(this.handleError)
    );
  }

  subtract(a: number, b: number): Observable<CalculationResponse> {
    const request: CalculationRequest = { parameter1: a, parameter2: b };
    return this.http.post<CalculationResponse>(
      `${this.baseUrl}/calculator/subtract`, 
      request, 
      { headers: this.headers }
    ).pipe(
      tap(response => console.log('API Yanıtı:', response)),
      catchError(this.handleError)
    );
  }

  multiply(a: number, b: number): Observable<CalculationResponse> {
    const request: CalculationRequest = { parameter1: a, parameter2: b };
    return this.http.post<CalculationResponse>(
      `${this.baseUrl}/calculator/multiply`, 
      request, 
      { headers: this.headers }
    ).pipe(
      tap(response => console.log('API Yanıtı:', response)),
      catchError(this.handleError)
    );
  }

  divide(a: number, b: number): Observable<CalculationResponse> {
    const request: CalculationRequest = { parameter1: a, parameter2: b };
    return this.http.post<CalculationResponse>(
      `${this.baseUrl}/calculator/divide`, 
      request, 
      { headers: this.headers }
    ).pipe(
      tap(response => console.log('API Yanıtı:', response)),
      catchError(this.handleError)
    );
  }

  power(a: number, b: number): Observable<CalculationResponse> {
    const request: CalculationRequest = { parameter1: a, parameter2: b };
    return this.http.post<CalculationResponse>(
      `${this.baseUrl}/calculator/power`, 
      request, 
      { headers: this.headers }
    ).pipe(
      tap(response => console.log('API Yanıtı:', response)),
      catchError(this.handleError)
    );
  }

  squareRoot(a: number): Observable<CalculationResponse> {
    const request: CalculationRequest = { parameter1: a };
    return this.http.post<CalculationResponse>(
      `${this.baseUrl}/calculator/squareRoot`, 
      request, 
      { headers: this.headers }
    ).pipe(
      tap(response => console.log('API Yanıtı:', response)),
      catchError(this.handleError)
    );
  }

  // History operations
  getHistory(): Observable<HistoryItem[]> {
    console.log('API İsteği gönderiliyor: getHistory');
    return this.http.get<HistoryItem[]>(
      `${this.baseUrl}/history/getHistory`, 
      { headers: this.headers }
    ).pipe(
      tap(response => console.log('API Yanıtı:', response)),
      catchError(this.handleError)
    );
  }

  clearHistory(): Observable<any> {
    console.log('API İsteği gönderiliyor: clearHistory');
    return this.http.delete(
      `${this.baseUrl}/history/clearHistory`, 
      { headers: this.headers }
    ).pipe(
      tap(response => console.log('API Yanıtı:', response)),
      catchError(this.handleError)
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

 