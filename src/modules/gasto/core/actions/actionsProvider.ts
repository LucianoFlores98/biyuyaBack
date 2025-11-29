import { IGastoRepository } from "../repository/IGastoRepository";
import { EditGastoAction, IEditGastoAction } from "./EditGastoAction";
import { GetAllGastosAction, IGetAllGastosAction } from "./GetAllGastosAction";
import { IGetOneGastoAction, GetOneGastoAction } from "./GetOneGastoAction";
import { GetGastoByIdAction, IGetGastoByIdAction } from "./GetGastoByIdAction";
import { IRemoveGastoAction, RemoveGastoAction } from "./RemoveGastoAction";
import { ISaveGastoAction, SaveGastoAction } from "./SaveGastoAction";

export interface IGastoActions {
  save: ISaveGastoAction;
  edit: IEditGastoAction;
  remove: IRemoveGastoAction;
  getAll: IGetAllGastosAction;
  getById: IGetGastoByIdAction;
  getOne: IGetOneGastoAction;
}

export const getGastoActions = (
  GastoRepository: IGastoRepository
) => {
  const GastoActions: IGastoActions = {
    save: SaveGastoAction(GastoRepository),
    edit: EditGastoAction(GastoRepository),
    remove: RemoveGastoAction(GastoRepository),
    getAll: GetAllGastosAction(GastoRepository),
    getById: GetGastoByIdAction(GastoRepository),
    getOne: GetOneGastoAction(GastoRepository),
  };
  return GastoActions;
};
