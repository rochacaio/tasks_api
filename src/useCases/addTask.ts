import { TaskModel } from '../config/models/task'

export interface AddTaskModel {
    description: string
    task_time: number
    incharge_person?: string;
}
export interface AddTask {
    add (account: AddTaskModel): Promise<TaskModel>
}