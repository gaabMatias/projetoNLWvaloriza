import "reflect-metadata";
import express from 'express';
import morgan from 'morgan';
import "express-async-errors"

import { Request, Response, NextFunction } from "express"

import "./database"

import { router } from './routes';

const app = express();

app.listen(3000, () => {
    console.log(`Server is running`)
})

app.use(morgan(`dev`));

app.use(express.json())
app.use(router)
app.use((err: Error, request: Request, response: Response, next: NextFunction) =>{
    if (err instanceof Error ) {
        response.status(400).json({
            error: err.message
        })
    }
    return response.status(500).json({
        status: `error`,
        message: `Internal Server Error`
    })
})