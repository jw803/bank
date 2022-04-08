import pkg from "sequelize";

const { Model, DataTypes } = pkg;

import { sequelize } from "./db.js";

export class Schema extends Model {}
Schema.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    trading_fee_rate: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    }
  },
  {
    // Other model options go here
    sequelize, // 傳入Sequelize Instance，就是Connection建立連線後的Instance
    modelName: "mutual_fund_type", // 定義ModelName
  }
);

Schema.sync({ force: false });

class MutualFundType {
  constructor() {
      this.db = Schema
  }

  async find(email) {
    const result = await this.db.findOne({
      where: { email },
      attributes: { exclude: ["id", "createdAt", "updatedAt"] },
    });
    return result;
  }
}

export default new MutualFundType()


