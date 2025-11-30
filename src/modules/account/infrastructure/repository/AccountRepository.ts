import { IAccountRepository } from "../../core/repository/IAccountRepository";
import IAccount from "../../core/entities/IAccount";
import AccountModel from "../models/AccountModel";

export const AccountRepository = (): IAccountRepository => ({
  async save(account) {
    const accountCreated = await AccountModel.create({
      ...account,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return accountCreated.dataValues as IAccount;
  },
  async edit(account, id) {
    await AccountModel.update(
      { ...account },
      {
        where: {
          id: id,
        },
      }
    );
    const updatedAccount = await AccountModel.findOne({
      where: { id },
    });
    return updatedAccount?.dataValues as IAccount;
  },
  async remove(id) {
    const accountToDelete = await AccountModel.findOne({
      where: { id },
    });
    await AccountModel.destroy({
      where: {
        id: id,
      },
    });
    return accountToDelete?.dataValues as IAccount;
  },
  async getAll(query) {
    const accounts = await AccountModel.findAll();
    return accounts.map(a => a.dataValues as IAccount);
  },
  async getById(id) {
    const account = await AccountModel.findOne({
      where: {
        id: id,
      },
    });
    return account ? (account.dataValues as IAccount) : null;
  },
  async getOne(query) {
    const accountFounded = await AccountModel.findOne({
      where: {
        ...(query as any),
      },
    });
    return accountFounded ? (accountFounded.dataValues as IAccount) : null;
  },
});
