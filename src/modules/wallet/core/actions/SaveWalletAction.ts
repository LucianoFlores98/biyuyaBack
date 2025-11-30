import IWallet from "../entities/IWallet";
import { IWalletRepository } from "../repository/IWalletRepository";

export interface ISaveWalletAction {
  execute: (body: IWallet) => Promise<unknown>;
}

export const SaveWalletAction = (
  WalletRepository: IWalletRepository
): ISaveWalletAction => {
  return {
    execute: (body) => {
      return new Promise(async (resolve, reject) => {
        try {
          const result = await WalletRepository.save(body);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
