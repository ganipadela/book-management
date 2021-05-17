import { AuthorCreationAttributes } from '../../db/models/author';

const authors: Array<AuthorCreationAttributes> = [
  {
    email: 'author1@bm.com',
    password: 'author1@bm',
    firstName: 'author1',
    lastName: 'bm',
  },
  {
    email: 'author2@bm.com',
    password: 'author2@bm',
    firstName: 'author2',
    lastName: 'bm',
  }
];

export default authors;
