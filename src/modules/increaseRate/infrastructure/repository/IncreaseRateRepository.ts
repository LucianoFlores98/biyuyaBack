import { IIncreaseRateRepository } from "../../core/repository/IIncreaseRateRepository";
import IncreaseRateModel from "../models/IncreaseRateModel";

export const IncreaseRateRepository = (): IIncreaseRateRepository => ({
  async save(increaseRate) {
    const increaseRateCreated = await IncreaseRateModel.create({
      ...increaseRate,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return increaseRateCreated;
  },
  async edit(increaseRate, id) {
    return await IncreaseRateModel.update(
      { ...increaseRate },
      {
        where: {
          id: id,
        },
      }
    );
  },
  async remove(id) {
    return await IncreaseRateModel.destroy({
      where: {
        id: id,
      },
    });
  },
  async getAll(query) {
    return await IncreaseRateModel.findAll();
  },
  async getById(id) {
    return await IncreaseRateModel.findOne({
      where: {
        id: id,
      },
    });
  },
  async getOne(query) {
    const increaseRateFounded = await IncreaseRateModel.findOne({
      where: {
        ...(query as any),
      },
    });
    return increaseRateFounded?.dataValues;
  },
});

