import { createAction, props } from '@ngrx/store';
import { CalculationResponse, HistoryItem } from '../models/calculation.model';

// Calculator input actions
export const addDigit = createAction(
  '[Calculator] Add Digit',
  props<{ digit: string }>()
);

export const setOperator = createAction(
  '[Calculator] Set Operator',
  props<{ operator: string }>()
);

export const clearCalculator = createAction(
  '[Calculator] Clear'
);

export const backspace = createAction(
  '[Calculator] Backspace'
);

// API calculation actions
export const performCalculation = createAction(
  '[Calculator] Perform Calculation',
  props<{ a: number; b: number; operator: string }>()
);

export const performSquareRoot = createAction(
  '[Calculator] Perform Square Root',
  props<{ value: number }>()
);

export const calculationSuccess = createAction(
  '[Calculator] Calculation Success',
  props<{ result: CalculationResponse }>()
);

export const calculationFailure = createAction(
  '[Calculator] Calculation Failure',
  props<{ error: string }>()
);

// History actions
export const loadHistory = createAction(
  '[History] Load History'
);

export const loadHistorySuccess = createAction(
  '[History] Load History Success',
  props<{ history: HistoryItem[] }>()
);

export const loadHistoryFailure = createAction(
  '[History] Load History Failure',
  props<{ error: string }>()
);

export const clearHistory = createAction(
  '[History] Clear History'
);

export const clearHistorySuccess = createAction(
  '[History] Clear History Success'
);

export const clearHistoryFailure = createAction(
  '[History] Clear History Failure',
  props<{ error: string }>()
); 