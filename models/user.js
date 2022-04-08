import pkg from "sequelize";

const { Model, DataTypes, Op } = pkg;

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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password_salt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    balance: {
      type: DataTypes.DOUBLE,
      defaultValue: 0
    },
    agreement_signed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    currency: {
      type: DataTypes.STRING,
      defaultValue: 'usd'
    }
  },
  {
    // Other model options go here
    sequelize, // 傳入Sequelize Instance，就是Connection建立連線後的Instance
    modelName: "user", // 定義ModelName
  }
);

Schema.sync({ force: false });

class User {
  constructor() {
    this.db = Schema
  }

  async find(email) {
    const result = await this.db.findOne({
      where: { email },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    return result;
  }

  async signAgreement(userId) {
    await this.db.update({ agreement_signed: true }, { where: { id: userId } })
    return null
  }

  async getBalance(userId) {
    const result = await this.db.findOne({
      where: { id: userId },
      attributes: { include: ["balance"] },
    });
    return result.balance;
  }

  async getUserBalanceEmailList(userIdList) {
    const result = await this.db.findAll({
      where: { id: { [Op.in]: userIdList } },
      attributes: { include: ["balance", "id", "email"] },
    });
    return result;
  }

  async decreaseBalance(userId, price) {
    await this.db.decrement(['balance', price], { where: { id: userId } })
    return null;
  }
}

export default new User()


