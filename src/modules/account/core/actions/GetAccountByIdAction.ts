import { IAccountRepository } from "../repository/IAccountRepository";

export interface IGetAccountByIdAction {
  execute: (id: string) => Promise<any>;
}

export const GetAccountByIdAction = (
  AccountRepository: IAccountRepository
): IGetAccountByIdAction => {
  return {
    execute(id) {
      return new Promise(async (resolve, reject) => {
        try {
          const account = await AccountRepository.getById(id);
          resolve(account);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
