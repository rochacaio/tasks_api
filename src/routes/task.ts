import { Request, Response, Router } from 'express'
import { CreateTaskController } from '../Controller/CreateTaskController'
import { TaskRepository } from '../repositories/TaskRepository'
import { TaskValidatorImpl } from '../validator/TaskValidatorImp'
import { AppDataSource } from '../data-source'
import {authMiddleware} from "../autenticators/authMiddleware";
import { generateToken } from '../utils/generateToken'
import {GetTaskController} from "../Controller/GetTaskController";
import {UpdateTaskController} from "../Controller/UpdateTaskController";
import {DeleteTaskController} from "../Controller/DeleteTaskController";
import {DeleteTaskUseCase, UpdateTaskUseCase, GetTaskUseCase, AddTaskUseCase} from '.././Controller/tasks-protocols'

export const taskRouter: Router = Router()

// Rota padrão para criar o token de acesso
taskRouter.get('/', (res: Response) => {
    const token = generateToken();
    res.json({ message: 'Token gerado com sucesso!', token });
});

// Criar instâncias necessárias
const taskRepository = new TaskRepository(AppDataSource)
const taskValidator = new TaskValidatorImpl()
const addTaskUseCase = new AddTaskUseCase(taskRepository)
const createTaskController = new CreateTaskController(taskValidator, addTaskUseCase)

// Rota para adicionar uma nova task
taskRouter.post('/add', authMiddleware ,async (req: Request, res: Response) => {
    const httpResponse = await createTaskController.handle({ body: req.body })
    res.status(httpResponse.statusCode).json(httpResponse.body)
})

const getTaskUseCase = new GetTaskUseCase(taskRepository);
const getTaskController = new GetTaskController(getTaskUseCase)
taskRouter.get('/get/:id?', authMiddleware, async (req: Request, res: Response) => {
    const httpResponse = await getTaskController.handle({params: req.params});
    res.status(httpResponse.statusCode).json(httpResponse.body)
});

const updateTaskUseCase = new UpdateTaskUseCase(taskRepository);
const updateTaskController = new UpdateTaskController(updateTaskUseCase)
taskRouter.put('/update/:id', authMiddleware, async (req: Request, res: Response) => {
    const httpResponse = await updateTaskController.handle({params: req.params, body: req.body});
    res.status(httpResponse.statusCode).json(httpResponse.body)
});

const deleteTaskUseCase = new DeleteTaskUseCase(taskRepository);
const deleteTaskController = new DeleteTaskController(deleteTaskUseCase);
taskRouter.delete('/delete/:id',authMiddleware, async (req: Request, res: Response) => {
        const httpResponse = await deleteTaskController.handle({params: req.params});
        res.status(httpResponse.statusCode).json(httpResponse.body)
});
