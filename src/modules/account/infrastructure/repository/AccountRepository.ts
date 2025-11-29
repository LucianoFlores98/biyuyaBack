import { IAccountRepository } from "../../core/repository/IAccountRepository";
import AccountModel from "../models/AccountModel";

export const AccountRepository = (): IAccountRepository => ({
  async save(account) {
    const accountCreated = await AccountModel.create({
      ...account,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return accountCreated;
  },
  async edit(account, id) {
    return await AccountModel.update(
      { ...account },
      {
        where: {
          id: id,
        },
      }
    );
  },
  async remove(id) {
    return await AccountModel.destroy({
      where: {
        id: id,
      },
    });
  },
  async getAll(query) {
    return await AccountModel.findAll();
  },
  async getById(id) {
    return await AccountModel.findOne({
      where: {
        id: id,
      },
    });
  },
  async getOne(query) {
    const accountFounded = await AccountModel.findOne({
      where: {
        ...query,
      },
    });
    return accountFounded?.dataValues;
  },
});
