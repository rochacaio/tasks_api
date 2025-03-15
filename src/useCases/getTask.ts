import { TaskRepository } from "../repositories/TaskRepository";
import { Task } from "../entity/Task";

export interface GetTasks {
    getAll(): Promise<Task[]>;
    getById(id: number): Promise<Task | null>;
}
export class GetTaskUseCase implements GetTasks{
    private readonly taskRepository: TaskRepository;

    constructor(taskRepository: TaskRepository) {
        this.taskRepository = taskRepository;
    }

    async getById(id: number): Promise<Task | null> {
        return await this.taskRepository.getById(id);
    }
    async getAll(): Promise<Task[] | null> {
        return this.taskRepository.getAll();
    }
}
