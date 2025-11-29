import { Router } from "express";
import { DependencyManager } from "../../../../dependencyManager";
import { IJwtValidator } from "../../../../middlewares/JwtValidator/core/IJwtValidator";
import { getCardControllers } from "../controllers/controllersProvider";

const getCardRoutes = (dependencyManager: DependencyManager) => {
  const jwtValidator = getJwtValidator(dependencyManager);
  const { save, edit, remove, getAll, getById } =
    getCardControllers(dependencyManager);
  const cardRouter = Router();
  const path = "cards";

  cardRouter.post(`/${path}`, [jwtValidator], save);
  cardRouter.get(`/${path}`, [jwtValidator], getAll);
  cardRouter.get(`/${path}/:id`, [jwtValidator], getById);
  cardRouter.patch(`/${path}/:id`, [jwtValidator], edit);
  cardRouter.delete(`/${path}/:id`, [jwtValidator], remove);

  return cardRouter;
};

const getJwtValidator = (dependencyManager: DependencyManager) => {
  return dependencyManager.resolve("jwtValidator") as IJwtValidator;
};

export default getCardRoutes;
