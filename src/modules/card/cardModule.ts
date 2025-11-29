import { DependencyManager } from "../../dependencyManager";
import { CardRepository } from "./infrastructure/repository/CardRepository";

export const CardModuleInitializer = (dependencyManager: DependencyManager) => {
  const cardRepository = CardRepository();
  dependencyManager.register("cardRepository", cardRepository);
};
