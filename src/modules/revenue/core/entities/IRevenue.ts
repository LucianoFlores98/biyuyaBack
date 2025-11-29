export default interface IRevenue {
  id: string;
  name: string;
  type: string;
  amount: number;
  date: Date;
  user_id: string;
  increase_rate: number;
  createdAt: Date;
  updatedAt: Date;
}
