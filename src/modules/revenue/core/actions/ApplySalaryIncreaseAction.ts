import IRevenue from "../entities/IRevenue";
import { IRevenueRepository } from "../repository/IRevenueRepository";

export interface IApplySalaryIncreaseAction {
  execute: (revenueId: string, newSalary: number) => Promise<IRevenue>;
}

export const ApplySalaryIncreaseAction = (
  revenueRepository: IRevenueRepository
): IApplySalaryIncreaseAction => {
  return {
    execute: (revenueId: string, newSalary: number) => {
      return new Promise(async (resolve, reject) => {
        try {
          // Get the revenue to verify it exists
          const revenue = (await revenueRepository.getById(revenueId)) as IRevenue;

          if (!revenue) {
            reject(new Error("Revenue not found"));
            return;
          }

          if (revenue.type !== "SALARY") {
            reject(new Error("Revenue is not a salary type"));
            return;
          }

          // Update the salary amount and date
          const updatedRevenue = await revenueRepository.updateSalaryAmount(
            revenueId,
            newSalary,
            new Date()
          );

          resolve(updatedRevenue);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
