import { HistoryItem } from '../models/calculation.model';

export interface CalculatorState {
  currentInput: string;
  previousInput: string;
  operator: string;
  result: number | null;
  loading: boolean;
  error: string | null;
}

export interface HistoryState {
  items: HistoryItem[];
  loading: boolean;
  error: string | null;
}

export interface AppState {
  calculator: CalculatorState;
  history: HistoryState;
}

export const initialCalculatorState: CalculatorState = {
  currentInput: '',
  previousInput: '',
  operator: '',
  result: null,
  loading: false,
  error: null
};

export const initialHistoryState: HistoryState = {
  items: [],
  loading: false,
  error: null
}; 