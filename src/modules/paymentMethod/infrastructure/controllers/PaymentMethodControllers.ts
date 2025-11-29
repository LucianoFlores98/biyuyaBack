import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../../../../helpers/api";
import { createHashMap } from "../../../../helpers/utils";
import { IPaymentMethodActions } from "../../core/actions/actionsProvider";
import { InvalidIdException } from "../../core/exceptions/InvalidIdException";
import { PaymentMethodNotExistException } from "../../core/exceptions/PaymentMethodNotExistException";

const name = "Método de pago";
const pronoun = "o";

export const PaymentMethodControllers = ({
  save,
  edit,
  remove,
  getAll,
  getById,
  getOne,
}: IPaymentMethodActions) => {
  const errorResponses = createHashMap(
    {
      [PaymentMethodNotExistException.name]: (res: Response, error: Error) =>
        ErrorResponse(res, error, 404),
      [InvalidIdException.name]: (res: Response, error: Error) =>
        ErrorResponse(res, error, 400),
    },
    (res: Response, error: Error) => ErrorResponse(res, error)
  );

  return {
    save(req: Request, res: Response) {
      const saveExecution = save.execute(req.body);
      saveExecution
        .then((paymentMethod) => {
          const message = `${name} cread${pronoun} correctamente`;
          SuccessResponse(res, 201, message, paymentMethod);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
    edit(req: Request, res: Response) {
      const editExecution = edit.execute(req.body, req.params.id);
      editExecution
        .then((paymentMethod) => {
          const message = `${name} editad${pronoun} correctamente`;
          SuccessResponse(res, 200, message, paymentMethod);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
    remove(req: Request, res: Response) {
      const deleteExecution = remove.execute(req.params.id);
      deleteExecution
        .then((paymentMethod) => {
          const message = `${name} eliminad${pronoun} correctamente`;
          SuccessResponse(res, 200, message, paymentMethod);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
    getAll(req: Request, res: Response) {
      const getExecution = getAll.execute(req.query);
      getExecution
        .then((paymentMethods) => {
          const message = `${name}s obtenid${pronoun}s con éxito`;
          SuccessResponse(res, 200, message, paymentMethods);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
    getById(req: Request, res: Response) {
      const getByIdExecution = getById.execute(req.params.id);
      const message = `${name} obtenid${pronoun} con éxito`;
      getByIdExecution
        .then((paymentMethod) => {
          SuccessResponse(res, 200, message, paymentMethod);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
    getOne(req: Request, res: Response) {
      const getOneExecution = getOne.execute(req.body);
      const message = `${name} obtenid${pronoun} con éxito`;
      getOneExecution
        .then((paymentMethod) => {
          SuccessResponse(res, 200, message, paymentMethod);
        })
        .catch((error) => {
          errorResponses[error.name](res, error);
        });
    },
  };
};
