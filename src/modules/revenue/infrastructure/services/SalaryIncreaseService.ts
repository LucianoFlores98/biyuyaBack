import { addMonths, format, startOfMonth } from "date-fns";
import { ISalaryIncreaseService } from "../../core/services/ISalaryIncreaseService";

export class SalaryIncreaseService implements ISalaryIncreaseService {
  calculateCompoundIncrease(currentSalary: number, ipcRates: number[]): number {
    // Apply compound interest formula: newSalary = currentSalary * (1 + ipc1/100) * (1 + ipc2/100) * ...
    let newSalary = currentSalary;

    for (const rate of ipcRates) {
      newSalary = newSalary * (1 + rate / 100);
    }

    // Round to 2 decimal places
    return Math.round(newSalary * 100) / 100;
  }

  calculateNextIncreaseDate(lastIncreaseDate: Date, frequencyMonths: number): Date {
    // Add the frequency months to the last increase date
    return addMonths(startOfMonth(lastIncreaseDate), frequencyMonths);
  }

  getRequiredIPCPeriods(lastIncreaseDate: Date, frequencyMonths: number): string[] {
    const periods: string[] = [];
    const startDate = startOfMonth(lastIncreaseDate);

    // Generate period strings for each month in the frequency range
    for (let i = 1; i <= frequencyMonths; i++) {
      const periodDate = addMonths(startDate, i);
      periods.push(format(periodDate, "yyyy-MM"));
    }

    return periods;
  }

  isIncreaseDue(lastIncreaseDate: Date, frequencyMonths: number): boolean {
    const nextIncreaseDate = this.calculateNextIncreaseDate(lastIncreaseDate, frequencyMonths);
    const now = new Date();

    return now >= nextIncreaseDate;
  }
}
