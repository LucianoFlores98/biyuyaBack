export default interface ICard {
  id: string;
  name: string;
  card_number: string;
  inst_recargo: number;
  is_payed: boolean;
  wallet_id: string;
  createdAt: Date;
  updatedAt: Date;
}
