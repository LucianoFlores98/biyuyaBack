import { sequelize } from "../../../../server/DbConnection";
import { DataTypes } from "sequelize";
import UserModel from "../../../users/infrastructure/models/UserModel";

const GastoModel = sequelize.define("Gastos", {
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
  total_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  payment_end_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  payment_method_id: {
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

GastoModel.belongsTo(UserModel, { foreignKey: "user_id" });

export default GastoModel;
