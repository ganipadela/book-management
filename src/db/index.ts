import { Sequelize } from 'sequelize';
import operatorsAliases from './sequelize-operator-alias';
import config from '../config';

import sequelizeConfigs from './config';
const sequelizeConfig: any = sequelizeConfigs[config.env];

const sequelize = new Sequelize(sequelizeConfig.url, {
  operatorsAliases,
  dialect: sequelizeConfig.dialect,
  logging: false,
  define: {
    hooks: {
    },
    freezeTableName: true,
    timestamps: true,
    underscored: true,
    paranoid: true
  },
});


import { AuthorInit } from './models/author';
import { BookInit } from './models/book';

let AuthorModel = AuthorInit();
let BookModel = BookInit();

const models = sequelize.models;

// Object.keys(models).forEach(key => {
//   if ('associate' in models[key]) {
//     models[key].associate(models)
//   }
// })

export { Sequelize, sequelize };
