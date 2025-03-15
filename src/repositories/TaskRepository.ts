import { Repository, DataSource } from 'typeorm'
import { Task } from '../entity/Task'
import { AddTask, AddTaskModel } from '../useCases/AddTask'
import { GetTasks } from '../useCases/getTask';
import {UpdateTask} from "../useCases/updateTask";
import {DeleteTask} from "../useCases/deleteTask";
import {TaskModel} from "../config/models/task";

export class TaskRepository implements AddTask, GetTasks, UpdateTask, DeleteTask {
    private readonly repository: Repository<Task>;

    constructor(dataSource: DataSource) {
        this.repository = dataSource.getRepository(Task);
    }

    async add(taskData: AddTaskModel): Promise<Task> {
        const task = this.repository.create(taskData);
        await this.repository.save(task);
        return task;
    }

    async getById(id: number): Promise<Task | null> {
        return await this.repository.findOne({ where: { id } }) || null;
    }

    async getAll(): Promise<Task[]> {
        return await this.repository.find();
    }

    async update(id: number, updatedFields: Partial<TaskModel>): Promise<TaskModel | null> {
        const task = await this.repository.findOne({ where: { id } });

        if (!task) {
            return null;
        }

        Object.assign(task, updatedFields);

        await this.repository.save(task);
        return task;
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }

}
