import { IRevenueRepository } from "../repository/IRevenueRepository";
import { IIncreaseRateRepository } from "../../../increaseRate/core/repository/IIncreaseRateRepository";
import { ISalaryIncreaseService } from "../services/ISalaryIncreaseService";
import { EditRevenueAction, IEditRevenueAction } from "./EditRevenueAction";
import { GetAllRevenuesAction, IGetAllRevenuesAction } from "./GetAllRevenuesAction";
import { IGetOneRevenueAction, GetOneRevenueAction } from "./GetOneRevenueAction";
import { GetRevenueByIdAction, IGetRevenueByIdAction } from "./GetRevenueByIdAction";
import { IRemoveRevenueAction, RemoveRevenueAction } from "./RemoveRevenueAction";
import { ISaveRevenueAction, SaveRevenueAction } from "./SaveRevenueAction";
import { CalculateSalaryIncreaseAction, ICalculateSalaryIncreaseAction } from "./CalculateSalaryIncreaseAction";
import { ApplySalaryIncreaseAction, IApplySalaryIncreaseAction } from "./ApplySalaryIncreaseAction";
import { GetPendingIncreasesAction, IGetPendingIncreasesAction } from "./GetPendingIncreasesAction";

export interface IRevenueActions {
  save: ISaveRevenueAction;
  edit: IEditRevenueAction;
  remove: IRemoveRevenueAction;
  getAll: IGetAllRevenuesAction;
  getById: IGetRevenueByIdAction;
  getOne: IGetOneRevenueAction;
  calculateSalaryIncrease: ICalculateSalaryIncreaseAction;
  applySalaryIncrease: IApplySalaryIncreaseAction;
  getPendingIncreases: IGetPendingIncreasesAction;
}

export const getRevenueActions = (
  RevenueRepository: IRevenueRepository,
  IncreaseRateRepository: IIncreaseRateRepository,
  SalaryIncreaseService: ISalaryIncreaseService
) => {
  const RevenueActions: IRevenueActions = {
    save: SaveRevenueAction(RevenueRepository),
    edit: EditRevenueAction(RevenueRepository),
    remove: RemoveRevenueAction(RevenueRepository),
    getAll: GetAllRevenuesAction(RevenueRepository),
    getById: GetRevenueByIdAction(RevenueRepository),
    getOne: GetOneRevenueAction(RevenueRepository),
    calculateSalaryIncrease: CalculateSalaryIncreaseAction(
      RevenueRepository,
      IncreaseRateRepository,
      SalaryIncreaseService
    ),
    applySalaryIncrease: ApplySalaryIncreaseAction(RevenueRepository),
    getPendingIncreases: GetPendingIncreasesAction(
      RevenueRepository,
      SalaryIncreaseService
    ),
  };
  return RevenueActions;
};
