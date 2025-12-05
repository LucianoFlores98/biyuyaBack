import { IIncreaseRateRepository } from "../repository/IIncreaseRateRepository";
import { EditIncreaseRateAction, IEditIncreaseRateAction } from "./EditIncreaseRateAction";
import { GetAllIncreaseRatesAction, IGetAllIncreaseRatesAction } from "./GetAllIncreaseRatesAction";
import { IGetOneIncreaseRateAction, GetOneIncreaseRateAction } from "./GetOneIncreaseRateAction";
import { GetIncreaseRateByIdAction, IGetIncreaseRateByIdAction } from "./GetIncreaseRateByIdAction";
import { IRemoveIncreaseRateAction, RemoveIncreaseRateAction } from "./RemoveIncreaseRateAction";
import { ISaveIncreaseRateAction, SaveIncreaseRateAction } from "./SaveIncreaseRateAction";
import { RegisterIPCAction, IRegisterIPCAction } from "./RegisterIPCAction";
import { GetIPCHistoryAction, IGetIPCHistoryAction } from "./GetIPCHistoryAction";

export interface IIncreaseRateActions {
  save: ISaveIncreaseRateAction;
  edit: IEditIncreaseRateAction;
  remove: IRemoveIncreaseRateAction;
  getAll: IGetAllIncreaseRatesAction;
  getById: IGetIncreaseRateByIdAction;
  getOne: IGetOneIncreaseRateAction;
  registerIPC: IRegisterIPCAction;
  getIPCHistory: IGetIPCHistoryAction;
}

export const getIncreaseRateActions = (
  IncreaseRateRepository: IIncreaseRateRepository
) => {
  const IncreaseRateActions: IIncreaseRateActions = {
    save: SaveIncreaseRateAction(IncreaseRateRepository),
    edit: EditIncreaseRateAction(IncreaseRateRepository),
    remove: RemoveIncreaseRateAction(IncreaseRateRepository),
    getAll: GetAllIncreaseRatesAction(IncreaseRateRepository),
    getById: GetIncreaseRateByIdAction(IncreaseRateRepository),
    getOne: GetOneIncreaseRateAction(IncreaseRateRepository),
    registerIPC: RegisterIPCAction(IncreaseRateRepository),
    getIPCHistory: GetIPCHistoryAction(IncreaseRateRepository),
  };
  return IncreaseRateActions;
};
