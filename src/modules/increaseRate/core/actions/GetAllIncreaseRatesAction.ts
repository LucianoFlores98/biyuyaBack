import { IIncreaseRateRepository } from "../repository/IIncreaseRateRepository";

export interface IGetAllIncreaseRatesAction {
  execute: (query: unknown) => Promise<unknown>;
}

export const GetAllIncreaseRatesAction = (
  IncreaseRateRepository: IIncreaseRateRepository
): IGetAllIncreaseRatesAction => {
  return {
    execute(query) {
      return new Promise(async (resolve, reject) => {
        try {
          const increaseRates = await IncreaseRateRepository.getAll(query);
          resolve(increaseRates);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
