import { createReducer, on } from '@ngrx/store';
import { HistoryState, initialHistoryState } from './calculator.state';
import * as CalculatorActions from './calculator.actions';

export const historyReducer = createReducer(
  initialHistoryState,

  // Load history
  on(CalculatorActions.loadHistory, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(CalculatorActions.loadHistorySuccess, (state, { history }) => ({
    ...state,
    items: history,
    loading: false,
    error: null
  })),

  on(CalculatorActions.loadHistoryFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  })),

  // Clear history
  on(CalculatorActions.clearHistory, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(CalculatorActions.clearHistorySuccess, (state) => ({
    ...state,
    items: [],
    loading: false,
    error: null
  })),

  on(CalculatorActions.clearHistoryFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  })),

  // Calculation success - history güncellenecek
  on(CalculatorActions.calculationSuccess, (state) => ({
    ...state,
    // History API'den yeniden yüklenecek
  }))
); 