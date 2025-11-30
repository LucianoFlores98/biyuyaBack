import { IGastoRepository } from "../repository/IGastoRepository";

export interface IGetOneGastoAction {
  execute: (query: unknown) => Promise<unknown>;
}

export const GetOneGastoAction = (
  GastoRepository: IGastoRepository
): IGetOneGastoAction => {
  return {
    execute(query) {
      return new Promise(async (resolve, reject) => {
        try {
          const gasto = await GastoRepository.getOne(query);
          resolve(gasto);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
