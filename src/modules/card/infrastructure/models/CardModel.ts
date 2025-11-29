import { sequelize } from "../../../../server/DbConnection";
import { DataTypes } from "sequelize";
import WalletModel from "../../../wallet/infrastructure/models/WalletModel";

const CardModel = sequelize.define("Cards", {
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
  card_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  inst_recargo: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
  is_payed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  wallet_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: WalletModel,
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

CardModel.belongsTo(WalletModel, { foreignKey: "wallet_id" });

export default CardModel;
