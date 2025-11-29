import { IWalletRepository } from "../../core/repository/IWalletRepository";
import WalletModel from "../models/WalletModel";

export const WalletRepository = (): IWalletRepository => ({
  async save(wallet) {
    const walletCreated = await WalletModel.create({
      ...wallet,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return walletCreated;
  },
  async edit(wallet, id) {
    return await WalletModel.update(
      { ...wallet },
      {
        where: {
          id: id,
        },
      }
    );
  },
  async remove(id) {
    return await WalletModel.destroy({
      where: {
        id: id,
      },
    });
  },
  async getAll(query) {
    return await WalletModel.findAll();
  },
  async getById(id) {
    return await WalletModel.findOne({
      where: {
        id: id,
      },
    });
  },
  async getOne(query) {
    const walletFounded = await WalletModel.findOne({
      where: {
        ...query,
      },
    });
    return walletFounded?.dataValues;
  },
});
