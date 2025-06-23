import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState, CalculatorState, HistoryState } from './calculator.state';
import { HistoryEntry, OperationType, OperationSymbols } from '../models/calculation.model';

// Feature selectors
export const selectCalculatorState = createFeatureSelector<CalculatorState>('calculator');
export const selectHistoryState = createFeatureSelector<HistoryState>('history');

// Calculator selectors
export const selectCurrentInput = createSelector(
  selectCalculatorState,
  (state: CalculatorState) => state.currentInput || '0'
);

export const selectPreviousInput = createSelector(
  selectCalculatorState,
  (state: CalculatorState) => state.previousInput
);

export const selectOperator = createSelector(
  selectCalculatorState,
  (state: CalculatorState) => state.operator
);

export const selectResult = createSelector(
  selectCalculatorState,
  (state: CalculatorState) => state.result
);

export const selectCalculatorLoading = createSelector(
  selectCalculatorState,
  (state: CalculatorState) => state.loading
);

export const selectCalculatorError = createSelector(
  selectCalculatorState,
  (state: CalculatorState) => state.error
);

// History selectors
export const selectHistoryItems = createSelector(
  selectHistoryState,
  (state: HistoryState) => state.items
);

export const selectHistoryLoading = createSelector(
  selectHistoryState,
  (state: HistoryState) => state.loading
);

export const selectHistoryError = createSelector(
  selectHistoryState,
  (state: HistoryState) => state.error
);

// Computed selectors
export const selectFormattedHistory = createSelector(
  selectHistoryItems,
  (items) => {
    return items.map(item => {
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
      } as HistoryEntry;
    });
  }
);

export const selectDisplayValue = createSelector(
  selectCurrentInput,
  selectPreviousInput,
  selectOperator,
  (current, previous, operator) => {
    if (current) return current;
    if (previous && operator) return previous;
    return '0';
  }
); 