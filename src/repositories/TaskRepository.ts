import { Repository, DataSource } from 'typeorm'
import { Task } from '../entity/Task'
import { AddTask, AddTaskModel } from '../useCases/AddTask'

export class TaskRepository implements AddTask {
    private readonly repository: Repository<Task>

    constructor(dataSource: DataSource) {
        this.repository = dataSource.getRepository(Task)
    }

    async add(taskData: AddTaskModel): Promise<Task> {
        const task = this.repository.create(taskData)
        await this.repository.save(task)
        return task
    }
}
