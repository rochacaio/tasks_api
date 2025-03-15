import { TaskRepository } from '../repositories/TaskRepository';

export interface UpdateTask {
    update(id: number, data: Partial<TaskModel>): Promise<TaskModel>;
}

export interface TaskModel {
    id: number;
    title: string;
    description: string;
    task_time: number;
    incharge_person?: string;
    started?: boolean;
    completed?: boolean;
}

export class UpdateTaskUseCase implements UpdateTask {
    private readonly taskRepository: TaskRepository;

    constructor(taskRepository: TaskRepository) {
        this.taskRepository = taskRepository;
    }

    async update(id: number, data: Partial<TaskModel>): Promise<TaskModel> {
        const task = await this.taskRepository.getById(id);

        if (!task) {
            throw new Error('Task not found');
        }

        if (!Object.keys(data).length) {
            throw new Error('The request needs a body to update the task!');
        }

        Object.assign(task, data);

        await this.taskRepository.update(id, task);

        return task;
    }
}
