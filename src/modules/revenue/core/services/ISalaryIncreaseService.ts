export interface ISalaryIncreaseService {
  /**
   * Calculate compound increase based on multiple IPC rates
   * @param currentSalary - Current salary amount
   * @param ipcRates - Array of IPC percentage rates (e.g., [2.5, 1.8, 1.9])
   * @returns New salary after applying compound increases
   */
  calculateCompoundIncrease(currentSalary: number, ipcRates: number[]): number;

  /**
   * Calculate the next increase date based on frequency
   * @param lastIncreaseDate - Date of last salary increase
   * @param frequencyMonths - Frequency in months (1, 3, 6, 12)
   * @returns Next increase date
   */
  calculateNextIncreaseDate(lastIncreaseDate: Date, frequencyMonths: number): Date;

  /**
   * Get required IPC periods for calculation
   * @param lastIncreaseDate - Date of last salary increase
   * @param frequencyMonths - Frequency in months
   * @returns Array of period strings in format "YYYY-MM"
   */
  getRequiredIPCPeriods(lastIncreaseDate: Date, frequencyMonths: number): string[];

  /**
   * Check if a salary is due for increase
   * @param lastIncreaseDate - Date of last salary increase
   * @param frequencyMonths - Frequency in months
   * @returns True if increase is due
   */
  isIncreaseDue(lastIncreaseDate: Date, frequencyMonths: number): boolean;
}
