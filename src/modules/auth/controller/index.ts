import { register } from './register';
import { login } from './login';

export default class AuthController {
  public register = register;
  public login = login;
}
