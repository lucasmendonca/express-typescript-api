import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../configs/db";
// import { User } from "./user";

// interface IPost {
//   id: number;
//   title: string;
//   body: string;
//   createdAt?: Date;
//   updatedAt?: Date;
//   deletedAt?: Date;
// }

// export interface PostInput extends Optional<IPost, "id"> {}
// export interface PostOuput extends Required<IPost> {}

// class Post extends Model<IPost, PostInput> implements IPost {
//   public id!: number;
//   public title!: string;
//   public body!: string;

//   public readonly createdAt!: Date;
//   public readonly updatedAt!: Date;
//   public readonly deletedAt!: Date;
// }

export class Post extends Model {}

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

export class User extends Model {}

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