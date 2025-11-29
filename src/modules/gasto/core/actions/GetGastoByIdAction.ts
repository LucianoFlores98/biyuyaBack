import { IGastoRepository } from "../repository/IGastoRepository";

export interface IGetGastoByIdAction {
  execute: (id: string) => Promise<any>;
}

export const GetGastoByIdAction = (
  GastoRepository: IGastoRepository
): IGetGastoByIdAction => {
  return {
    execute(id) {
      return new Promise(async (resolve, reject) => {
        try {
          const gasto = await GastoRepository.getById(id);
          resolve(gasto);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
