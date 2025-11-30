import { IIncreaseRateRepository } from "../repository/IIncreaseRateRepository";

export interface IGetIncreaseRateByIdAction {
  execute: (id: string) => Promise<unknown>;
}

export const GetIncreaseRateByIdAction = (
  IncreaseRateRepository: IIncreaseRateRepository
): IGetIncreaseRateByIdAction => {
  return {
    execute(id) {
      return new Promise(async (resolve, reject) => {
        try {
          const increaseRate = await IncreaseRateRepository.getById(id);
          resolve(increaseRate);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
