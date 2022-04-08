import pkg from "sequelize";

const { Model, DataTypes } = pkg;

import { sequelize } from "./db.js";

class Schema extends Model {}
Schema.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    otp: DataTypes.STRING,
    expiration_time: DataTypes.DATE,
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    }
  },
  {
    // Other model options go here
    sequelize, // 傳入Sequelize Instance，就是Connection建立連線後的Instance
    modelName: "otp", // 定義ModelName
  }
);

Schema.sync({ force: false });

class OTP {
  constructor() {
      this.db = Schema
  }

  async get(otpId) {
    const result = await this.db.findOne({
      where: { id: otpId },
      attributes: { exclude: ["id", "createdAt", "updatedAt"] },
    });
    return result;
  }

  async isUserOTPVerified(email) {
    const index = this.db.findOne(e => e.email === email && e.verified);
    return index > -1;
  }

  async create(otp) {
    const result = await this.db.create(otp);
    return result;
  }

  async updateVerifyStatus(otpId) {
    await this.db.update({ verified: true }, { where: { id: otpId } });
    return null;
  }
}

export default new OTP()