import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../configs/db";

export type AuthenticatedUser = {
    id: number;
    email: string
    name: string
    iat: number
    exp: number
}
  
export class Post extends Model {
    title!: string;
    body!: string;
    AuthorId!: number;
}

Post.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    modelName: 'Post',
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
  }
);

export class User extends Model {
  id?: number;
  name!: string;
  email!: string;
  password!: string;
}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: 'User',
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
  }
);

User.hasMany(Post, {as: 'Author', foreignKey: 'AuthorId' })

Post.belongsTo(User, {as: 'Author'});