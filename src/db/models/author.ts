import {
  Model,
  Sequelize,
  DataTypes,
  Optional,
  Association,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  CreateOptions,
  UpdateOptions,
} from 'sequelize';
import bcrypt from 'bcrypt';

import { SALT_ROUNDS } from '../../constants';
import { sequelize } from '..';
import { Book } from './book';

export interface AuthorAttributes {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
  isDisabled: boolean;
}

export interface AuthorCreationAttributes
  extends Optional<AuthorAttributes, 'id' | 'isDisabled'> { }

export interface AuthorInstance
  extends Model<AuthorAttributes, AuthorCreationAttributes>,
  AuthorAttributes {
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export class Author extends Model<AuthorAttributes, AuthorCreationAttributes>
  implements AuthorAttributes {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public email!: string;
  public password!: string;
  public firstName!: string;
  public lastName?: string | undefined;
  public isDisabled!: boolean;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  // Since TS cannot determine model association at compile time
  // we have to declare them here purely virtually
  // these will not exist until `Model.init` was called.
  public getBooks!: HasManyGetAssociationsMixin<Book>; // Note the null assertions!
  public addBook!: HasManyAddAssociationMixin<Book, number>;
  public hasBook!: HasManyHasAssociationMixin<Book, number>;
  public countBooks!: HasManyCountAssociationsMixin;
  public createBook!: HasManyCreateAssociationMixin<Book>;

  // You can also pre-declare possible inclusions, these will only be populated if you
  // actively include a relation.
  public readonly books?: Book[]; // Note this is optional since it's only populated when explicitly requested in code

  public static associations: {
    books: Association<Author, Book>;
  };

  static associate(models: any) {
    // define association here
  }

  /**
   * compare the password
   * @param {String} hashedPassword - Hashed password.
   * @param {String} plain - Plain password.
   * @returns {Boolean}.
   */
  public static comparePassword(hashedPassword: string, plain: string) {
    return bcrypt.compareSync(plain, hashedPassword);
  }

  /**
   * Hash the plain password
   * @param {String} plain - Plain password.
   * @returns {String} - Hashed password.
   */
  public static hashPassword(plain: string) {
    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    return bcrypt.hashSync(plain, salt);
  }
}

export const AuthorInit = () => {
  Author.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lastName: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    isDisabled: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    sequelize,
    tableName: 'author',
    modelName: 'Author',
  });

  Author.associate = (models) => {
    Author.hasMany(models.Book, {
      as: 'books',
      foreignKey: 'author_id',
      sourceKey: 'id',
      onDelete: 'RESTRICT',
      hooks: true
    });
  }

  Author.beforeCreate(async (author: AuthorInstance, options: CreateOptions<AuthorAttributes>) => {
    author.password = Author.hashPassword(author.password);
  });

  Author.beforeUpdate(async (author: AuthorInstance, options: UpdateOptions<AuthorAttributes>) => {
    if (author.changed('password')) {
      author.password = Author.hashPassword(author.password);
    }
  });
}
