export default interface IRevenue {
  id: number;
  name: string;
  type: string;
  amount: number;
  net_amount?: number;
  period: string;
  increase_frequency: number;
  user_id: number;
  createdAt: Date;
  updatedAt: Date;
}
