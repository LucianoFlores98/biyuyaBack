import { DependencyManager } from "../../../../dependencyManager";
import { getCardActions } from "../../core/actions/actionsProvider";
import { ICardRepository } from "../../core/repository/ICardRepository";
import { CardControllers } from "./CardControllers";

export const getCardControllers = (dependencyManager: DependencyManager) => {
  const CardRepository = getCardRepository(dependencyManager);
  const CardActions = getCardActions(CardRepository);
  return CardControllers(CardActions);
};

const getCardRepository = (dependencyManager: DependencyManager) => {
  return dependencyManager.resolve("cardRepository") as ICardRepository;
};
