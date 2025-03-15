import { Task } from "../entity/Task";
import { TaskRepository } from "../repositories/TaskRepository";

export interface AddTaskModel {
    title: string;
    description: string;
    task_time: number;
}

export interface AddTask {
    add(data: AddTaskModel): Promise<Task>;
}

export class AddTaskUseCase implements AddTask {
    private readonly taskRepository: TaskRepository;

    constructor(taskRepository: TaskRepository) {
        this.taskRepository = taskRepository;
    }

    async add(data: AddTaskModel): Promise<Task> {
        return await this.taskRepository.add(data);
    }
}
