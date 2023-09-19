import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";

export class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM,
      values: ["ADMIN", "MENTOR"],
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        max: 50,
        min: 3,
      },
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Invalid E-mail",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "user",
    timestamps: false,
    underscored: true,
  }
);
