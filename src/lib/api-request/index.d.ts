declare namespace Express {
  export interface Request {
    // customProperty?: string
    isAuthenticated?: Boolean,
    accessToken?: {
      token: string,
      data: any,
    },
    paginateFilter?: Object
  }
}
