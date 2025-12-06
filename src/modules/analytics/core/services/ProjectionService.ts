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
    // 1. Obtener el revenue
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

    // 3. Calcular proyecciones
    const proyecciones = this.calculateMonthlyProjections(
      revenue,
      ipcs,
      months,
      mode
    );

    // 4. Calcular salario inicial neto
    const salarioInicialNeto = this.salaryCalculator.calculateNetSalary(
      revenue.amount
    );

    // 5. Calcular resumen
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

  /**
   * Calcula las proyecciones mensuales
   */
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
      if (i > 0 && i % revenue.increase_frequency === 0) {
        const ipc = this.getIPCForPeriod(ipcs, month);

        if (ipc) {
          incrementoAplicado = ipc.rate;
          ipcAcumulado += ipc.rate;

          if (mode === 'cumulative') {
            // Modo acumulativo: aplica sobre el salario actual
            currentSalary = currentSalary * (1 + ipc.rate / 100);
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
