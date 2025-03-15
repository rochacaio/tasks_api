import express from 'express';
import { Request, Response } from "express";
import bodyParser from 'body-parser';
import cors from 'cors';
import logger from 'morgan';
import swaggerUi from "swagger-ui-express";
import swaggerFile from '../src/config/swagger.json';

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

// Rota da documentação do Swagger

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Rota raiz
app.use('/', (req: Request, res: Response): any => (res.send('Tasks API')));