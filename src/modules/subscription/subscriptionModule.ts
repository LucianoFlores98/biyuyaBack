import { DependencyManager } from "../../dependencyManager";
import { SubscriptionRepository } from "./infrastructure/repository/SubscriptionRepository";

export const SubscriptionModuleInitializer = (dependencyManager: DependencyManager) => {
  const subscriptionRepository = SubscriptionRepository();
  dependencyManager.register("subscriptionRepository", subscriptionRepository);
};
