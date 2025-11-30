import { IUserRepository } from "../../core/repository/IUserRepository";
import IUser from "../../core/entities/IUser";
import UserModel from "../models/UserModel";

export const UserRepository = (): IUserRepository => ({
  async save(user) {
    const userCreated = await UserModel.create({
      ...user,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: true,
    });
    return userCreated.dataValues as IUser;
  },
  async edit(user, id) {
    await UserModel.update(
      { ...user },
      {
        where: {
          id: id,
        },
      }
    );
    const updatedUser = await UserModel.findOne({
      where: { id },
    });
    return updatedUser?.dataValues as IUser;
  },
  async remove(id) {
    const userToDelete = await UserModel.findOne({
      where: { id },
    });
    await UserModel.destroy({
      where: {
        id: id,
      },
    });
    return userToDelete?.dataValues as IUser;
  },
  async getAll(query) {
    const users = await UserModel.findAll();
    return users.map(u => u.dataValues as IUser);
  },
  async getById(id) {
    const user = await UserModel.findOne({
      where: {
        id: id,
      },
    });
    return user ? (user.dataValues as IUser) : null;
  },
  async getOne(query) {
    const userFounded = await UserModel.findOne({
      where: {
        ...(query as any),
      },
    });
    return userFounded ? (userFounded.dataValues as IUser) : null;
  },
});