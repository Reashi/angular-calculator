import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';
import { CalculatorApiService } from '../services/calculator-api.service';
import * as CalculatorActions from './calculator.actions';

@Injectable()
export class CalculatorEffects {
  private actions$ = inject(Actions);
  private calculatorApi = inject(CalculatorApiService);

  // Calculation effect
  performCalculation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CalculatorActions.performCalculation),
      exhaustMap(({ a, b, operator }) => {
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
            return of(CalculatorActions.calculationFailure({ 
              error: 'Bilinmeyen operatör' 
            }));
        }

        return apiCall.pipe(
          map(result => CalculatorActions.calculationSuccess({ result })),
          catchError(error => of(CalculatorActions.calculationFailure({ 
            error: error.message || 'Hesaplama hatası' 
          })))
        );
      })
    )
  );

  // Square root effect
  performSquareRoot$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CalculatorActions.performSquareRoot),
      exhaustMap(({ value }) =>
        this.calculatorApi.squareRoot(value).pipe(
          map(result => CalculatorActions.calculationSuccess({ result })),
          catchError(error => of(CalculatorActions.calculationFailure({ 
            error: error.message || 'Karekök hesaplama hatası' 
          })))
        )
      )
    )
  );

  // Load history effect
  loadHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CalculatorActions.loadHistory),
      exhaustMap(() =>
        this.calculatorApi.getHistory().pipe(
          map(history => CalculatorActions.loadHistorySuccess({ history })),
          catchError(error => of(CalculatorActions.loadHistoryFailure({ 
            error: error.message || 'History yükleme hatası' 
          })))
        )
      )
    )
  );

  // Clear history effect
  clearHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CalculatorActions.clearHistory),
      exhaustMap(() =>
        this.calculatorApi.clearHistory().pipe(
          map(() => CalculatorActions.clearHistorySuccess()),
          catchError(error => of(CalculatorActions.clearHistoryFailure({ 
            error: error.message || 'History temizleme hatası' 
          })))
        )
      )
    )
  );

  // After calculation success, reload history
  reloadHistoryAfterCalculation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CalculatorActions.calculationSuccess),
      map(() => CalculatorActions.loadHistory())
    )
  );

  // After clear history success, reload history
  reloadHistoryAfterClear$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CalculatorActions.clearHistorySuccess),
      map(() => CalculatorActions.loadHistory())
    )
  );
} 