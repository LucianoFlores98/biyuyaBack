import { IIncreaseRateRepository } from "../../core/repository/IIncreaseRateRepository";
import IncreaseRateModel from "../models/IncreaseRateModel";
import { Op } from "sequelize";
import IIncreaseRate from "../../core/entities/IIncreaseRate";

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
  async findByPeriods(periods: string[]) {
    const rates = await IncreaseRateModel.findAll({
      where: {
        frequency: {
          [Op.in]: periods,
        },
      },
      order: [["date", "ASC"]],
    });
    return rates.map((r) => r.dataValues as IIncreaseRate);
  },
  async findByPeriod(period: string) {
    const rate = await IncreaseRateModel.findOne({
      where: {
        frequency: period,
      },
    });
    return rate ? (rate.dataValues as IIncreaseRate) : null;
  },
});

