import IAccount from "../entities/IAccount";
import { IAccountRepository } from "../repository/IAccountRepository";

export interface ISaveAccountAction {
  execute: (body: IAccount) => Promise<any>;
}

export const SaveAccountAction = (
  AccountRepository: IAccountRepository
): ISaveAccountAction => {
  return {
    execute: (body) => {
      return new Promise(async (resolve, reject) => {
        try {
          const result = await AccountRepository.save(body);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
