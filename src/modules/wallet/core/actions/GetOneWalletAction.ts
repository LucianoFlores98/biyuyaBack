import { IWalletRepository } from "../repository/IWalletRepository";

export interface IGetOneWalletAction {
  execute: (query: any) => Promise<any>;
}

export const GetOneWalletAction = (
  WalletRepository: IWalletRepository
): IGetOneWalletAction => {
  return {
    execute(query) {
      return new Promise(async (resolve, reject) => {
        try {
          const wallet = await WalletRepository.getOne(query);
          resolve(wallet);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
