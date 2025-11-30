import IGasto from "../entities/IGasto";
import { IGastoRepository } from "../repository/IGastoRepository";

export interface ISaveGastoAction {
  execute: (body: IGasto) => Promise<unknown>;
}

export const SaveGastoAction = (
  GastoRepository: IGastoRepository
): ISaveGastoAction => {
  return {
    execute: (body) => {
      return new Promise(async (resolve, reject) => {
        try {
          const result = await GastoRepository.save(body);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
