import { NextFunction, Request, Response } from 'express';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: 'API Not Found!',
    error: `The requested ${req.method} method and ${req.originalUrl} route does not exist.`,
  });
};

export default notFound;
