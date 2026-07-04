import express, { Application, NextFunction, Request, Response } from "express";
import  httpStatus  from "http-status";
import { Prisma } from "../../prisma/generated/prisma/client";


export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log("own error :", err);

    let statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    let errorMessage = err.message;

    if(err instanceof Prisma.PrismaClientValidationError) {
        const statusCode = httpStatus.BAD_REQUEST;
        const errorMessage = "You have provided incorrect field type or missing fields"
    }


    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({  
        success: false,
        statusCode: statusCode,
        name: err.name,
        errorCode: err.code || null,
        message: errorMessage,
        error: err.stack
    });
}