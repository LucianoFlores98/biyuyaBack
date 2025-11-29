import { IPaymentMethodRepository } from "../repository/IPaymentMethodRepository";
import { EditPaymentMethodAction, IEditPaymentMethodAction } from "./EditPaymentMethodAction";
import { GetAllPaymentMethodsAction, IGetAllPaymentMethodsAction } from "./GetAllPaymentMethodsAction";
import { IGetOnePaymentMethodAction, GetOnePaymentMethodAction } from "./GetOnePaymentMethodAction";
import { GetPaymentMethodByIdAction, IGetPaymentMethodByIdAction } from "./GetPaymentMethodByIdAction";
import { IRemovePaymentMethodAction, RemovePaymentMethodAction } from "./RemovePaymentMethodAction";
import { ISavePaymentMethodAction, SavePaymentMethodAction } from "./SavePaymentMethodAction";

export interface IPaymentMethodActions {
  save: ISavePaymentMethodAction;
  edit: IEditPaymentMethodAction;
  remove: IRemovePaymentMethodAction;
  getAll: IGetAllPaymentMethodsAction;
  getById: IGetPaymentMethodByIdAction;
  getOne: IGetOnePaymentMethodAction;
}

export const getPaymentMethodActions = (
  PaymentMethodRepository: IPaymentMethodRepository
) => {
  const PaymentMethodActions: IPaymentMethodActions = {
    save: SavePaymentMethodAction(PaymentMethodRepository),
    edit: EditPaymentMethodAction(PaymentMethodRepository),
    remove: RemovePaymentMethodAction(PaymentMethodRepository),
    getAll: GetAllPaymentMethodsAction(PaymentMethodRepository),
    getById: GetPaymentMethodByIdAction(PaymentMethodRepository),
    getOne: GetOnePaymentMethodAction(PaymentMethodRepository),
  };
  return PaymentMethodActions;
};
