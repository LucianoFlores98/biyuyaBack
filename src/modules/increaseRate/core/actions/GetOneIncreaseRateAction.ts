import { IIncreaseRateRepository } from "../repository/IIncreaseRateRepository";

export interface IGetOneIncreaseRateAction {
  execute: (query: unknown) => Promise<unknown>;
}

export const GetOneIncreaseRateAction = (
  IncreaseRateRepository: IIncreaseRateRepository
): IGetOneIncreaseRateAction => {
  return {
    execute(query) {
      return new Promise(async (resolve, reject) => {
        try {
          const increaseRate = await IncreaseRateRepository.getOne(query);
          resolve(increaseRate);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
