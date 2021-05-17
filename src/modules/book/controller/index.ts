import { list } from './list';
import { create } from './create';
import { getById } from './get-by-id';
import { update } from './update';
import { deleteById } from './delete-by-id';

export default class BookController {
  public list = list;
  public create = create;
  public update = update;
  public getById = getById;
  public deleteById = deleteById;
}
