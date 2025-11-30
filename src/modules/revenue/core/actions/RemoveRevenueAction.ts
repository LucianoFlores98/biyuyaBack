import { IRevenueRepository } from "../repository/IRevenueRepository";
import { RevenueNotExistException } from "../exceptions/RevenueNotExistException";

export interface IRemoveRevenueAction {
  execute: (id: string) => Promise<unknown>;
}

export const RemoveRevenueAction = (
  RevenueRepository: IRevenueRepository
): IRemoveRevenueAction => {
  return {
    execute(id) {
      return new Promise(async (resolve, reject) => {
        try {
          const revenue = await RevenueRepository.getById(id);
          if (!revenue) throw new RevenueNotExistException();
          await RevenueRepository.remove(id);
          resolve(revenue);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
