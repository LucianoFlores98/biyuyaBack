import IRevenue from "../entities/IRevenue";
import { RevenueNotExistException } from "../exceptions/RevenueNotExistException";
import { IRevenueRepository } from "../repository/IRevenueRepository";

export interface IEditRevenueAction {
  execute: (body: IRevenue, id: string) => Promise<any>;
}

export const EditRevenueAction = (
  RevenueRepository: IRevenueRepository
): IEditRevenueAction => {
  return {
    execute(body, id) {
      return new Promise(async (resolve, reject) => {
        try {
          const revenue = await RevenueRepository.getById(id);
          if (!revenue) throw new RevenueNotExistException();
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
