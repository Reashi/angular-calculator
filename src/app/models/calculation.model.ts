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
  parameter1: number;
  parameter2?: number;
  result: number;
  date: number;
}

export interface HistoryEntry {
  expression: string;
  timestamp: string;
}

// Operation türleri için enum
export enum OperationType {
  ADDITION = 'ADDITION',
  SUBTRACTION = 'SUBTRACTION', 
  MULTIPLICATION = 'MULTIPLICATION',
  DIVISION = 'DIVISION',
  POWER = 'POWER',
  SQUARE_ROOT = 'SQUARE_ROOT'
}

// Operator sembolleri için mapping
export const OperationSymbols: Record<OperationType, string> = {
  [OperationType.ADDITION]: '+',
  [OperationType.SUBTRACTION]: '-',
  [OperationType.MULTIPLICATION]: '*',
  [OperationType.DIVISION]: '/',
  [OperationType.POWER]: '^',
  [OperationType.SQUARE_ROOT]: '√'
}; 