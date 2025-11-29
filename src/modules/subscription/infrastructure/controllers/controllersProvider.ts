import { DependencyManager } from "../../../../dependencyManager";
import { getSubscriptionActions } from "../../core/actions/actionsProvider";
import { ISubscriptionRepository } from "../../core/repository/ISubscriptionRepository";
import { SubscriptionControllers } from "./SubscriptionControllers";

export const getSubscriptionControllers = (dependencyManager: DependencyManager) => {
  const SubscriptionRepository = getSubscriptionRepository(dependencyManager);
  const SubscriptionActions = getSubscriptionActions(SubscriptionRepository);
  return SubscriptionControllers(SubscriptionActions);
};

const getSubscriptionRepository = (dependencyManager: DependencyManager) => {
  return dependencyManager.resolve("subscriptionRepository") as ISubscriptionRepository;
};
