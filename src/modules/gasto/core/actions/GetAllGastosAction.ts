import { IGastoRepository } from "../repository/IGastoRepository";

export interface IGetAllGastosAction {
  execute: (query: unknown) => Promise<unknown>;
}

export const GetAllGastosAction = (
  GastoRepository: IGastoRepository
): IGetAllGastosAction => {
  return {
    execute(query) {
      return new Promise(async (resolve, reject) => {
        try {
          const gastos = await GastoRepository.getAll(query);
          resolve(gastos);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
