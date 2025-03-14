import * as express from 'express';
import {Request, Response } from "express";
import  * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as logger from 'morgan';

import { createConnectionDB } from './config/db';
import { taskRouter } from './routes/task';

// criação da aplicação
export const app = express();

//liberando acesso aos serviços
app.use(cors());

// liberando o recebimento e envio de JSON da aplicação
app.use(bodyParser.json());

// configurando os logs
app.use(logger('dev'));

// conexão com o banco
createConnectionDB().then();

// configurando rotas
app.use('/tasks', taskRouter);
app.use('/', (req: Request, res: Response):any => (res.send('Tasks API')));