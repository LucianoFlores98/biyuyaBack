import { IRevenueRepository } from "../../core/repository/IRevenueRepository";
import RevenueModel from "../models/RevenueModel";

export const RevenueRepository = (): IRevenueRepository => ({
  async save(revenue) {
    const revenueCreated = await RevenueModel.create({
      ...revenue,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return revenueCreated;
  },
  async edit(revenue, id) {
    return await RevenueModel.update(
      { ...revenue },
      {
        where: {
          id: id,
        },
      }
    );
  },
  async remove(id) {
    return await RevenueModel.destroy({
      where: {
        id: id,
      },
    });
  },
  async getAll(query) {
    return await RevenueModel.findAll();
  },
  async getById(id) {
    return await RevenueModel.findOne({
      where: {
        id: id,
      },
    });
  },
  async getOne(query) {
    const revenueFounded = await RevenueModel.findOne({
      where: {
        ...(query as any),
      },
    });
    return revenueFounded?.dataValues;
  },
});
