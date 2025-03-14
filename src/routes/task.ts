import { Request, Response, Router } from 'express'
import { CreateTaskController } from '../Controller/CreateTaskController'
import { TaskRepository } from '../repositories/TaskRepository'
import { TaskValidatorImpl } from '../validator/TaskValidatorImp'
import { AppDataSource } from '../data-source'
import {authMiddleware} from "../autenticators/authMiddleware";
import { generateToken } from '../utils/generateToken'

export const taskRouter: Router = Router()

// Rota padrão para teste
taskRouter.get('/', (req: Request, res: Response) => {
    const token = generateToken(); // Gerar token
    res.json({ message: 'Token gerado com sucesso!', token }); // Retornar na resposta
});

// Criar instâncias necessárias
const taskRepository = new TaskRepository(AppDataSource)
const taskValidator = new TaskValidatorImpl()
const createTaskController = new CreateTaskController(taskValidator, taskRepository)

// Rota para adicionar uma nova task
taskRouter.post('/add', authMiddleware ,async (req: Request, res: Response) => {
    const httpResponse = await createTaskController.handle({ body: req.body })
    res.status(httpResponse.statusCode).json(httpResponse.body)
})
