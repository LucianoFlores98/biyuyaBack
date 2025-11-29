export default interface ISubscription {
  id: string;
  name: string;
  type: string;
  monthly_cost: number;
  date: Date;
  increase_rate_id: string;
  user_id: string;
  createdAt: Date;
  updatedAt: Date;
}
