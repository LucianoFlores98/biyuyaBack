import { sequelize } from "../../../../server/DbConnection";
import { DataTypes } from "sequelize";
import UserModel from "../../../users/infrastructure/models/UserModel";
import IncreaseRateModel from "../../../increaseRate/infrastructure/models/IncreaseRateModel";

const SubscriptionModel = sequelize.define("Subscriptions", {
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
  monthly_cost: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  increase_rate_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: IncreaseRateModel,
      key: "id",
    },
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

SubscriptionModel.belongsTo(UserModel, { foreignKey: "user_id" });
SubscriptionModel.belongsTo(IncreaseRateModel, { foreignKey: "increase_rate_id" });

export default SubscriptionModel;
