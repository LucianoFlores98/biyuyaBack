# Calculadora de Salario Neto

Servicio para calcular el salario neto aplicando los descuentos legales correspondientes.

## 📊 Descuentos Aplicados

| Concepto | Porcentaje | Descripción |
|----------|-----------|-------------|
| **Jubilación** | 11% | Aportes al sistema jubilatorio |
| **Obra Social** | 3% | Aportes para cobertura médica |
| **PAMI** | 3% | Ley 19032 - Programa de Atención Médica Integral |
| **TOTAL** | 17% | Descuento total sobre salario bruto |

## 🚀 Uso

### Importar el servicio

```typescript
import { SalaryCalculatorService } from '../helpers/SalaryCalculator';

const salaryCalculator = new SalaryCalculatorService();
```

### Calcular salario neto

```typescript
// Ejemplo: Salario bruto de $100,000
const result = salaryCalculator.calculateNetSalary(100000);

console.log(result);
/*
{
  salarioBruto: 100000,
  descuentos: {
    jubilacion: 11000,      // 11%
    obraSocial: 3000,       // 3%
    pami: 3000,             // 3%
    total: 17000            // 17%
  },
  salarioNeto: 83000,
  porcentajeDescuento: 17
}
*/
```

### Calcular con descuentos personalizados

```typescript
// Si los porcentajes cambian, puedes personalizarlos
const result = salaryCalculator.calculateNetSalary(100000, {
  jubilacion: 12,    // 12% en lugar de 11%
  obraSocial: 3.5,   // 3.5% en lugar de 3%
  pami: 3            // 3% (sin cambios)
});
```

### Calcular salario bruto necesario

```typescript
// ¿Cuánto necesito ganar bruto para tener $80,000 neto?
const salarioBruto = salaryCalculator.calculateGrossSalary(80000);

console.log(salarioBruto); // 96385.54
```

## 💡 Ejemplo de Integración en Revenue

Puedes usar este servicio en el módulo de Revenue para calcular automáticamente el salario neto:

```typescript
import { SalaryCalculatorService } from '../../../../helpers/SalaryCalculator';

const salaryCalculator = new SalaryCalculatorService();

// Al crear o actualizar un revenue de tipo SALARY
const salarioBruto = 100000;
const calculation = salaryCalculator.calculateNetSalary(salarioBruto);

// Guardar tanto el bruto como el neto
const revenue = {
  name: "Sueldo Mensual",
  type: "SALARY",
  amount: calculation.salarioBruto,
  net_amount: calculation.salarioNeto,  // Nuevo campo sugerido
  period: "2024-12",
  increase_frequency: 3,
  user_id: 1
};
```

## 📝 Fórmulas

### Salario Neto
```
Salario Neto = Salario Bruto - (Jubilación + Obra Social + PAMI)
Salario Neto = Salario Bruto × (1 - 0.17)
Salario Neto = Salario Bruto × 0.83
```

### Salario Bruto
```
Salario Bruto = Salario Neto / 0.83
```

## 🔧 Métodos Disponibles

### `calculateNetSalary(salarioBruto, customDeductions?)`
Calcula el salario neto a partir del bruto.

**Parámetros:**
- `salarioBruto` (number): Salario bruto mensual
- `customDeductions` (opcional): Descuentos personalizados

**Retorna:** `NetSalaryCalculation` con el detalle completo

### `calculateGrossSalary(salarioNetoDeseado, customDeductions?)`
Calcula el salario bruto necesario para obtener un neto deseado.

**Parámetros:**
- `salarioNetoDeseado` (number): Salario neto que se desea obtener
- `customDeductions` (opcional): Descuentos personalizados

**Retorna:** Salario bruto necesario (number)

### `getDefaultDeductions()`
Obtiene los porcentajes de descuento por defecto.

**Retorna:** `SalaryDeductions` con los porcentajes configurados

## ⚠️ Validaciones

- El salario bruto debe ser mayor a 0
- El salario neto deseado debe ser mayor a 0
- Los porcentajes se redondean a 2 decimales
- Los montos se redondean a 2 decimales

## 📊 Ejemplo Completo

```typescript
const salaryCalculator = new SalaryCalculatorService();

// Caso 1: Calcular neto desde bruto
const caso1 = salaryCalculator.calculateNetSalary(150000);
console.log(`Salario Bruto: $${caso1.salarioBruto}`);
console.log(`Descuentos: $${caso1.descuentos.total}`);
console.log(`Salario Neto: $${caso1.salarioNeto}`);

// Caso 2: Calcular bruto desde neto deseado
const netoDeseado = 100000;
const brutoNecesario = salaryCalculator.calculateGrossSalary(netoDeseado);
console.log(`Para tener $${netoDeseado} neto, necesitas $${brutoNecesario} bruto`);

// Caso 3: Verificar descuentos por defecto
const descuentos = salaryCalculator.getDefaultDeductions();
console.log('Descuentos configurados:', descuentos);
```
