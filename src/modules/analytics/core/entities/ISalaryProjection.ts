export interface MonthlyProjection {
  month: string;              // Formato: "YYYY-MM"
  salarioBruto: number;
  salarioNeto: number;
  incrementoAplicado: number; // % de IPC aplicado en este mes
  ipcAcumulado: number;       // IPC acumulado total
}

export interface SalaryProjectionResult {
  revenueId: number;
  revenueName: string;
  salarioInicial: {
    bruto: number;
    neto: number;
  };
  increaseFrequency: number;  // Frecuencia en meses
  calculationMode: 'cumulative' | 'simple';
  proyecciones: MonthlyProjection[];
  totalMonths: number;
  resumen: {
    salarioFinalBruto: number;
    salarioFinalNeto: number;
    incrementoTotalPorcentaje: number;
    incrementoTotalMonto: number;
  };
}

export type IPCCalculationMode = 'cumulative' | 'simple';
