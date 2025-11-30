import IWallet from "../entities/IWallet";
import { WalletNotExistException } from "../exceptions/WalletNotExistException";
import { IWalletRepository } from "../repository/IWalletRepository";

export interface IEditWalletAction {
  execute: (body: IWallet, id: string) => Promise<unknown>;
}

export const EditWalletAction = (
  WalletRepository: IWalletRepository
): IEditWalletAction => {
  return {
    execute(body, id) {
      return new Promise(async (resolve, reject) => {
        try {
          const wallet = await WalletRepository.getById(id);
          if (!wallet) throw new WalletNotExistException();
          await WalletRepository.edit(body, id);
          const result = await WalletRepository.getById(id);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
