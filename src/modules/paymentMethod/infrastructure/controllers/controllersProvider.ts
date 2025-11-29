import { DependencyManager } from "../../../../dependencyManager";
import { getPaymentMethodActions } from "../../core/actions/actionsProvider";
import { IPaymentMethodRepository } from "../../core/repository/IPaymentMethodRepository";
import { PaymentMethodControllers } from "./PaymentMethodControllers";

export const getPaymentMethodControllers = (dependencyManager: DependencyManager) => {
  const PaymentMethodRepository = getPaymentMethodRepository(dependencyManager);
  const PaymentMethodActions = getPaymentMethodActions(PaymentMethodRepository);
  return PaymentMethodControllers(PaymentMethodActions);
};

const getPaymentMethodRepository = (dependencyManager: DependencyManager) => {
  return dependencyManager.resolve("paymentMethodRepository") as IPaymentMethodRepository;
};
