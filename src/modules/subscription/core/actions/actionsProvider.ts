import { ISubscriptionRepository } from "../repository/ISubscriptionRepository";
import { EditSubscriptionAction, IEditSubscriptionAction } from "./EditSubscriptionAction";
import { GetAllSubscriptionsAction, IGetAllSubscriptionsAction } from "./GetAllSubscriptionsAction";
import { IGetOneSubscriptionAction, GetOneSubscriptionAction } from "./GetOneSubscriptionAction";
import { GetSubscriptionByIdAction, IGetSubscriptionByIdAction } from "./GetSubscriptionByIdAction";
import { IRemoveSubscriptionAction, RemoveSubscriptionAction } from "./RemoveSubscriptionAction";
import { ISaveSubscriptionAction, SaveSubscriptionAction } from "./SaveSubscriptionAction";

export interface ISubscriptionActions {
  save: ISaveSubscriptionAction;
  edit: IEditSubscriptionAction;
  remove: IRemoveSubscriptionAction;
  getAll: IGetAllSubscriptionsAction;
  getById: IGetSubscriptionByIdAction;
  getOne: IGetOneSubscriptionAction;
}

export const getSubscriptionActions = (
  SubscriptionRepository: ISubscriptionRepository
) => {
  const SubscriptionActions: ISubscriptionActions = {
    save: SaveSubscriptionAction(SubscriptionRepository),
    edit: EditSubscriptionAction(SubscriptionRepository),
    remove: RemoveSubscriptionAction(SubscriptionRepository),
    getAll: GetAllSubscriptionsAction(SubscriptionRepository),
    getById: GetSubscriptionByIdAction(SubscriptionRepository),
    getOne: GetOneSubscriptionAction(SubscriptionRepository),
  };
  return SubscriptionActions;
};
