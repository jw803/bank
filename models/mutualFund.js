import pkg from "sequelize";
import { Schema as MutualFundType } from './mutual_fund_type.js'

const { Model, DataTypes } = pkg;

import { sequelize } from "./db.js";

class Schema extends Model { }
Schema.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: MutualFundType,
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prospectus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price_usd: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    }
  },
  {
    // Other model options go here
    sequelize, // 傳入Sequelize Instance，就是Connection建立連線後的Instance
    modelName: "mutual_fund", // 定義ModelName
  }
);

Schema.sync({ force: false });
Schema.belongsTo(MutualFundType, {
  foreignKey: 'type_id'
});
class MutualFund {
  constructor() {
    this.db = Schema
  }

  async getAll() {
    let result = await this.db.findAll({
      attributes: { exclude: ["id", "createdAt", "updatedAt"] },
      include: {
        model: MutualFundType,
        attributes: ['trading_fee_rate']
      }
    });

    return result;
  }

  async getPrice(mutualFundId) {
    const result = await this.db.findOne({
      where: { id: mutualFundId },
      attributes: { include: ["price_usd"] },
    });
    return result.price_usd;
  }
}

export default new MutualFund()


