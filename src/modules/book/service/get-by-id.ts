import { Book, BookInstance } from '../../../db/models/book';

export async function getById(id: string): Promise<BookInstance | null> {
  try {
    return await Book.findByPk(id);
  } catch (exec) {
    console.error('ERROR > GET_BY_ID > ', exec);
    return null;
  }
}
