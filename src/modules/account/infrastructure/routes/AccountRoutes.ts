import { Router } from "express";
import { DependencyManager } from "../../../../dependencyManager";
import { IJwtValidator } from "../../../../middlewares/JwtValidator/core/IJwtValidator";
import { getAccountControllers } from "../controllers/controllersProvider";

const getAccountRoutes = (dependencyManager: DependencyManager) => {
  const jwtValidator = getJwtValidator(dependencyManager);
  const { save, edit, remove, getAll, getById } =
    getAccountControllers(dependencyManager);
  const accountRouter = Router();
  const path = "accounts";

  accountRouter.post(`/${path}`, [jwtValidator], save);
  accountRouter.get(`/${path}`, [jwtValidator], getAll);
  accountRouter.get(`/${path}/:id`, [jwtValidator], getById);
  accountRouter.patch(`/${path}/:id`, [jwtValidator], edit);
  accountRouter.delete(`/${path}/:id`, [jwtValidator], remove);

  return accountRouter;
};

const getJwtValidator = (dependencyManager: DependencyManager) => {
  return dependencyManager.resolve("jwtValidator") as IJwtValidator;
};

export default getAccountRoutes;
