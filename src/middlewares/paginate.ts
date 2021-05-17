import { Request, Response, NextFunction } from 'express';

type PaginateFilter = {
  offset?: Number;
  limit?: Number;
  sort?: Object;
}

const paginate = async (req: Request, res: Response, next: NextFunction) => {
  let otherFilter: PaginateFilter = {};

  if (req.query.skip) {
    otherFilter.offset = parseInt(req.query.skip as string);
  }
  if (req.query.page) {
    otherFilter.offset = (parseInt(req.query.page as string) - 1) * (parseInt(req.query.limit as string || '10'));
    otherFilter.limit = 10;
  }
  if (req.query.limit) {
    otherFilter.limit = parseInt(req.query.limit as string);
  }
  if (req.query.order) {
    let orderData = (req.query.order as string).split(' ');
    otherFilter.sort = [
      [orderData[0], orderData[1] || 'asc']
    ]
  }
  req.paginateFilter = otherFilter;
  next();
}

export default paginate;
