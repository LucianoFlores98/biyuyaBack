import IAccount from "../entities/IAccount";
import { AccountNotExistException } from "../exceptions/AccountNotExistException";
import { InvalidFieldException } from "../exceptions/InvalidFieldException";
import { IAccountRepository } from "../repository/IAccountRepository";

export interface IEditAccountAction {
  execute: (body: Partial<IAccount>, id: string) => Promise<unknown>;
}

export const EditAccountAction = (
  AccountRepository: IAccountRepository
): IEditAccountAction => {
  const allowedFields = ['name', 'type', 'balance', 'wallet_id'];

  return {
    execute(body, id) {
      return new Promise(async (resolve, reject) => {
        try {
          const account = await AccountRepository.getById(id);
          if (!account) throw new AccountNotExistException();

          const bodyKeys = Object.keys(body);
          const invalidFields = bodyKeys.filter(key => !allowedFields.includes(key));

          if (invalidFields.length > 0) {
            throw new InvalidFieldException(invalidFields);
          }

          if (bodyKeys.length === 0) {
            resolve(account);
            return;
          }

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
