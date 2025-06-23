import { createReducer, on } from '@ngrx/store';
import { CalculatorState, initialCalculatorState } from './calculator.state';
import * as CalculatorActions from './calculator.actions';

export const calculatorReducer = createReducer(
  initialCalculatorState,
  
  // Input actions
  on(CalculatorActions.addDigit, (state, { digit }) => {
    if (digit === '.' && state.currentInput.includes('.')) {
      return state; // Zaten nokta var, ekleme
    }
    return {
      ...state,
      currentInput: state.currentInput + digit,
      error: null
    };
  }),

  on(CalculatorActions.setOperator, (state, { operator }) => {
    if (state.currentInput === '') return state;
    
    return {
      ...state,
      previousInput: state.currentInput,
      currentInput: '',
      operator: operator,
      error: null
    };
  }),

  on(CalculatorActions.clearCalculator, (state) => ({
    ...state,
    currentInput: '',
    previousInput: '',
    operator: '',
    result: null,
    error: null
  })),

  on(CalculatorActions.backspace, (state) => ({
    ...state,
    currentInput: state.currentInput.length > 0 
      ? state.currentInput.slice(0, -1) 
      : state.currentInput,
    error: null
  })),

  // API calculation actions
  on(CalculatorActions.performCalculation, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(CalculatorActions.performSquareRoot, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(CalculatorActions.calculationSuccess, (state, { result }) => ({
    ...state,
    currentInput: result.result.toString(),
    previousInput: '',
    operator: '',
    result: result.result,
    loading: false,
    error: null
  })),

  on(CalculatorActions.calculationFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  }))
); 