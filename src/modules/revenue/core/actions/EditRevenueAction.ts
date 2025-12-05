import IRevenue from "../entities/IRevenue";
import { RevenueNotExistException } from "../exceptions/RevenueNotExistException";
import { InvalidFieldException } from "../exceptions/InvalidFieldException";
import { IRevenueRepository } from "../repository/IRevenueRepository";
import { SalaryCalculatorService } from "../../../../helpers/SalaryCalculator";

export interface IEditRevenueAction {
  execute: (body: Partial<IRevenue>, id: string) => Promise<unknown>;
}

export const EditRevenueAction = (
  RevenueRepository: IRevenueRepository
): IEditRevenueAction => {
  // Campos permitidos para actualización (excluyendo id, createdAt, updatedAt)
  const allowedFields = ['name', 'type', 'amount', 'period', 'increase_frequency', 'user_id'];
  const salaryCalculator = new SalaryCalculatorService();

  return {
    execute(body, id) {
      return new Promise(async (resolve, reject) => {
        try {
          // Validar que el revenue existe
          const revenue = await RevenueRepository.getById(id);
          if (!revenue) throw new RevenueNotExistException();

          // Validar campos
          const bodyKeys = Object.keys(body);
          const invalidFields = bodyKeys.filter(key => !allowedFields.includes(key));

          if (invalidFields.length > 0) {
            throw new InvalidFieldException(invalidFields);
          }

          // Actualizar solo si hay campos válidos
          if (bodyKeys.length === 0) {
            resolve(revenue);
            return;
          }

          // Si es un salario y se está actualizando el amount, recalcular net_amount
          const revenueData: any = revenue;
          if ((revenueData.type === 'SALARY' || body.type === 'SALARY') && body.amount) {
            const calculation = salaryCalculator.calculateNetSalary(body.amount);
            body.net_amount = calculation.salarioNeto;
          }

          await RevenueRepository.edit(body, id);
          const result = await RevenueRepository.getById(id);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
