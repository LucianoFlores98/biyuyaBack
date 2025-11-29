export default interface IAccount {
  id: string;
  name: string;
  type: string;
  balance: number;
  wallet_id: string;
  createdAt: Date;
  updatedAt: Date;
}
