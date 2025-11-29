import { IRevenueRepository } from "../repository/IRevenueRepository";

export interface IGetOneRevenueAction {
  execute: (query: any) => Promise<any>;
}

export const GetOneRevenueAction = (
  RevenueRepository: IRevenueRepository
): IGetOneRevenueAction => {
  return {
    execute(query) {
      return new Promise(async (resolve, reject) => {
        try {
          const revenue = await RevenueRepository.getOne(query);
          resolve(revenue);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
