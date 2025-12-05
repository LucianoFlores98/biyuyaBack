import { IRevenueRepository } from "../repository/IRevenueRepository";
import { EditRevenueAction, IEditRevenueAction } from "./EditRevenueAction";
import { GetAllRevenuesAction, IGetAllRevenuesAction } from "./GetAllRevenuesAction";
import { IGetOneRevenueAction, GetOneRevenueAction } from "./GetOneRevenueAction";
import { GetRevenueByIdAction, IGetRevenueByIdAction } from "./GetRevenueByIdAction";
import { IRemoveRevenueAction, RemoveRevenueAction } from "./RemoveRevenueAction";
import { ISaveRevenueAction, SaveRevenueAction } from "./SaveRevenueAction";

export interface IRevenueActions {
  save: ISaveRevenueAction;
  edit: IEditRevenueAction;
  remove: IRemoveRevenueAction;
  getAll: IGetAllRevenuesAction;
  getById: IGetRevenueByIdAction;
  getOne: IGetOneRevenueAction;
}

export const getRevenueActions = (
  RevenueRepository: IRevenueRepository
) => {
  const RevenueActions: IRevenueActions = {
    save: SaveRevenueAction(RevenueRepository),
    edit: EditRevenueAction(RevenueRepository),
    remove: RemoveRevenueAction(RevenueRepository),
    getAll: GetAllRevenuesAction(RevenueRepository),
    getById: GetRevenueByIdAction(RevenueRepository),
    getOne: GetOneRevenueAction(RevenueRepository),
  };
  return RevenueActions;
};

