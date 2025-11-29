import { Router } from "express";
import { DependencyManager } from "../../../../dependencyManager";
import { IJwtValidator } from "../../../../middlewares/JwtValidator/core/IJwtValidator";
import { getGastoControllers } from "../controllers/controllersProvider";

const getGastoRoutes = (dependencyManager: DependencyManager) => {
  const jwtValidator = getJwtValidator(dependencyManager);
  const { save, edit, remove, getAll, getById } =
    getGastoControllers(dependencyManager);
  const gastoRouter = Router();
  const path = "gastos";

  gastoRouter.post(`/${path}`, [jwtValidator], save);
  gastoRouter.get(`/${path}`, [jwtValidator], getAll);
  gastoRouter.get(`/${path}/:id`, [jwtValidator], getById);
  gastoRouter.patch(`/${path}/:id`, [jwtValidator], edit);
  gastoRouter.delete(`/${path}/:id`, [jwtValidator], remove);

  return gastoRouter;
};

const getJwtValidator = (dependencyManager: DependencyManager) => {
  return dependencyManager.resolve("jwtValidator") as IJwtValidator;
};

export default getGastoRoutes;
