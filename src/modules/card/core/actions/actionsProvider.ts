import { ICardRepository } from "../repository/ICardRepository";
import { EditCardAction, IEditCardAction } from "./EditCardAction";
import { GetAllCardsAction, IGetAllCardsAction } from "./GetAllCardsAction";
import { IGetOneCardAction, GetOneCardAction } from "./GetOneCardAction";
import { GetCardByIdAction, IGetCardByIdAction } from "./GetCardByIdAction";
import { IRemoveCardAction, RemoveCardAction } from "./RemoveCardAction";
import { ISaveCardAction, SaveCardAction } from "./SaveCardAction";

export interface ICardActions {
  save: ISaveCardAction;
  edit: IEditCardAction;
  remove: IRemoveCardAction;
  getAll: IGetAllCardsAction;
  getById: IGetCardByIdAction;
  getOne: IGetOneCardAction;
}

export const getCardActions = (
  CardRepository: ICardRepository
) => {
  const CardActions: ICardActions = {
    save: SaveCardAction(CardRepository),
    edit: EditCardAction(CardRepository),
    remove: RemoveCardAction(CardRepository),
    getAll: GetAllCardsAction(CardRepository),
    getById: GetCardByIdAction(CardRepository),
    getOne: GetOneCardAction(CardRepository),
  };
  return CardActions;
};
