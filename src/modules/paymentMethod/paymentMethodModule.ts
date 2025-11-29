import { DependencyManager } from "../../dependencyManager";
import { PaymentMethodRepository } from "./infrastructure/repository/PaymentMethodRepository";

export const PaymentMethodModuleInitializer = (dependencyManager: DependencyManager) => {
  const paymentMethodRepository = PaymentMethodRepository();
  dependencyManager.register("paymentMethodRepository", paymentMethodRepository);
};
