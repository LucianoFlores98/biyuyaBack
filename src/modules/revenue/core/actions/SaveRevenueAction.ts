import IRevenue from "../entities/IRevenue";
import { IRevenueRepository } from "../repository/IRevenueRepository";
import { SalaryCalculatorService } from "../../../../helpers/SalaryCalculator";

export interface ISaveRevenueAction {
  execute: (body: IRevenue) => Promise<unknown>;
}

export const SaveRevenueAction = (
  RevenueRepository: IRevenueRepository
): ISaveRevenueAction => {
  const salaryCalculator = new SalaryCalculatorService();

  return {
    execute: (body) => {
      return new Promise(async (resolve, reject) => {
        try {
          // Si es un salario, calcular automáticamente el neto
          if (body.type === 'SALARY' && body.amount) {
            const calculation = salaryCalculator.calculateNetSalary(body.amount);
            body.net_amount = calculation.salarioNeto;
          }

          const result = await RevenueRepository.save(body);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
