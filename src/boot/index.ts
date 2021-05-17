import { createAuthors } from './create-authors';

const boot = async () => {
  await createAuthors();
}

export default boot;
