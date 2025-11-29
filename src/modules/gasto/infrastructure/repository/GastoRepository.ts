import { IGastoRepository } from "../../core/repository/IGastoRepository";
import GastoModel from "../models/GastoModel";

export const GastoRepository = (): IGastoRepository => ({
  async save(gasto) {
    const gastoCreated = await GastoModel.create({
      ...gasto,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return gastoCreated;
  },
  async edit(gasto, id) {
    return await GastoModel.update(
      { ...gasto },
      {
        where: {
          id: id,
        },
      }
    );
  },
  async remove(id) {
    return await GastoModel.destroy({
      where: {
        id: id,
      },
    });
  },
  async getAll(query) {
    return await GastoModel.findAll();
  },
  async getById(id) {
    return await GastoModel.findOne({
      where: {
        id: id,
      },
    });
  },
  async getOne(query) {
    const gastoFounded = await GastoModel.findOne({
      where: {
        ...query,
      },
    });
    return gastoFounded?.dataValues;
  },
});
