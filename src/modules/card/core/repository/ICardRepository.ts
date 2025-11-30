import ICard from "../entities/ICard";

export interface ICardRepository {
  save: (card: ICard) => Promise<unknown>;
  edit: (card: ICard, id: string) => Promise<unknown>;
  remove: (id: string) => Promise<unknown>;
  getAll: (query: unknown) => Promise<unknown>;
  getOne: (query: unknown) => Promise<unknown>;
  getById: (id: string) => Promise<unknown>;
}
