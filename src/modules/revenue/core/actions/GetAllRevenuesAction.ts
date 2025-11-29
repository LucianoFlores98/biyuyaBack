import { IRevenueRepository } from "../repository/IRevenueRepository";

export interface IGetAllRevenuesAction {
  execute: (query: any) => Promise<any>;
}

export const GetAllRevenuesAction = (
  RevenueRepository: IRevenueRepository
): IGetAllRevenuesAction => {
  return {
    execute(query) {
      return new Promise(async (resolve, reject) => {
        try {
          const revenues = await RevenueRepository.getAll(query);
          resolve(revenues);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
