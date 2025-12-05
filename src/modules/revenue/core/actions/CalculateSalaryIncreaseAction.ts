import IRevenue from "../entities/IRevenue";
import { IRevenueRepository } from "../repository/IRevenueRepository";
import { IIncreaseRateRepository } from "../../../increaseRate/core/repository/IIncreaseRateRepository";
import { ISalaryIncreaseService } from "../services/ISalaryIncreaseService";
import { InsufficientIPCDataException } from "../exceptions/InsufficientIPCDataException";

export interface ICalculateSalaryIncreaseAction {
  execute: (revenueId: string) => Promise<{
    currentSalary: number;
    newSalary: number;
    increasePercentage: number;
    appliedIPCs: Array<{ period: string; rate: number }>;
  }>;
}

export const CalculateSalaryIncreaseAction = (
  revenueRepository: IRevenueRepository,
  increaseRateRepository: IIncreaseRateRepository,
  salaryIncreaseService: ISalaryIncreaseService
): ICalculateSalaryIncreaseAction => {
  return {
    execute: (revenueId: string) => {
      return new Promise(async (resolve, reject) => {
        try {
          // Get the revenue
          const revenue = (await revenueRepository.getById(revenueId)) as IRevenue;

          if (!revenue) {
            reject(new Error("Revenue not found"));
            return;
          }

          if (revenue.type !== "SALARY") {
            reject(new Error("Revenue is not a salary type"));
            return;
          }

          // Get the frequency (stored in increase_rate field as months)
          const frequencyMonths = Number(revenue.increase_rate);

          if (!frequencyMonths || frequencyMonths <= 0) {
            reject(new Error("Invalid increase frequency"));
            return;
          }

          // Get required IPC periods
          const requiredPeriods = salaryIncreaseService.getRequiredIPCPeriods(
            new Date(revenue.date),
            frequencyMonths
          );

          // Fetch IPC data for those periods
          const ipcData = await increaseRateRepository.findByPeriods(requiredPeriods);

          // Check if we have all required IPC data
          if (ipcData.length !== requiredPeriods.length) {
            const missingPeriods = requiredPeriods.filter(
              (period) => !ipcData.find((ipc) => ipc.frequency === period)
            );
            reject(
              new InsufficientIPCDataException(
                `Missing IPC data for periods: ${missingPeriods.join(", ")}`
              )
            );
            return;
          }

          // Extract rates and calculate new salary
          const ipcRates = ipcData.map((ipc) => Number(ipc.rate));
          const currentSalary = Number(revenue.amount);
          const newSalary = salaryIncreaseService.calculateCompoundIncrease(
            currentSalary,
            ipcRates
          );

          // Calculate percentage increase
          const increasePercentage = ((newSalary - currentSalary) / currentSalary) * 100;

          // Format applied IPCs
          const appliedIPCs = ipcData.map((ipc) => ({
            period: ipc.frequency,
            rate: Number(ipc.rate),
          }));

          resolve({
            currentSalary,
            newSalary,
            increasePercentage: Math.round(increasePercentage * 100) / 100,
            appliedIPCs,
          });
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
