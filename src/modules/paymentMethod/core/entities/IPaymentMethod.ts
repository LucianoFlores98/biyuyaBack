export default interface IPaymentMethod {
  id: string;
  name: string;
  type: string;
  installments: number;
  installment_amount: number;
  card_id: string;
  gasto_id: string;
  account_id: string;
  createdAt: Date;
  updatedAt: Date;
}
