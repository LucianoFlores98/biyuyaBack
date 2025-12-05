import { sequelize } from "../../../../server/DbConnection";
import { DataTypes } from "sequelize";
import UserModel from "../../../users/infrastructure/models/UserModel";

const RevenueModel = sequelize.define("Revenues", {
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
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  period: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  increase_frequency: {
    type: DataTypes.INTEGER,
    allowNull: true,
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

RevenueModel.belongsTo(UserModel, { foreignKey: "user_id" });

export default RevenueModel;
