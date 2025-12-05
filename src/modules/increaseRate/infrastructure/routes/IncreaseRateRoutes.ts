import { Router } from "express";
import { DependencyManager } from "../../../../dependencyManager";
import { IJwtValidator } from "../../../../middlewares/JwtValidator/core/IJwtValidator";
import { getIncreaseRateControllers, getIPCControllers } from "../controllers/controllersProvider";

const getIncreaseRateRoutes = (dependencyManager: DependencyManager) => {
  const jwtValidator = getJwtValidator(dependencyManager);
  const { save, edit, remove, getAll, getById } =
    getIncreaseRateControllers(dependencyManager);
  const { registerIPC, getIPCHistory, getLatestIPC } =
    getIPCControllers(dependencyManager);
  const increaseRateRouter = Router();
  const path = "increase-rates";

  // Standard CRUD routes
  increaseRateRouter.post(`/${path}`, [jwtValidator], save);
  increaseRateRouter.get(`/${path}`, [jwtValidator], getAll);
  increaseRateRouter.get(`/${path}/:id`, [jwtValidator], getById);
  increaseRateRouter.patch(`/${path}/:id`, [jwtValidator], edit);
  increaseRateRouter.delete(`/${path}/:id`, [jwtValidator], remove);

  // IPC routes
  increaseRateRouter.post(`/${path}/ipc`, [jwtValidator], registerIPC);
  increaseRateRouter.get(`/${path}/ipc/history`, [jwtValidator], getIPCHistory);
  increaseRateRouter.get(`/${path}/ipc/latest`, [jwtValidator], getLatestIPC);

  return increaseRateRouter;
};

const getJwtValidator = (dependencyManager: DependencyManager) => {
  return dependencyManager.resolve("jwtValidator") as IJwtValidator;
};

export default getIncreaseRateRoutes;
