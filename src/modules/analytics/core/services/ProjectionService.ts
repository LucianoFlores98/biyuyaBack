import { SalaryCalculatorService } from "../../../../helpers/SalaryCalculator";
import IRevenue from "../../../revenue/core/entities/IRevenue";
import IIncreaseRate from "../../../increaseRate/core/entities/IIncreaseRate";
import { IRevenueRepository } from "../../../revenue/core/repository/IRevenueRepository";
import { IIncreaseRateRepository } from "../../../increaseRate/core/repository/IIncreaseRateRepository";
import {
  MonthlyProjection,
  SalaryProjectionResult,
  IPCCalculationMode,
} from "../entities/ISalaryProjection";

export class ProjectionService {
  private salaryCalculator: SalaryCalculatorService;

  constructor(
    private revenueRepository: IRevenueRepository,
    private increaseRateRepository: IIncreaseRateRepository
  ) {
    this.salaryCalculator = new SalaryCalculatorService();
  }

  /**
   * Proyecta el salario mes a mes aplicando aumentos por IPC
   * @param revenueId - ID del revenue (debe ser tipo SALARY)
   * @param months - Cantidad de meses a proyectar
   * @param mode - Modo de cálculo: 'cumulative' o 'simple'
   */
  async projectSalary(
    revenueId: string,
    months: number = 12,
    mode: IPCCalculationMode = 'cumulative'
  ): Promise<SalaryProjectionResult> {
    const revenue: any = await this.revenueRepository.getById(revenueId);
    if (!revenue) {
      throw new Error('Revenue no encontrado');
    }

    if (revenue.type !== 'SALARY') {
      throw new Error('El revenue debe ser de tipo SALARY');
    }

    // 2. Obtener IPCs disponibles (tipo IPC)
    const allIncreaseRates: any = await this.increaseRateRepository.getAll({});
    const ipcs = allIncreaseRates.filter((ir: any) => ir.type === 'IPC');
    console.log('IPCs disponibles:', ipcs.map((i: any) => ({ period: i.period, rate: i.rate })));

    const proyecciones = this.calculateMonthlyProjections(
      revenue,
      ipcs,
      months,
      mode
    );

    const salarioInicialNeto = this.salaryCalculator.calculateNetSalary(
      revenue.amount
    );

    const ultimaProyeccion = proyecciones[proyecciones.length - 1];
    const incrementoTotalMonto = ultimaProyeccion.salarioBruto - revenue.amount;
    const incrementoTotalPorcentaje =
      (incrementoTotalMonto / revenue.amount) * 100;

    return {
      revenueId: revenue.id,
      revenueName: revenue.name,
      salarioInicial: {
        bruto: revenue.amount,
        neto: salarioInicialNeto.salarioNeto,
      },
      increaseFrequency: revenue.increase_frequency,
      calculationMode: mode,
      proyecciones,
      totalMonths: months,
      resumen: {
        salarioFinalBruto: ultimaProyeccion.salarioBruto,
        salarioFinalNeto: ultimaProyeccion.salarioNeto,
        incrementoTotalPorcentaje: Math.round(incrementoTotalPorcentaje * 100) / 100,
        incrementoTotalMonto: Math.round(incrementoTotalMonto * 100) / 100,
      },
    };
  }

  private calculateMonthlyProjections(
    revenue: IRevenue,
    ipcs: IIncreaseRate[],
    months: number,
    mode: IPCCalculationMode
  ): MonthlyProjection[] {
    const projections: MonthlyProjection[] = [];
    let currentSalary = revenue.amount;
    const baseSalary = revenue.amount; // Para modo simple
    let ipcAcumulado = 0;

    for (let i = 0; i < months; i++) {
      const month = this.addMonths(revenue.period, i);
      let incrementoAplicado = 0;

      // Verificar si corresponde aumento (no en el mes 0)
      // Verificar si corresponde aumento (no en el mes 0)
      if (i > 0 && i % revenue.increase_frequency === 0) {
        // Calcular IPC acumulado del período anterior
        let ipcPeriodo = 0;

        console.log(`Calculando aumento para mes ${month} (índice ${i})`);

        // Recorrer los meses del período anterior (ej: si frecuencia es 3, mirar los 3 meses previos)
        for (let j = 1; j <= revenue.increase_frequency; j++) {
          const prevMonthIndex = i - j;
          const prevMonth = this.addMonths(revenue.period, prevMonthIndex);
          const ipc = this.getIPCForPeriod(ipcs, prevMonth);

          console.log(`  Buscando IPC para ${prevMonth}: ${ipc ? ipc.rate : 'No encontrado'}`);

          if (ipc) {
            // Sumar al acumulado (asegurando que sea número)
            ipcPeriodo += parseFloat(ipc.rate as any);
          }
        }

        console.log(`  IPC Periodo Total: ${ipcPeriodo}`);

        if (ipcPeriodo > 0) {
          incrementoAplicado = ipcPeriodo;
          ipcAcumulado += ipcPeriodo;

          if (mode === 'cumulative') {
            // Modo acumulativo: aplica sobre el salario actual
            currentSalary = currentSalary * (1 + ipcPeriodo / 100);
          } else {
            // Modo simple: aplica sobre el salario base
            currentSalary = baseSalary * (1 + ipcAcumulado / 100);
          }
        }
      }

      // Calcular salario neto
      const netSalary = this.salaryCalculator.calculateNetSalary(currentSalary);

      projections.push({
        month,
        salarioBruto: Math.round(currentSalary * 100) / 100,
        salarioNeto: netSalary.salarioNeto,
        incrementoAplicado: Math.round(incrementoAplicado * 100) / 100,
        ipcAcumulado: Math.round(ipcAcumulado * 100) / 100,
      });
    }

    return projections;
  }

  /**
   * Suma meses a un período en formato YYYY-MM
   */
  private addMonths(period: string, monthsToAdd: number): string {
    const [year, month] = period.split('-').map(Number);
    const date = new Date(year, month - 1, 1);
    date.setMonth(date.getMonth() + monthsToAdd);

    const newYear = date.getFullYear();
    const newMonth = String(date.getMonth() + 1).padStart(2, '0');

    return `${newYear}-${newMonth}`;
  }

  /**
   * Obtiene el IPC para un período específico
   */
  private getIPCForPeriod(
    ipcs: IIncreaseRate[],
    period: string
  ): IIncreaseRate | undefined {
    return ipcs.find((ipc: any) => ipc.period === period);
  }
}
