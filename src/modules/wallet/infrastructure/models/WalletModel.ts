import { sequelize } from "../../../../server/DbConnection";
import { DataTypes } from "sequelize";
import UserModel from "../../../users/infrastructure/models/UserModel";

const WalletModel = sequelize.define("Wallets", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  balance: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
  prev_balance: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: UserModel,
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

// Define associations
WalletModel.belongsTo(UserModel, { foreignKey: "user_id" });

export default WalletModel;
