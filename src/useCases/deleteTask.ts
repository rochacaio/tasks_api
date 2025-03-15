import { TaskRepository } from '../repositories/TaskRepository';

export interface DeleteTask {
    delete(id: number): Promise<void>;
}

export class DeleteTaskUseCase implements DeleteTask {
    private readonly taskRepository: TaskRepository;

    constructor(taskRepository: TaskRepository) {
        this.taskRepository = taskRepository;
    }

    async delete(id: number): Promise<void> {
        const task = await this.taskRepository.getById(id);
        if (!task) {
            throw new Error('Task not found');
        }

        await this.taskRepository.delete(id);
    }
}
