import { Author, AuthorInstance } from '../../../db/models/author';

export async function getByEmail(email: string): Promise<AuthorInstance | null> {
  try {
    const filter = {
      where: {
        email,
      }
    }
    return await Author.findOne(filter);
  } catch (exec) {
    console.error('ERROR > GET_BY_EMAIL > ', exec);
    return null;
  }
}
