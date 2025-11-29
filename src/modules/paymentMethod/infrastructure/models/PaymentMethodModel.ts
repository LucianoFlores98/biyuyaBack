import { sequelize } from "../../../../server/DbConnection";
import { DataTypes } from "sequelize";
import CardModel from "../../../card/infrastructure/models/CardModel";
import GastoModel from "../../../gasto/infrastructure/models/GastoModel";
import AccountModel from "../../../account/infrastructure/models/AccountModel";

const PaymentMethodModel = sequelize.define("PaymentMethods", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  installments: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  installment_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
  card_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: CardModel,
      key: "id",
    },
  },
  gasto_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: GastoModel,
      key: "id",
    },
  },
  account_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: AccountModel,
      key: "id",
    },
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
});

PaymentMethodModel.belongsTo(CardModel, { foreignKey: "card_id" });
PaymentMethodModel.belongsTo(GastoModel, { foreignKey: "gasto_id" });
PaymentMethodModel.belongsTo(AccountModel, { foreignKey: "account_id" });

export default PaymentMethodModel;
