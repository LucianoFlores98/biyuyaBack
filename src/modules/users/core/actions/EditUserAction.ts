import IUser from "../entities/IUser";
import { UserNotExistException } from "../exceptions/UserNotExistException";
import { InvalidFieldException } from "../exceptions/InvalidFieldException";
import { IUserRepository } from "../repository/IUserRepository";

export interface IEditUserAction {
  execute: (body: Partial<IUser>, id: string) => Promise<unknown>;
}

export const EditUserAction = (
  UserRepository: IUserRepository
): IEditUserAction => {
  const allowedFields = ['name', 'email', 'password', 'role', 'status'];

  return {
    execute(body, id) {
      return new Promise(async (resolve, reject) => {
        try {
          const user = await UserRepository.getById(id);
          if (!user) throw new UserNotExistException();

          const bodyKeys = Object.keys(body);
          const invalidFields = bodyKeys.filter(key => !allowedFields.includes(key));

          if (invalidFields.length > 0) {
            throw new InvalidFieldException(invalidFields);
          }

          if (bodyKeys.length === 0) {
            resolve(user);
            return;
          }

          await UserRepository.edit(body, id);
          const result = await UserRepository.getById(id);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    },
  };
};
