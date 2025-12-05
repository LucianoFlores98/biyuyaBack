import IRevenue from "../entities/IRevenue";
import { IRevenueRepository } from "../repository/IRevenueRepository";
import { ISalaryIncreaseService } from "../services/ISalaryIncreaseService";

export interface IGetPendingIncreasesAction {
  execute: (userId: string) => Promise<IRevenue[]>;
}

export const GetPendingIncreasesAction = (
  revenueRepository: IRevenueRepository,
  salaryIncreaseService: ISalaryIncreaseService
): IGetPendingIncreasesAction => {
  return {
    execute: (userId: string) => {
      return new Promise(async (resolve, reject) => {
        try {
          // Get all salaries for the user
          const salaries = await revenueRepository.findSalariesByUserId(userId);

          // Filter salaries that are due for increase
          const pendingIncreases = salaries.filter((salary) => {
            const frequencyMonths = Number(salary.increase_rate);

            // Skip if frequency is not set or invalid
            if (!frequencyMonths || frequencyMonths <= 0) {
              return false;
            }

            // Check if increase is due
            return salaryIncreaseService.isIncreaseDue(
              new Date(salary.date),
              frequencyMonths
            );
          });

          resolve(pendingIncreases);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
