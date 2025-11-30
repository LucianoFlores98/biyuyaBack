import { ISubscriptionRepository } from "../../core/repository/ISubscriptionRepository";
import SubscriptionModel from "../models/SubscriptionModel";

export const SubscriptionRepository = (): ISubscriptionRepository => ({
  async save(subscription) {
    const subscriptionCreated = await SubscriptionModel.create({
      ...subscription,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return subscriptionCreated;
  },
  async edit(subscription, id) {
    return await SubscriptionModel.update(
      { ...subscription },
      {
        where: {
          id: id,
        },
      }
    );
  },
  async remove(id) {
    return await SubscriptionModel.destroy({
      where: {
        id: id,
      },
    });
  },
  async getAll(query) {
    return await SubscriptionModel.findAll();
  },
  async getById(id) {
    return await SubscriptionModel.findOne({
      where: {
        id: id,
      },
    });
  },
  async getOne(query) {
    const subscriptionFounded = await SubscriptionModel.findOne({
      where: {
        ...(query as any),
      },
    });
    return subscriptionFounded?.dataValues;
  },
});
