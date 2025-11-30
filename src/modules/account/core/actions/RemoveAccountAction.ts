import { IAccountRepository } from "../repository/IAccountRepository";
import { AccountNotExistException } from "../exceptions/AccountNotExistException";

export interface IRemoveAccountAction {
  execute: (id: string) => Promise<unknown>;
}

export const RemoveAccountAction = (
  AccountRepository: IAccountRepository
): IRemoveAccountAction => {
  return {
    execute(id) {
      return new Promise(async (resolve, reject) => {
        try {
          const account = await AccountRepository.getById(id);
          if (!account) throw new AccountNotExistException();
          await AccountRepository.remove(id);
          resolve(account);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
