import { IWalletRepository } from "../repository/IWalletRepository";
import { WalletNotExistException } from "../exceptions/WalletNotExistException";

export interface IRemoveWalletAction {
  execute: (id: string) => Promise<unknown>;
}

export const RemoveWalletAction = (
  WalletRepository: IWalletRepository
): IRemoveWalletAction => {
  return {
    execute(id) {
      return new Promise(async (resolve, reject) => {
        try {
          const wallet = await WalletRepository.getById(id);
          if (!wallet) throw new WalletNotExistException();
          await WalletRepository.remove(id);
          resolve(wallet);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
