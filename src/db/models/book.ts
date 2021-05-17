import {
  Model,
  DataTypes,
  Optional,
  BelongsToCreateAssociationMixin,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
} from 'sequelize';

import { sequelize } from '../';
import { Author, AuthorAttributes, AuthorInstance } from './author';

export interface BookAttributes {
  id: number;
  title: string;
  numberOfPages: number;
  authorId: number;
}

export interface BookCreationAttributes
  extends Optional<BookAttributes, 'id'> { }

export interface BookUpdationAttributes
  extends Optional<BookAttributes, 'id' | 'authorId'> { }

export interface BookInstance
  extends Model<BookAttributes, BookCreationAttributes>,
  BookAttributes {
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export class Book extends Model<BookAttributes, BookCreationAttributes>
  implements BookAttributes {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public title!: string;
  public numberOfPages!: number;
  public authorId!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  public getAuthor!: BelongsToGetAssociationMixin<AuthorInstance>;
  public setAuthor!: BelongsToSetAssociationMixin<AuthorInstance, AuthorInstance['id']>;
  public createAuthor!: BelongsToCreateAssociationMixin<AuthorAttributes>;
  // You can also pre-declare possible inclusions, these will only be populated if you
  // actively include a relation.
  public readonly author?: Author; // Note this is optional since it's only populated when explicitly requested in code

  static associate(models: any) {
    // define association here
  }
}

export const BookInit = () => {

  Book.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true,
    },
    title: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    numberOfPages: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    authorId: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    tableName: 'book',
    modelName: 'Book',
  });

  Book.associate = (models) => {
    Book.belongsTo(models.Author, {
      as: 'author',
      foreignKey: 'author_id',
      targetKey: 'id',
      onDelete: 'RESTRICT',
      hooks: true
    });
  }
}
