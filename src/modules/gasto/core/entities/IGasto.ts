export default interface IGasto {
  id: string;
  name: string;
  type: string;
  total_amount: number;
  payment_end_date: Date;
  payment_method_id: string;
  user_id: string;
  createdAt: Date;
  updatedAt: Date;
}
