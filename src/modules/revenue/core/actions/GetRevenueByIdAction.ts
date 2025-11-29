import { IRevenueRepository } from "../repository/IRevenueRepository";

export interface IGetRevenueByIdAction {
  execute: (id: string) => Promise<any>;
}

export const GetRevenueByIdAction = (
  RevenueRepository: IRevenueRepository
): IGetRevenueByIdAction => {
  return {
    execute(id) {
      return new Promise(async (resolve, reject) => {
        try {
          const revenue = await RevenueRepository.getById(id);
          resolve(revenue);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
