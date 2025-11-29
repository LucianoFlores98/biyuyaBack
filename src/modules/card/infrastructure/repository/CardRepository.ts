import { ICardRepository } from "../../core/repository/ICardRepository";
import CardModel from "../models/CardModel";

export const CardRepository = (): ICardRepository => ({
  async save(card) {
    const cardCreated = await CardModel.create({
      ...card,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return cardCreated;
  },
  async edit(card, id) {
    return await CardModel.update(
      { ...card },
      {
        where: {
          id: id,
        },
      }
    );
  },
  async remove(id) {
    return await CardModel.destroy({
      where: {
        id: id,
      },
    });
  },
  async getAll(query) {
    return await CardModel.findAll();
  },
  async getById(id) {
    return await CardModel.findOne({
      where: {
        id: id,
      },
    });
  },
  async getOne(query) {
    const cardFounded = await CardModel.findOne({
      where: {
        ...query,
      },
    });
    return cardFounded?.dataValues;
  },
});
