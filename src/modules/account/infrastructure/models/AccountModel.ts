import { sequelize } from "../../../../server/DbConnection";
import { DataTypes } from "sequelize";
import WalletModel from "../../../wallet/infrastructure/models/WalletModel";

const AccountModel = sequelize.define("Accounts", {
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
  balance: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
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

AccountModel.belongsTo(WalletModel, { foreignKey: "wallet_id" });

export default AccountModel;
