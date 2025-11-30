import { IWalletRepository } from "../repository/IWalletRepository";

export interface IGetAllWalletsAction {
  execute: (query: unknown) => Promise<unknown>;
}

export const GetAllWalletsAction = (
  WalletRepository: IWalletRepository
): IGetAllWalletsAction => {
  return {
    execute(query) {
      return new Promise(async (resolve, reject) => {
        try {
          const wallets = await WalletRepository.getAll(query);
          resolve(wallets);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
