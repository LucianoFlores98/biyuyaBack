import { IWalletRepository } from "../repository/IWalletRepository";

export interface IGetWalletByIdAction {
  execute: (id: string) => Promise<any>;
}

export const GetWalletByIdAction = (
  WalletRepository: IWalletRepository
): IGetWalletByIdAction => {
  return {
    execute(id) {
      return new Promise(async (resolve, reject) => {
        try {
          const wallet = await WalletRepository.getById(id);
          resolve(wallet);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
