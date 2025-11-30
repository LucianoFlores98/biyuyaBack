import IAccount from "../entities/IAccount";
import { AccountNotExistException } from "../exceptions/AccountNotExistException";
import { IAccountRepository } from "../repository/IAccountRepository";

export interface IEditAccountAction {
  execute: (body: IAccount, id: string) => Promise<unknown>;
}

export const EditAccountAction = (
  AccountRepository: IAccountRepository
): IEditAccountAction => {
  return {
    execute(body, id) {
      return new Promise(async (resolve, reject) => {
        try {
          const account = await AccountRepository.getById(id);
          if (!account) throw new AccountNotExistException();
          await AccountRepository.edit(body, id);
          const result = await AccountRepository.getById(id);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
