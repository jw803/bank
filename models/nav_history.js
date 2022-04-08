import moment from "moment-timezone";
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
    mutual_fund_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nav: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    }
  },
  {
    // Other model options go here
    sequelize, // 傳入Sequelize Instance，就是Connection建立連線後的Instance
    modelName: "nav_history", // 定義ModelName
  }
);

Schema.sync({ force: false });

class NavHistory {
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

  async bulkCreate(navList) {
    await this.db.bulkCreate(navList);
    return null;
  }

  async getNearlyOneDayNav(fundIdList) {
    const result = await this.db.findAll({
      where: { 
        mutual_fund_id: { [Op.in]: fundIdList },
        createdAt: { [Op.gte]: moment().startOf('day').toDate() }
      },
      attributes: { include: ["id", "trade_date", "mutual_fund_id"] }
    });
    return result;
  }
}

export default new NavHistory()


