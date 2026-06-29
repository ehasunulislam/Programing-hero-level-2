import express, { Application, NextFunction, Request, Response } from "express";
import  httpStatus  from "http-status";


export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({  
        success: false,
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        name: err.name,
        errorCode: err.code || null,
        message: err.message,
        error: err.stack
      });
}