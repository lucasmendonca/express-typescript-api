import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../configs/db';

interface IPost {
  id: number;
  title: string;
  body: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface PostInput extends Optional<IPost, "id"> {}
export interface PostOuput extends Required<IPost> {}

class Post extends Model<IPost, PostInput> implements IPost {
  public id!: number;
  public title!: string;
  public body!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Post.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  }, {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true
  })
  
  export default Post