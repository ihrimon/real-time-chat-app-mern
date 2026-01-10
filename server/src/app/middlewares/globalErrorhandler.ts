import { ErrorRequestHandler } from 'express';
import CustomError from '../utils/CustomError';
import config from '../config';
import { ZodError } from 'zod';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500;
  let message = 'Something went wrong!';

  // handle zod validation error
  if (error instanceof ZodError) {
    statusCode = 400;
    message = 'Validation Error/Zod';
  }

  // handle mongoose validation error
  if (error?.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation Error/Mongoose';
  }

  // handle cast error
  if (error?.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid Input/CastError';
  }

  // handle duplicate error
  if (error?.code === 11000) {
    const matchedValue = error.message.match(/"([^"]*)"/);
    const extractedMessage = matchedValue && matchedValue[1];
    statusCode = 409;
    message = `${extractedMessage} is already exists/DuplicateError`;
  }

  // handle CustomError using class
  if (error instanceof CustomError) {
    statusCode = error?.statusCode;
    message = error?.message;
  }

  // send error response and status
  res.status(statusCode).json({
    success: false,
    message,
    error,
    stack: config.node_env === 'development' ? error?.stack : null,
  });
};

export default globalErrorHandler;
