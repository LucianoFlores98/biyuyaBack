import IGasto from "../entities/IGasto";

export interface IGastoRepository {
  save: (gasto: IGasto) => Promise<any>;
  edit: (gasto: IGasto, id: string) => Promise<any>;
  remove: (id: string) => Promise<any>;
  getAll: (query: any) => Promise<any>;
  getOne: (query: any) => Promise<any>;
  getById: (id: string) => Promise<any>;
}
