import pkg from "sequelize";

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
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    rate: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    }
  },
  {
    // Other model options go here
    sequelize, // 傳入Sequelize Instance，就是Connection建立連線後的Instance
    modelName: "currency_exchange_rate", // 定義ModelName
  }
);

Schema.sync({ force: false });

class CurrencyExchangeRate {
  constructor() {
    this.db = Schema
  }

  async getExchangeRate(currency) {
    const result = await this.db.findOne({
      where: { currency },
      attributes: { include: ["rate"] },
    });
    return result.rate;
  }
}

export default new CurrencyExchangeRate()


