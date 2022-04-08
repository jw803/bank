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
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mutual_fund_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    trade_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    expense_usd: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    }
  },
  {
    // Other model options go here
    sequelize, // 傳入Sequelize Instance，就是Connection建立連線後的Instance
    modelName: "order", // 定義ModelName
  }
);

Schema.sync({ force: false });

class Order {
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

  async create(order) {
    await this.db.create(order)
    return null
  }

  async getProcessingOrder() {
    const result = await this.db.findAll({
      where: { status: 'processing' },
      attributes: { include: ["id", "trade_date", "mutual_fund_id"] }
    });
    return result;
  }

  async finishOrder(orderId, amount) {
    const result = await this.db.update(
      {
        status: 'finish',
        amount: amount
      },
      {
        where: { id: orderId },
      });
    return result;
  }

  async failedOrder(orderId) {
    const result = await this.db.update(
      {
        status: 'failed'
      },
      {
        where: { id: orderId },
      });
    return result;
  }
}

export default new Order()


