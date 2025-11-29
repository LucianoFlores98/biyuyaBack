export default interface IWallet {
  id: string;
  balance: number;
  prev_balance: number;
  user_id: string;
  createdAt: Date;
  updatedAt: Date;
}
