import * as _ from 'lodash';
import authors from './data/authors';
import { sequelize } from '../db';
import { AuthorCreationAttributes } from '../db/models/author';

const createAuthor = async (authorObj: AuthorCreationAttributes) => {
  let data = Object.assign({}, authorObj);
  const {
    Author: AuthorModel,
  } = sequelize.models;

  try {
    let filter = {
      where: {
        email: data.email
      }
    }
    let authorInstance = await AuthorModel.findOne(filter);

    if (authorInstance) {
      return authorInstance;
    }

    const _author = await AuthorModel.create(data);
    return _author;
  } catch (exec) {
    console.error('ERROR > CREATE_AUTHOR > ', exec);
    return;
  }
}

export const createAuthors = async () => {
  try {
    console.log('AUTHORS CREATE STARTED');
    for (const authorObj of authors) {
      await createAuthor(authorObj);
    }
    console.log('AUTHORS CREATE COMPLETED');
  } catch (exec) {
    console.error('ERROR > ', exec);
  }
}

