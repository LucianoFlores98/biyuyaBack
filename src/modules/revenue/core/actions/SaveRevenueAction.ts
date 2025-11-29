import IRevenue from "../entities/IRevenue";
import { IRevenueRepository } from "../repository/IRevenueRepository";

export interface ISaveRevenueAction {
  execute: (body: IRevenue) => Promise<any>;
}

export const SaveRevenueAction = (
  RevenueRepository: IRevenueRepository
): ISaveRevenueAction => {
  return {
    execute: (body) => {
      return new Promise(async (resolve, reject) => {
        try {
          const result = await RevenueRepository.save(body);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
