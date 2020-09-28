import express, { Express } from 'express';

let context: Express = null;
export const ApplicationContext = async () => {
    if (!context) {
        context = await express()
    }
    return context;
};


