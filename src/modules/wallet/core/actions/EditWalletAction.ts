import IWallet from "../entities/IWallet";
import { WalletNotExistException } from "../exceptions/WalletNotExistException";
import { InvalidFieldException } from "../exceptions/InvalidFieldException";
import { IWalletRepository } from "../repository/IWalletRepository";

export interface IEditWalletAction {
  execute: (body: Partial<IWallet>, id: string) => Promise<unknown>;
}

export const EditWalletAction = (
  WalletRepository: IWalletRepository
): IEditWalletAction => {
  const allowedFields = ['balance', 'prev_balance', 'user_id'];

  return {
    execute(body, id) {
      return new Promise(async (resolve, reject) => {
        try {
          const wallet = await WalletRepository.getById(id);
          if (!wallet) throw new WalletNotExistException();

          const bodyKeys = Object.keys(body);
          const invalidFields = bodyKeys.filter(key => !allowedFields.includes(key));

          if (invalidFields.length > 0) {
            throw new InvalidFieldException(invalidFields);
          }

          if (bodyKeys.length === 0) {
            resolve(wallet);
            return;
          }

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
