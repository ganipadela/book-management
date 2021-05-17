import authentication from './authentication';
import isAuthenticated from './is-authenticated';
import setOwner from './set-owner';
import paginate from './paginate';
import validate from './validate';

const middlewares = {
  authentication,
  isAuthenticated,
  setOwner,
  paginate,
  validate,
}

export default middlewares;
