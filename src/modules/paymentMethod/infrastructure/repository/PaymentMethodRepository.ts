import { IPaymentMethodRepository } from "../../core/repository/IPaymentMethodRepository";
import PaymentMethodModel from "../models/PaymentMethodModel";

export const PaymentMethodRepository = (): IPaymentMethodRepository => ({
  async save(paymentMethod) {
    const paymentMethodCreated = await PaymentMethodModel.create({
      ...paymentMethod,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return paymentMethodCreated;
  },
  async edit(paymentMethod, id) {
    return await PaymentMethodModel.update(
      { ...paymentMethod },
      {
        where: {
          id: id,
        },
      }
    );
  },
  async remove(id) {
    return await PaymentMethodModel.destroy({
      where: {
        id: id,
      },
    });
  },
  async getAll(query) {
    return await PaymentMethodModel.findAll();
  },
  async getById(id) {
    return await PaymentMethodModel.findOne({
      where: {
        id: id,
      },
    });
  },
  async getOne(query) {
    const paymentMethodFounded = await PaymentMethodModel.findOne({
      where: {
        ...query,
      },
    });
    return paymentMethodFounded?.dataValues;
  },
});
