/**
 * Configuración de descuentos para cálculo de salario neto
 */
export interface SalaryDeductions {
  jubilacion: number;      // Aportes jubilación (default: 11%)
  obraSocial: number;      // Aportes obra social (default: 3%)
  pami: number;            // Ley 19032 - PAMI (default: 3%)
}

/**
 * Resultado del cálculo de salario neto
 */
export interface NetSalaryCalculation {
  salarioBruto: number;
  descuentos: {
    jubilacion: number;
    obraSocial: number;
    pami: number;
    total: number;
  };
  salarioNeto: number;
  porcentajeDescuento: number;
}

/**
 * Servicio para cálculo de salario neto
 */
export class SalaryCalculatorService {
  private readonly defaultDeductions: SalaryDeductions = {
    jubilacion: 11,    // 11%
    obraSocial: 3,     // 3%
    pami: 3,           // 3% (Ley 19032)
  };

  /**
   * Calcula el salario neto a partir del salario bruto
   * @param salarioBruto - Salario bruto mensual
   * @param customDeductions - Descuentos personalizados (opcional)
   * @returns Objeto con el detalle del cálculo
   */
  calculateNetSalary(
    salarioBruto: number,
    customDeductions?: Partial<SalaryDeductions>
  ): NetSalaryCalculation {
    // Validar que el salario bruto sea positivo
    if (salarioBruto <= 0) {
      throw new Error('El salario bruto debe ser mayor a 0');
    }

    // Usar descuentos personalizados o los por defecto
    const deductions: SalaryDeductions = {
      ...this.defaultDeductions,
      ...customDeductions,
    };

    // Calcular cada descuento
    const descuentoJubilacion = (salarioBruto * deductions.jubilacion) / 100;
    const descuentoObraSocial = (salarioBruto * deductions.obraSocial) / 100;
    const descuentoPami = (salarioBruto * deductions.pami) / 100;
    const descuentoTotal = descuentoJubilacion + descuentoObraSocial + descuentoPami;

    // Calcular salario neto
    const salarioNeto = salarioBruto - descuentoTotal;

    // Calcular porcentaje total de descuento
    const porcentajeDescuento = (descuentoTotal / salarioBruto) * 100;

    return {
      salarioBruto,
      descuentos: {
        jubilacion: Math.round(descuentoJubilacion * 100) / 100,
        obraSocial: Math.round(descuentoObraSocial * 100) / 100,
        pami: Math.round(descuentoPami * 100) / 100,
        total: Math.round(descuentoTotal * 100) / 100,
      },
      salarioNeto: Math.round(salarioNeto * 100) / 100,
      porcentajeDescuento: Math.round(porcentajeDescuento * 100) / 100,
    };
  }

  /**
   * Calcula el salario bruto necesario para obtener un salario neto deseado
   * @param salarioNetoDeseado - Salario neto que se desea obtener
   * @param customDeductions - Descuentos personalizados (opcional)
   * @returns Salario bruto necesario
   */
  calculateGrossSalary(
    salarioNetoDeseado: number,
    customDeductions?: Partial<SalaryDeductions>
  ): number {
    if (salarioNetoDeseado <= 0) {
      throw new Error('El salario neto deseado debe ser mayor a 0');
    }

    const deductions: SalaryDeductions = {
      ...this.defaultDeductions,
      ...customDeductions,
    };

    // Calcular porcentaje total de descuentos
    const porcentajeTotalDescuentos = deductions.jubilacion + deductions.obraSocial + deductions.pami;

    // Calcular salario bruto: salarioNeto = salarioBruto * (1 - porcentajeDescuentos/100)
    // Por lo tanto: salarioBruto = salarioNeto / (1 - porcentajeDescuentos/100)
    const salarioBruto = salarioNetoDeseado / (1 - porcentajeTotalDescuentos / 100);

    return Math.round(salarioBruto * 100) / 100;
  }

  /**
   * Obtiene los porcentajes de descuento por defecto
   */
  getDefaultDeductions(): SalaryDeductions {
    return { ...this.defaultDeductions };
  }
}
